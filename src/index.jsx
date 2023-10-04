import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

if (container.hasChildNodes()) {
  root.hydrate(<App />);
} else {
  root.render(<App />);
}
