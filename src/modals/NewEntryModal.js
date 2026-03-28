import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { encrypt } from '../security/encryption';

function NewEntryModal({ show, onHide, dispatch, title, setTitle, body, setBody, encryptionKey, setKey, validated, setValidated, setCurrentIndex }) {
  
  const resetInputs = () => {
    setTitle("");
    setBody("");
    setKey("");
    setValidated(false);
  };

  const addNewNote = () => {
    if (title.trim().length > 0 && body.trim().length > 0) {
      let encryptedBody = encryptionKey.length > 0 ? encrypt(body, encryptionKey) : body;
      dispatch({ type: 'add', newNote: { title, body: encryptedBody, date: Date.now() } });
      
      resetInputs();
      onHide();
      setCurrentIndex(0);
    } else {
      setValidated(true);
    }
  };

  const handleDiscard = () => {
    resetInputs();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleDiscard} centered size='lg' contentClassName="border-0 shadow-lg">
      <Modal.Body className="p-0 overflow-hidden" style={{ borderRadius: '8px' }}>
        <div className="paper-container border-0 shadow-none d-flex flex-column" style={{ height: '70vh', minHeight: '500px' }}>
          <div className="paper-margin"></div>
          
          <div className="paper-content d-flex flex-column flex-grow-1">
            <Form noValidate className="d-flex flex-column h-100">
              <Form.Group className="mb-4">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entry Title"
                  className="border-0 bg-transparent p-0 shadow-none fw-bold"
                  style={{ fontSize: '2rem', color: '#343a40' }}
                  isInvalid={validated && title.trim().length === 0}
                />
              </Form.Group>

              <Form.Group className="flex-grow-1">
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  as="textarea"
                  placeholder="Write your thoughts..."
                  className="border-0 bg-transparent p-0 shadow-none h-100 w-100"
                  style={{ 
                    lineHeight: '1.6rem', 
                    fontSize: '1.15rem',
                    resize: 'none',
                    overflowY: 'auto'
                  }}
                  isInvalid={validated && body.trim().length === 0}
                />
              </Form.Group>
              <div className="mt-3 pt-3 border-top d-flex align-items-center">
                <FontAwesomeIcon 
                  icon={encryptionKey.length > 0 ? faLock : faUnlock} 
                  className="me-3"
                  style={{ color: encryptionKey.length > 0 ? '#0d6efd' : '#ced4da', transition: 'color 0.3s' }}
                />
                <div className="flex-grow-1 p-2 rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                  <Form.Control
                    value={encryptionKey}
                    onChange={(e) => setKey(e.target.value)}
                    type="password"
                    placeholder="Encryption Key (Optional)"
                    className="border-0 bg-transparent shadow-none p-0"
                    style={{ fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="p-0 border-0">
        <Row className="g-0 w-100">
          <Col>
            <Button 
              variant="light" 
              onClick={handleDiscard}
              className="w-100 rounded-0 py-3 border-end"
              style={{ fontSize: '1rem' }}
            >
              Discard
            </Button>
          </Col>
          <Col>
            <Button 
              variant="primary" 
              onClick={addNewNote} 
              className="w-100 rounded-0 py-3 fw-bold"
              style={{ fontSize: '1rem' }}
            >
              Save to Journal
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default NewEntryModal;