import { useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState<any>();

  const fetchUser = async () => {
    try {
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
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <button data-testid="fetchUserBtn" onClick={fetchUser}>
          Fetch user
        </button>
        <code data-testid="response">{JSON.stringify(response)}</code>
      </main>
    </div>
  );
}

export default App;
