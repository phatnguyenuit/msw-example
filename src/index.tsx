import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function prepareMocks() {
  if (process.env.REACT_APP_USE_MOCK === 'true') {
    return import('./mocks/browser').then(({ mswWorker }) =>
      mswWorker.start({
        onUnhandledRequest: 'bypass',
        // workaround serviceWorker & findWorker
        // to use in github pages
        serviceWorker: {
          url: './mockServiceWorker.js',
        },
        findWorker: (scriptURL, _mockServiceWorkerUrl) =>
          scriptURL.includes('mockServiceWorker'),
      }),
    );
  }

  return Promise.resolve();
}

prepareMocks().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(console.log);
});
