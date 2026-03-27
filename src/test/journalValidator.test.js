import { validateJournalData } from '../store/journalValidator';

describe('validateJournalData', () => {
  test('returns invalid for non-object data', () => {
    expect(validateJournalData(null)).toEqual({
      isValid: false,
      error: 'Invalid data format. Expected an object.',
    });

    expect(validateJournalData('string')).toEqual({
      isValid: false,
      error: 'Invalid data format. Expected an object.',
    });
  });

  test('returns invalid when notes is missing', () => {
    expect(validateJournalData({})).toEqual({
      isValid: false,
      error: 'Invalid data format. Expected a "notes" array.',
    });
  });

  test('returns invalid when notes is not an array', () => {
    expect(validateJournalData({ notes: 'not-an-array' })).toEqual({
      isValid: false,
      error: 'Invalid data format. Expected a "notes" array.',
    });
  });

  test('returns invalid when a note is not an object', () => {
    expect(validateJournalData({ notes: [null] })).toEqual({
      isValid: false,
      error: 'Note at index 0 is not a valid object.',
    });
  });

  test('returns invalid when note title is missing or not a string', () => {
    expect(validateJournalData({ notes: [{ body: 'x', date: 12345 }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "title" field. Expected a string.',
    });
    expect(validateJournalData({ notes: [{ title: 1, body: 'x', date: 12345 }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "title" field. Expected a string.',
    });
  });

  test('returns invalid when note body is missing or not a string', () => {
    expect(validateJournalData({ notes: [{ title: 't', date: 12345 }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "body" field. Expected a string.',
    });
    expect(validateJournalData({ notes: [{ title: 't', body: 1, date: 12345 }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "body" field. Expected a string.',
    });
  });

  test('returns invalid when note date is missing or not a number', () => {
    expect(validateJournalData({ notes: [{ title: 't', body: 'x' }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "date" field. Expected a number.',
    });
    expect(validateJournalData({ notes: [{ title: 't', body: 'x', date: 'not-a-number' }] })).toEqual({
      isValid: false,
      error: 'Note at index 0 has invalid or missing "date" field. Expected a number.',
    });
  });

  test('returns valid for a correctly structured journal object', () => {
    expect(validateJournalData({
      notes: [
        { title: 'Hello', body: 'First entry', date: 1680000000000 },
        { title: 'World', body: 'Second entry', date: 1680000010000 },
      ],
    })).toEqual({ isValid: true });
  });
});
