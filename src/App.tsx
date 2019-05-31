import React from 'react';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import * as authCommands from './core/store/auth/commands';
import { Home } from './Home';
import BoxScreen from './BoxScreen';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { readCurrentUser } from './core/store/auth/selectors';

type AppProps = {
  isUserAuthenticated: boolean;
  onSignInClicked: () => void;
};

const App: React.FC<AppProps> = ({ isUserAuthenticated, onSignInClicked }) => {
  return isUserAuthenticated ? <BoxScreen /> : <Home onSignInClicked={onSignInClicked} />;
};

export default connect(
  (state: FlashcardsAppState) => ({
    isUserAuthenticated: readCurrentUser(state).status === 'AUTHENTICATED',
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    onSignInClicked: () => dispatch(authCommands.authenticateUser()),
  }),
)(App);
