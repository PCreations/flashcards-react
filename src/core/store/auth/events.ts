import { AuthEventTypes, USER_AUTHENTICATED } from './types';

export const userAuthenticated = ({ userId }: { userId: string }): AuthEventTypes => ({
  type: USER_AUTHENTICATED,
  payload: {
    userId,
    status: 'AUTHENTICATED',
  },
});
