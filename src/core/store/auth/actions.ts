import { FlashcardsThunkAction } from '..';

export enum AuthActionTypes {
  USER_AUTHENTICATED = '[auth] - the user has been authenticated',
  USER_AUTHENTICATION_PROCESS_STATUS_CHANGED = '[auth] - the authentication process has changed',
}

export enum AuthenticationProcessStatus {
  NOT_STARTED = 'auth process not started',
  ENDED = 'auth process has ended',
}

export const userAuthenticated = ({ userId }: { userId: string }) => ({
  type: AuthActionTypes.USER_AUTHENTICATED as AuthActionTypes.USER_AUTHENTICATED,
  payload: { userId },
});

export const userAuthenticationProcessStatusChanged = (status: AuthenticationProcessStatus) => ({
  type: AuthActionTypes.USER_AUTHENTICATION_PROCESS_STATUS_CHANGED as AuthActionTypes.USER_AUTHENTICATION_PROCESS_STATUS_CHANGED,
  payload: {
    status,
  },
});

export const authenticateUser = (): FlashcardsThunkAction => async (dispatch, _, deps) => {
  const { userId } = await deps.signIn();
  await deps.saveAuthData({ userId });
  dispatch(userAuthenticated({ userId }));
  dispatch(userAuthenticationProcessStatusChanged(AuthenticationProcessStatus.ENDED));
};

export const retrieveStoredAuthData = (): FlashcardsThunkAction => async (dispatch, _, deps) => {
  const savedAuthData = await deps.getAuthData();
  if (savedAuthData) {
    dispatch(userAuthenticated(savedAuthData));
  }
  dispatch(userAuthenticationProcessStatusChanged(AuthenticationProcessStatus.ENDED));
};
