import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FlashcardsAppStore, createStore } from './core/store';

declare global {
  interface Window {
    FlashcardsAppStore: FlashcardsAppStore;
  }
}

window.FlashcardsAppStore = createStore();

ReactDOM.render(
  <Provider store={window.FlashcardsAppStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
