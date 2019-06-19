import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { Home } from './Home';
import { BoxScreen } from './BoxScreen';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  isUserAuthenticated,
  authenticateUser,
  retrieveStoredAuthData,
  getAuthenticationProcessStatus,
  AuthenticationProcessStatus,
} from './core/store/auth';
import { Route, Redirect } from './router';
import { Routes } from './router/state';

type AppProps = {
  hasAuthProcessEnded: boolean;
  isUserAuthenticated: boolean;
  onSignInClicked: () => void;
  restoreAuthStatus: () => void;
};

const AuthenticatedApp: React.FC = () => (
  <>
    <Route url={[Routes.HOME, Routes.NEW_BOX]}>
      <BoxScreen />
    </Route>
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

const App: React.FC<AppProps> = ({
  hasAuthProcessEnded,
  isUserAuthenticated,
  onSignInClicked,
  restoreAuthStatus,
}) => {
  useEffect(() => {
    restoreAuthStatus();
  }, [restoreAuthStatus]);
  return hasAuthProcessEnded ? (
    isUserAuthenticated ? (
      <AuthenticatedApp />
    ) : (
      <UnauthenticatedApp onSignInClicked={onSignInClicked} />
    )
  ) : null;
};

export default connect(
  (state: FlashcardsAppState) => ({
    isUserAuthenticated: isUserAuthenticated(state),
    hasAuthProcessEnded: getAuthenticationProcessStatus(state) === AuthenticationProcessStatus.ENDED,
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    onSignInClicked: () => dispatch(authenticateUser()),
    restoreAuthStatus: () => dispatch(retrieveStoredAuthData()),
  }),
)(App);
