import { createStore } from '../store';
import { readCurrentUser } from '../store/auth/selectors';

test(`
  given the user is not authenticated
  then the current user status should be 'NOT_AUTHENTICATED'
`, () => {
  const store = createStore();
  expect(readCurrentUser(store.getState())).toEqual({
    status: 'NOT_AUTHENTICATED',
  });
});
