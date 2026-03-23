import React from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';

function ImportExportModal({ show, onHide, exportJournal }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Import / Export Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row className="align-items-center mb-4">
            <Col xs={8}>
              <p className="mb-0">Export your journal entries so they can be accessed from another device. Exporting <strong>PRESERVES</strong> encryption.</p>
            </Col>
            <Col xs={4}>
              <Button variant="outline-primary" className="w-100" onClick={exportJournal}><FontAwesomeIcon icon={faFileExport} /> Export</Button>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col xs={8}>
              <p className="mb-0">Import your journal entries from another device and <strong>REPLACE</strong> the current journal entries.</p>
            </Col>
            <Col xs={4}>
              <Button variant="outline-danger" className="w-100"><FontAwesomeIcon icon={faFileImport} /> Import (Replace)</Button>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col xs={8}>
              <p className="mb-0">Import your journal entries from another device and <strong>MERGE</strong> them with your current entries, so both will be present.</p>
            </Col>
            <Col xs={4}>
              <Button variant="outline-success" className="w-100"><FontAwesomeIcon icon={faFileImport} /> Import (Merge)</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ImportExportModal;