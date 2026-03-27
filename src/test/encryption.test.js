import { encrypt, decrypt } from '../security/encryption';

describe('encryption utilities', () => {
  test('encrypt followed by decrypt returns original text', () => {
    const plaintext = 'Hello, Tiny Journal!';
    const key = 'secure-passphrase';

    const ciphertext = encrypt(plaintext, key);
    expect(typeof ciphertext).toBe('string');
    expect(ciphertext).not.toBe(plaintext);

    const decrypted = decrypt(ciphertext, key);
    expect(decrypted).toBe(plaintext);
  });

  
  test('decrypt with wrong key does not return original plaintext', () => {
    const plaintext = 'Hello, Tiny Journal!';
    const key = 'secure-passphrase';
    const wrongKey = 'incorrect-passphrase';

    const ciphertext = encrypt(plaintext, key);
    const decryptedWithWrongKey = decrypt(ciphertext, wrongKey);

    expect(decryptedWithWrongKey).not.toBe(plaintext);
  });

  test('decrypt returns input for invalid hex ciphertext', () => {
    const invalid = 'not-a-hex-string';
    const result = decrypt(invalid, 'secure-passphrase');
    expect(result).toBe(invalid);
  });
});