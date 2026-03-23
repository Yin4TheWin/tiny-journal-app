import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ show, onHide, deleteNote }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this entry? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} className="flex-fill">Cancel</Button>
        <Button variant="danger" onClick={deleteNote} className="flex-fill">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;