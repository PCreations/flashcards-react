import React from 'react';
import { connect } from 'react-redux';
import { FlashcardsAppState } from './core/store';
import * as authCommands from './core/store/auth/commands';
import { Home } from './Home';
import { BoxListEmptyState } from './BoxListEmptyState';

type AppProps = {
  isUserAuthenticated: boolean;
  onSignInClicked: () => void;
  createNewBox: () => void;
};

const App: React.FC<AppProps> = ({ isUserAuthenticated, createNewBox, onSignInClicked }) => {
  return isUserAuthenticated ? (
    <BoxListEmptyState createNewBox={createNewBox} />
  ) : (
    <Home onSignInClicked={onSignInClicked} />
  );
};

export default connect(
  (state: FlashcardsAppState) => ({
    isUserAuthenticated: state.auth.currentUser.status === 'AUTHENTICATED',
  }),
  dispatch => ({
    onSignInClicked: () => dispatch(authCommands.authenticateUser()),
    createNewBox: () => {},
  }),
)(App);
