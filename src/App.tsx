import axios from 'axios';
import { useState } from 'react';
import GitHubCorner from 'react-github-corner';

import logo from './logo.svg';
import './App.css';

interface UserResponse {
  message: string;
  data?: {
    username: string;
  };
}

function App() {
  const [response, setResponse] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/user');

      // Reference: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      setResponse(data);
    } catch (error: any) {
      // Reference: https://stackoverflow.com/questions/49967779/axios-handling-errors
      const message: string = error.response
        ? error.response.data.message
        : error.message;

      setResponse({
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GitHubCorner
          href="https://github.com/phatnguyenuit/msw-example"
          ariaLabel="Navigate to my GitHub repository"
        />
      </header>
      <main className="mainContent">
        <button
          className="fetchUserBtn"
          data-testid="fetchUserBtn"
          onClick={fetchUser}
        >
          Fetch user
        </button>
        <div>
          {isLoading && <p data-testid="loading">Loading...</p>}
          {response && (
            <code data-testid="response">
              {JSON.stringify(response, null, 2)}
            </code>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
