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
  it('should render github corner', () => {
    render(<App />);
    const githubCorner = screen.getByLabelText(
      'Navigate to my GitHub repository',
    );

    expect(githubCorner).toBeVisible();
    expect(githubCorner).toHaveAttribute(
      'href',
      'https://github.com/phatnguyenuit/msw-example',
    );
  });

  it('should get user success', async () => {
    mswServer.use(getUserSuccess);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    expect(screen.queryByTestId('loading')).toBeVisible();

    await waitFor(() => {
      expect(screen.queryByTestId('response')).toHaveTextContent(/admin/i);
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  it('should get unauthorized user on mount', async () => {
    mswServer.use(getUserFailed);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    expect(screen.queryByTestId('loading')).toBeVisible();

    await waitFor(() => {
      expect(screen.queryByTestId('response')).toHaveTextContent(
        /not authorized/i,
      );
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  it('should get user error on mount', async () => {
    mswServer.use(getUserError);
    render(<App />);

    act(() => {
      userEvent.click(screen.getByTestId('fetchUserBtn'));
    });

    expect(screen.queryByTestId('loading')).toBeVisible();

    await waitFor(() => {
      expect(screen.queryByTestId('response')).toHaveTextContent(
        /network error/i,
      );
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });
});
