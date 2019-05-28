import { createStore } from '../store';
import { userAuthenticated } from '../store/auth/events';
import { readCurrentUser } from '../store/auth/selectors';

test(`
  given the user is not authenticated
  when the user gets authenticated with userId 42
  then the current user status should be 'AUTHENTICATED'
  and the current user id should 42
`, async () => {
  const store = createStore();
  store.dispatch(userAuthenticated({ userId: '42' }));
  expect(readCurrentUser(store.getState())).toEqual({
    status: 'AUTHENTICATED',
    userId: '42',
  });
});
