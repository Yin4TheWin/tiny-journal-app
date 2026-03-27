import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

describe('App component', () => {
  test('renders Tiny Journal App heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /tiny journal app/i })).toBeInTheDocument();
  });

  test('shows empty journal message when no notes exist', () => {
    // Ensure store starts empty for this test to avoid persistent state interference
    store.dispatch({ type: 'override', newNotes: [] });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/your journal is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/click "new entry" to add your first note!/i)).toBeInTheDocument();
  });
});
