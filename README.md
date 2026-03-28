# Frequently Asked Questions

### Where is my data stored?
Your data never leaves your device. It is stored exclusively in your browser’s local storage.
You can verify this yourself using your browser’s built-in developer tools. Right-click anywhere on the page and select Inspect, then navigate to the Network tab. As you create, save, or view notes, you will notice that no new requests or data transmissions are sent to any external website or server.

### How does the encryption work?
When you provide a “password”, your text is encrypted using AES-256-CTR. The key is derived using the Scrypt algorithm, ensuring your thoughts remain private even if someone accesses your local files.

### What happens if I forget my encryption key?
Tough luck 😭 If you lose your key, the encrypted entries cannot be recovered.

### How can I back up my journal?
Use the “Import/Export” tool to download a JSON file of your entire journal. You should do this periodically to ensure you have a backup. 
> Note: For encrypted entries, the exported data will also be encrypted and will require the same key to decrypt when imported.

For complaints, feature requests, or other queries, please reach out to chat@franklinyin.com.
