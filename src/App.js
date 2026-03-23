import './App.css';
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faQuestionCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import NewEntryModal from './modals/NewEntryModal';
import DeleteModal from './modals/DeleteModal';
import FAQModal from './modals/FAQModal';
import ImportExportModal from './modals/ImportExportModal';
import { decrypt } from './security/encryption';

function App() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [encryptionKey, setKey] = React.useState("");
  
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showFAQModal, setShowFAQModal] = React.useState(false);
  const [showImportExportModal, setShowImportExportModal] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [decryptionKeys, setDecryptionKeys] = React.useState({});

  const dispatch = useDispatch();
  const savedNotes = useSelector(state => state.notes);

  React.useEffect(() => {
    localStorage.setItem('state', JSON.stringify({ notes: savedNotes }));
  }, [savedNotes]);

  

  const currentNote = savedNotes[currentIndex];

  return (
    <div className="App">
      <header className="App-header py-5">
        <Container className="text-center mb-5">
          <h1>Tiny Journal App</h1>
          <p className="lead">
            Capture your thoughts securely and store them locally — no cloud, no third parties!
          </p>
          <p>
            Want extra protection? Simply enter a password in the encryption key field to safeguard your notes with powerful AES encryption. Just make sure to remember your password - no one's remembering it for you! <span className="text-primary" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowFAQModal(true)}>(FAQs <FontAwesomeIcon icon={faQuestionCircle} />)</span>
          </p>
          <br/>
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-3">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-5 shadow-sm w-100 w-sm-auto"
              onClick={() => {
                setValidated(false);
                setShowModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} /> New Entry
            </Button>
            <Button 
              variant="outline-dark" 
              size="lg" 
              className="px-5 shadow-sm w-100 w-sm-auto"
              onClick={() => setShowImportExportModal(true)}
            >
              <FontAwesomeIcon icon={faSave} /> Import/Export
            </Button>
          </div>
        </Container>

        <NewEntryModal show={showModal} onHide={() => setShowModal(false)} dispatch={dispatch} title={title} setTitle={setTitle} body={body} setBody={setBody} encryptionKey={encryptionKey} setKey={setKey} validated={validated} setValidated={setValidated} setCurrentIndex={setCurrentIndex} />

        <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} dispatch={dispatch} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

        <FAQModal show={showFAQModal} onHide={() => setShowFAQModal(false)} />

        <ImportExportModal show={showImportExportModal} onHide={() => setShowImportExportModal(false)} savedNotes={savedNotes} />

        <Container fluid="lg">
          <Row className="justify-content-center">
            {savedNotes.length === 0 ? (
              <Col xs={12}>
                <div className="paper-stack">
                  <div className="paper-container">
                    <div className="paper-margin"></div>
                    <div className="paper-content text-center d-flex flex-column justify-content-center" style={{ minHeight: '450px' }}>
                      <h3 className="fw-bold text-muted">Your journal is empty</h3>
                      <p className="lead">Click "New Entry" to add your first note!</p>
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              <>
                <Col md={4} className="d-none d-md-block mb-4">
                  <div className="notes-sidebar shadow-sm">
                    {savedNotes.map((note, index) => (
                      <div 
                        key={note.date} 
                        className={`sidebar-item ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                      >
                        <strong className="d-block text-truncate">{note.title}</strong>
                        <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </Col>
                
                <Col xs={12} md={8} className="mb-4">
                  <div className="paper-stack">
                    <div className="paper-container">
                      <div className="paper-margin"></div>
                      <div className="paper-content">
                        <div className="d-flex justify-content-between align-items-start">
                          <h3 className="m-0 fw-bold">{currentNote.title}</h3>
                          <FontAwesomeIcon 
                            icon={faTrash} 
                            onClick={() => setShowDeleteModal(true)} 
                            className="trash-icon"
                          />
                        </div>
                        <div className="d-flex align-items-center" style={{ height: '1.6rem' }}>
                          <span className="small text-muted me-3">
                            {new Date(currentNote.date).toLocaleDateString()}
                          </span>
                          <Form.Control 
                            type="password"
                            placeholder="Enter password..."
                            style={{ fontSize: '0.85rem', height: '1.6rem' }}
                            value={decryptionKeys[currentIndex] || ""}
                            onChange={(e) => {
                              const newKeys = { ...decryptionKeys, [currentIndex]: e.target.value };
                              setDecryptionKeys(newKeys);
                            }}
                          />
                        </div>
                        <div className="mt-2" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                          {decryptionKeys[currentIndex] 
                            ? decrypt(currentNote.body, decryptionKeys[currentIndex])
                            : currentNote.body}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4 px-2">
                      <Button variant="dark" disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>&lt; Newer</Button>
                      <span className="text-dark fw-bold">{currentIndex + 1} / {savedNotes.length}</span>
                      <Button variant="dark" disabled={currentIndex === savedNotes.length - 1} onClick={() => setCurrentIndex(currentIndex + 1)}>Older &gt;</Button>
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;