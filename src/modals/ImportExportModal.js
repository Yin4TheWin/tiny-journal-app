import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { validateJournalData } from '../store/journalValidator';

function ImportExportModal({ show, onHide, savedNotes, dispatch }) {
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsImporting(false);
    }
  }, [show]);

  const exportJournal = () => {
    const data = { notes: savedNotes };
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `tiny-journal-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const performImport = (onSuccess) => {
    setIsImporting(true);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            const validation = validateJournalData(data);
            if (validation.isValid) {
              onSuccess(data.notes);
            } else {
              alert(`Invalid file format: ${validation.error}`);
              setIsImporting(false);
            }
          } catch (error) {
            alert('Error reading file. Please select a valid JSON file.');
            setIsImporting(false);
          }
        };
        reader.readAsText(file);
      } else {
        setIsImporting(false);
      }
    };
    input.oncancel = () => setIsImporting(false);
    input.click();
  };

  const importReplace = () => {
    performImport((notes) => {
      dispatch({ type: 'override', newNotes: notes });
      onHide();
    });
  };

  const importMerge = () => {
    performImport((notes) => {
      dispatch({ type: 'merge', newNotes: notes });
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Import / Export Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isImporting ? (
          <div className="text-center">
            <p>Validating...</p>
          </div>
        ) : (
          <Container fluid>
            <Row className="align-items-center mb-4">
              <Col xs={8}>
                <p className="mb-0">Export your journal entries so they can be accessed from another device. Exporting <strong>PRESERVES</strong> encryption.</p>
              </Col>
              <Col xs={4}>
                <Button variant="outline-primary" className="w-100" onClick={exportJournal} disabled={isImporting}><FontAwesomeIcon icon={faFileExport} /> Export</Button>
              </Col>
            </Row>

            <Row className="align-items-center mb-4">
              <Col xs={8}>
                <p className="mb-0">Import your journal entries from another device and <strong>REPLACE</strong> the current journal entries.</p>
              </Col>
              <Col xs={4}>
                <Button variant="outline-danger" className="w-100" onClick={importReplace} disabled={isImporting}><FontAwesomeIcon icon={faFileImport} /> Import (Replace)</Button>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col xs={8}>
                <p className="mb-0">Import your journal entries from another device and <strong>MERGE</strong> them with your current entries, so both will be present.</p>
              </Col>
              <Col xs={4}>
                <Button variant="outline-success" className="w-100" onClick={importMerge} disabled={isImporting}><FontAwesomeIcon icon={faFileImport} /> Import (Merge)</Button>
              </Col>
            </Row>
          </Container>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ImportExportModal;