import { AuthenticationGateway } from './AuthenticationGateway';
import { createStore } from 'redux';
import { rootReducer } from './store';
import { userAuthenticated } from './store/auth/events';

export const FlashcardsApp = ({
  authenticationGateway,
}: {
  authenticationGateway: AuthenticationGateway;
}) => {
  const store = createStore(rootReducer);
  return {
    readCurrentUser: () => store.getState().auth.currentUser,
    signIn: async () => {
      const currentUser = await authenticationGateway.signIn();
      store.dispatch(
        userAuthenticated({
          ...currentUser,
          status: 'AUTHENTICATED',
        }),
      );
    },
  };
};

export type FlashcardsApp = ReturnType<typeof FlashcardsApp>;
