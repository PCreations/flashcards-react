import React from 'react';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { Home } from './Home';
import { BoxScreen } from './BoxScreen';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { isUserAuthenticated, authenticateUser } from './core/store/auth';
import { Route, Redirect } from './router';
import { Routes } from './router/state';

type AppProps = {
  isUserAuthenticated: boolean;
  onSignInClicked: () => void;
};

const AuthenticatedApp: React.FC = () => (
  <>
    <Route url={Routes.HOME}>
      <BoxScreen />
    </Route>
    <Route url={Routes.NEW_BOX}>create a new box</Route>
  </>
);

const UnauthenticatedApp: React.FC<{ onSignInClicked: () => void }> = ({ onSignInClicked }) => (
  <>
    <Route url={Routes.HOME}>
      <Home onSignInClicked={onSignInClicked} />
    </Route>
    <Redirect to={Routes.HOME} />
  </>
);

const App: React.FC<AppProps> = ({ isUserAuthenticated, onSignInClicked }) => {
  return isUserAuthenticated ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp onSignInClicked={onSignInClicked} />
  );
};

export default connect(
  (state: FlashcardsAppState) => ({
    isUserAuthenticated: isUserAuthenticated(state),
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    onSignInClicked: () => dispatch(authenticateUser()),
  }),
)(App);
