import { createTestStore } from '../../../../__tests__/createTestStore';
import {
  authenticateUser,
  isUserAuthenticated,
  getAuthenticatedUserId,
  retrieveStoredAuthData,
  AuthenticationProcessStatus,
  getAuthenticationProcessStatus,
} from '..';

test(`
  given a non authenticated visitor
  then the isUserAuthenticated selector should return false
  and the getAuthenticationProcessStatus should return NOT_STARTED
`, () => {
  const store = createTestStore();
  expect(isUserAuthenticated(store.getState())).toEqual(false);
  expect(getAuthenticationProcessStatus(store.getState())).toEqual(AuthenticationProcessStatus.NOT_STARTED);
});

test(`
  given a non authenticated visitor
  given a user with id 42 trying to signin
  when a authenticateUser action is dispatched for user with id 42
  then the isUserAuthenticated selector should return true
  and the saveUserInfo should be called with { userId: '42' }
  and the getAuthenticatedUserId selector should return 42
  and the getAuthenticationProcessStatus should return ENDED
`, async () => {
  const saveAuthData = jest.fn();
  const store = createTestStore({
    signIn: jest.fn().mockResolvedValueOnce({ userId: '42' }),
    saveAuthData,
  });
  await store.dispatch(authenticateUser());
  expect(saveAuthData).toHaveBeenNthCalledWith(1, { userId: '42' });
  expect(isUserAuthenticated(store.getState())).toEqual(true);
  expect(getAuthenticatedUserId(store.getState())).toEqual('42');
  expect(getAuthenticationProcessStatus(store.getState())).toEqual(AuthenticationProcessStatus.ENDED);
});

test(`
  given a non authenticated visitor
  and the saved auth data contains info for user 42
  when creating the store
  then the isUserAuthenticated selector should return true
  and the saveUserInfo should be called with { userId: '42' }
  and the getAuthenticationProcessStatus should return ENDED
`, async () => {
  const store = createTestStore({
    signIn: jest.fn().mockResolvedValueOnce({ userId: '42' }),
    getAuthData: jest.fn().mockResolvedValueOnce({ userId: '42' }),
  });
  await store.dispatch(retrieveStoredAuthData());
  expect(isUserAuthenticated(store.getState())).toEqual(true);
  expect(getAuthenticatedUserId(store.getState())).toEqual('42');
  expect(getAuthenticationProcessStatus(store.getState())).toEqual(AuthenticationProcessStatus.ENDED);
});
