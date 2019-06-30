import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from './core/store';
import { RoutesHistoryProvider } from './router/context';
import { RoutesHistory } from './router/context/routesHistory';
import { Routes } from './router/state';

window.FlashcardsAppStore = createStore({
  fetchBoxes: () => axios.get('/boxes/').then(response => response.data),
  signIn: () => Promise.resolve({ userId: '42' }),
  saveAuthData: async authData => {
    localStorage.setItem('auth', JSON.stringify(authData));
    return true;
  },
  getAuthData: async () => JSON.parse(localStorage.getItem('auth') || JSON.stringify(null)),
  addFlashcardToBox: async ({ boxName, flashcard }) =>
    axios.put('/boxes/addFlashcardInBox/', { boxName, flashcard }).then(),
});

const routesHistory: RoutesHistory = {
  getCurrentRoute() {
    return window.location.pathname as Routes;
  },
  pushRoute(route) {
    window.history.pushState(null, '', route);
  },
  onPopStateEvent: listener => {
    window.onpopstate = () => {
      listener(window.location.pathname as Routes);
    };
  },
};

ReactDOM.render(
  <Provider store={window.FlashcardsAppStore}>
    <RoutesHistoryProvider routesHistory={routesHistory}>
      <App />
    </RoutesHistoryProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
