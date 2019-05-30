import { NOT_AUTHENTICATED, AUTHENTICATED } from '../types';
import { userAuthenticated } from '../events';
import { createStore } from '../..';
import { readCurrentUser } from '../selectors';

test(`
  given a non authenticated visitor
  then the readCurrentUser should return the current user status as NON_AUTHENTICATED
`, () => {
  const store = createStore({ fetchBoxes: jest.fn() });
  expect(readCurrentUser(store.getState())).toEqual({
    status: NOT_AUTHENTICATED,
  });
});

test(`
  given a non authenticated visitor
  when a userAuthenticated event is dispatched for user with id 42
  then the readCurrentUser should return the current user
`, () => {
  const store = createStore({ fetchBoxes: jest.fn() });
  store.dispatch(userAuthenticated({ userId: '42' }));
  expect(readCurrentUser(store.getState())).toEqual({
    userId: '42',
    status: AUTHENTICATED,
  });
});
