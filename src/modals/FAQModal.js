import React from 'react';
import { Modal } from 'react-bootstrap';

function FAQModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Frequently Asked Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>How do I know my data is secure?</h5>
        <p>
          Think of the encryption in your journal as a digital "scrambler" that turns your readable text into a chaotic string of random characters.
          When you enter a password, the app uses a specialized formula called <strong>scrypt</strong> to stretch that password into a complex, 256-bit "secret key."
          This key is then used by the <strong>AES</strong> algorithm (the same standard used by banks and governments) to lock your note.
          Because this process happens entirely on your own device and the scrambled result is stored only in your browser's local memory,
          your thoughts remain private even if someone else looks at your computer's files.
        </p>
        <h5>How do I know entries are only stored on device?</h5>
        <p>You can verify this yourself using your browser's built-in developer tools. Right-click anywhere on the page and select <strong>Inspect</strong>, then navigate to the <strong>Network</strong> tab.
    As you create, save, or view notes, you will notice that no new "requests" or data transmissions are sent to any external website or server.
    Everything stays strictly within your browser's <strong>Local Storage</strong>, which you can also view under the <strong>Application</strong> tab.</p>

    <p>That being said, you should avoid using this app on public or shared computers, as your browser data is tied to the device.
    Additionally, because there is <strong>NO CLOUD BACKUP</strong>, you should not use this for critical data that you cannot afford to lose if your device fails or your browser cache is cleared.</p>

    For complaints, feature requests, or other queries, please reach out to <a href="mailto:chat@franklinyin.com">chat@franklinyin.com</a>.
      </Modal.Body>
    </Modal>
  );
}

export default FAQModal;