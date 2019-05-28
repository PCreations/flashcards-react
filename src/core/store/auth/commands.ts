import { AUTHENTICATE_USER, AuthCommandTypes } from './types';

export const authenticateUser = (): AuthCommandTypes => ({
  type: AUTHENTICATE_USER,
});
