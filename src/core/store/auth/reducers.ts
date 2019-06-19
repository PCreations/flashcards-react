import { Record } from 'immutable';
import {
  userAuthenticated,
  userAuthenticationProcessStatusChanged,
  AuthActionTypes,
  AuthenticationProcessStatus,
} from './actions';

type AuthStateProps = {
  isUserAuthenticated: boolean;
  userId?: string;
  processStatus: AuthenticationProcessStatus;
};

export const AuthState = Record<AuthStateProps>({
  isUserAuthenticated: false,
  userId: undefined,
  processStatus: AuthenticationProcessStatus.NOT_STARTED,
});

export type AuthState = ReturnType<typeof AuthState>;

type HandledActions =
  | ReturnType<typeof userAuthenticated>
  | ReturnType<typeof userAuthenticationProcessStatusChanged>;

export const authReducer = (state = AuthState(), action?: HandledActions): AuthState => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case AuthActionTypes.USER_AUTHENTICATED:
      return state.set('isUserAuthenticated', true).set('userId', action.payload.userId);
    case AuthActionTypes.USER_AUTHENTICATION_PROCESS_STATUS_CHANGED:
      return state.set('processStatus', action.payload.status);
    default:
      return state;
  }
};
