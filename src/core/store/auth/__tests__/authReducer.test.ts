import { authReducer } from '../reducers';
import { NOT_AUTHENTICATED, AUTHENTICATED } from '../types';
import { userAuthenticated } from '../events';

test(`
  given no arguments
  then the state should be the initial state
`, () => {
  expect(authReducer()).toEqual({
    currentUser: {
      status: NOT_AUTHENTICATED,
    },
  });
});

test(`
  given no state state and a userAuthenticated event
  then should set the userId and the status to authenticated
`, () => {
  expect(authReducer(undefined, userAuthenticated({ userId: '42' }))).toEqual({
    currentUser: {
      userId: '42',
      status: AUTHENTICATED,
    },
  });
});
