import { AuthUser, AuthEventTypes, USER_AUTHENTICATED } from './types';

export const userAuthenticated = (currentUser: AuthUser): AuthEventTypes => ({
  type: USER_AUTHENTICATED,
  payload: currentUser,
});
