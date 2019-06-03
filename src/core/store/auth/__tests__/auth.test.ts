import { createStore } from '../..';
import { authenticateUser, isUserAuthenticated, getAuthenticatedUserId } from '..';
import { userAuthenticated } from '../actions';

test(`
  given a non authenticated visitor
  then the isUserAuthenticated selector should return false
`, () => {
  const store = createStore({ fetchBoxes: jest.fn(), signIn: jest.fn() });
  expect(isUserAuthenticated(store.getState())).toEqual(false);
});

test(`
  given a non authenticated visitor
  given a user with id 42 trying to signin
  when a authenticateUser action is dispatched for user with id 42
  then the isUserAuthenticated selector should return true
  and the getAuthenticatedUserId selector should return 42
`, async () => {
  const store = createStore({
    fetchBoxes: jest.fn(),
    signIn: jest.fn().mockResolvedValueOnce({ userId: '42' }),
  });
  await store.dispatch(authenticateUser());
  expect(isUserAuthenticated(store.getState())).toEqual(true);
  expect(getAuthenticatedUserId(store.getState())).toEqual('42');
});
