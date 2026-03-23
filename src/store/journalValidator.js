export const validateJournalData = (data) => {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid data format. Expected an object.' };
  }

  if (!data.notes || !Array.isArray(data.notes)) {
    return { isValid: false, error: 'Invalid data format. Expected a "notes" array.' };
  }

  for (let i = 0; i < data.notes.length; i++) {
    const note = data.notes[i];
    if (!note || typeof note !== 'object') {
      return { isValid: false, error: `Note at index ${i} is not a valid object.` };
    }
    if (typeof note.title !== 'string') {
      return { isValid: false, error: `Note at index ${i} has invalid or missing "title" field. Expected a string.` };
    }
    if (typeof note.body !== 'string') {
      return { isValid: false, error: `Note at index ${i} has invalid or missing "body" field. Expected a string.` };
    }
    if (typeof note.date !== 'number') {
      return { isValid: false, error: `Note at index ${i} has invalid or missing "date" field. Expected a number.` };
    }
  }

  return { isValid: true };
};