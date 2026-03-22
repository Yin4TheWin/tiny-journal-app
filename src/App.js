import './App.css';
import React from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { encrypt, decrypt } from './security/encryption';

function App() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [key, setKey] = React.useState("");
  
  const [showModal, setShowModal] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [decryptionKeys, setDecryptionKeys] = React.useState({});

  const dispatch = useDispatch();
  const savedNotes = useSelector(state => state.notes);

  React.useEffect(() => {
    localStorage.setItem('state', JSON.stringify({ notes: savedNotes }));
  }, [savedNotes]);

  const addNewNote = () => {
    if (title.trim().length > 0 && body.trim().length > 0) {
      let encryptedBody = key.length > 0 ? encrypt(body, key) : body;
      dispatch({ type: 'add', newNote: { title, body: encryptedBody, date: Date.now() } });
      
      setTitle("");
      setBody("");
      setKey("");
      setValidated(false);
      setShowModal(false);
      setCurrentIndex(0);
    } else {
      setValidated(true);
    }
  };

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
            Want extra protection? Simply enter a password in the encryption key field to safeguard your notes with powerful AES encryption. Just make sure to remember your password - no one's remembering it for you!
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => {
              setValidated(false);
              setShowModal(true);
            }}
          >
            + New Entry
          </Button>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>New Journal Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate>
              <Form.Group className="mb-3">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entry Title"
                  isInvalid={validated && title.trim().length === 0}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  as="textarea"
                  rows={6}
                  placeholder="Write your thoughts..."
                  isInvalid={validated && body.trim().length === 0}
                />
                <Form.Control.Feedback type="invalid">
                  Journal entries cannot be blank.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  type="password"
                  placeholder="Encryption Key (Optional)"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={addNewNote}>Save Note</Button>
          </Modal.Footer>
        </Modal>

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
                        <h3 className="m-0 fw-bold">{currentNote.title}</h3>
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