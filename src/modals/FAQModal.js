import React from 'react';
import { Modal } from 'react-bootstrap';

function FAQModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Frequently Asked Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ height: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="mb-4">
              <h5 className="fw-bold text-dark">Where is my data stored?</h5>
              <p>
                Your data never leaves your device. It is stored exclusively in your browser's local storage.  <br/>
                You can verify this yourself using your browser's built-in developer tools. Right-click anywhere on the page and select <strong>Inspect</strong>, then navigate to the <strong>Network</strong> tab.
                As you create, save, or view notes, you will notice that no new "requests" or data transmissions are sent to any external website or server.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold text-dark">How does the encryption work?</h5>
              <p>
                When you provide a "password", your text is encrypted using AES-256-CTR. The key is derived using the Scrypt algorithm, ensuring your thoughts remain private even if someone accesses your local files.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold text-dark">What happens if I forget my encryption key?</h5>
              <p>
                Tough luck 😭 If you lose your key, the encrypted entries cannot be recovered.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold text-dark">How can I back up my journal?</h5>
              <p>
                Use the "Import/Export" tool to download a JSON file of your entire journal. You should do this periodically to ensure you have a backup. Remember, for encrypted entries, the exported data will also be encrypted and will require the same key to decrypt when imported.
              </p>
            </div>

             For complaints, feature requests, or other queries, please reach out to <a href="mailto:chat@franklinyin.com">chat@franklinyin.com</a>.
             </div>
      </Modal.Body>
    </Modal>
  );
}

export default FAQModal;