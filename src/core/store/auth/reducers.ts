import { Record } from 'immutable';
import { userAuthenticated, AuthActionTypes } from './actions';

type AuthStateProps = {
  isUserAuthenticated: boolean;
  userId?: string;
};

export const AuthState = Record<AuthStateProps>({
  isUserAuthenticated: false,
  userId: undefined,
});

export type AuthState = ReturnType<typeof AuthState>;

type HandledActions = ReturnType<typeof userAuthenticated>;

export const authReducer = (state = AuthState(), action?: HandledActions): AuthState => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case AuthActionTypes.USER_AUTHENTICATED:
      return state.set('isUserAuthenticated', true).set('userId', action.payload.userId);
    default:
      return state;
  }
};
