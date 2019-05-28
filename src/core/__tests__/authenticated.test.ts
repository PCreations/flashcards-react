import { FlashcardsApp } from '../FlashcardsApp';
import { AuthenticationGateway } from '../AuthenticationGateway';

test(`
  given the user is not authenticated
  when the user gets authenticated with userId 42
  then the current user status should be 'AUTHENTICATED'
  and the current user id should 42
`, async () => {
  const authenticationGateway = AuthenticationGateway({
    signIn: () => Promise.resolve({ userId: '42' }),
  });
  const app = FlashcardsApp({ authenticationGateway });
  await app.signIn();
  expect(app.readCurrentUser()).toEqual({
    status: 'AUTHENTICATED',
    userId: '42',
  });
});
export {};
