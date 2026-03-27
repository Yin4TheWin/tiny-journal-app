import store from '../store/store';

describe('Redux store notes reducer', () => {
  beforeEach(() => {
    localStorage.removeItem('state');
    store.dispatch({ type: 'override', newNotes: [] });
  });

  test('initial store state has notes array', () => {
    const currentState = store.getState();
    expect(currentState).toHaveProperty('notes');
    expect(Array.isArray(currentState.notes)).toBe(true);
  });

  test('add action inserts a new note at top', () => {
    const noteA = { title: 'A', body: 'Body A', date: 1 };
    const noteB = { title: 'B', body: 'Body B', date: 2 };

    store.dispatch({ type: 'add', newNote: noteA });
    expect(store.getState().notes).toEqual([noteA]);

    store.dispatch({ type: 'add', newNote: noteB });
    expect(store.getState().notes).toEqual([noteB, noteA]);
  });

  test('delete action removes a note by index', () => {
    const noteA = { title: 'A', body: 'Body A', date: 1 };
    const noteB = { title: 'B', body: 'Body B', date: 2 };
    store.dispatch({ type: 'add', newNote: noteA });
    store.dispatch({ type: 'add', newNote: noteB });

    store.dispatch({ type: 'delete', index: 0 });
    expect(store.getState().notes).toEqual([noteA]);
  });

  test('override action replaces notes', () => {
    const items = [{ title: 'X', body: 'X', date: 123 }];
    store.dispatch({ type: 'override', newNotes: items });
    expect(store.getState().notes).toEqual(items);
  });

  test('merge action appends and sorts notes by date desc', () => {
    const existing = [{ title: 'old', body: 'old', date: 100 }];
    const additional = [{ title: 'new', body: 'new', date: 200 }];

    store.dispatch({ type: 'override', newNotes: existing });
    store.dispatch({ type: 'merge', newNotes: additional });

    expect(store.getState().notes).toEqual([{ title: 'new', body: 'new', date: 200 }, { title: 'old', body: 'old', date: 100 }]);
  });
});