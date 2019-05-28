import { FlashcardsApp } from '../FlashcardsApp';
import { AuthenticationGateway } from '../AuthenticationGateway';

test(`
  given the user is not authenticated
  then the current user status should be 'NOT_AUTHENTICATED'
`, () => {
  const app = FlashcardsApp({
    authenticationGateway: AuthenticationGateway({ signIn: () => Promise.resolve({ userId: 'foo' }) }),
  });
  expect(app.readCurrentUser()).toEqual({
    status: 'NOT_AUTHENTICATED',
  });
});
export {};
