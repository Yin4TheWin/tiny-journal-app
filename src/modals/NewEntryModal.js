import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function NewEntryModal({ show, onHide, title, setTitle, body, setBody, key: encryptionKey, setKey, addNewNote, validated }) {
  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
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
              value={encryptionKey}
              onChange={(e) => setKey(e.target.value)}
              type="password"
              placeholder="Encryption Key (Optional)"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={addNewNote} className="w-100">
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewEntryModal;