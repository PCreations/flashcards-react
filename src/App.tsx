import React from 'react';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { Home } from './Home';
import BoxScreen from './BoxScreen';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { isUserAuthenticated, authenticateUser } from './core/store/auth';

type AppProps = {
  isUserAuthenticated: boolean;
  onSignInClicked: () => void;
};

const App: React.FC<AppProps> = ({ isUserAuthenticated, onSignInClicked }) => {
  console.log({ isUserAuthenticated });
  return isUserAuthenticated ? <BoxScreen /> : <Home onSignInClicked={onSignInClicked} />;
};

export default connect(
  (state: FlashcardsAppState) => ({
    isUserAuthenticated: isUserAuthenticated(state),
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    onSignInClicked: () => dispatch(authenticateUser()),
  }),
)(App);
