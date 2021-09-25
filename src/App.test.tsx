import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mswServer } from './mocks/server';
import {
  getUserFailed,
  getUserSuccess,
  getUserError,
} from './mocks/handlers/user';
import App from './App';

describe('App', () => {
  beforeAll(() => {
    mswServer.listen();
  });

  afterAll(() => {
    mswServer.close();
  });

  afterEach(() => {
    mswServer.resetHandlers();
  });

  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);

    expect(linkElement).toBeInTheDocument();
  });

  it('should get user success', async () => {
    mswServer.use(getUserSuccess);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('response')).toHaveTextContent(/admin/i);
    });
  });

  it('should get unauthorized user on mount', async () => {
    mswServer.use(getUserFailed);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('response')).toHaveTextContent(
        /not authorized/i,
      );
    });
  });

  it('should get user error on mount', async () => {
    mswServer.use(getUserError);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('response')).toHaveTextContent(
        /network error/i,
      );
    });
  });
});
