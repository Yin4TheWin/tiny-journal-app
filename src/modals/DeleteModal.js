import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ show, onHide, dispatch, currentIndex, setCurrentIndex }) {
  const deleteNote = () => {
    dispatch({ type: 'delete', index: currentIndex });
    onHide();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

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