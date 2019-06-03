import { userAuthenticated, AuthActionTypes } from './actions';

type AuthState = {
  isUserAuthenticated: boolean;
  userId?: string;
};

const initialState: AuthState = {
  isUserAuthenticated: false,
};

type HandledActions = ReturnType<typeof userAuthenticated>;

export const authReducer = (state = initialState, action?: HandledActions): AuthState => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case AuthActionTypes.USER_AUTHENTICATED:
      return {
        ...state,
        isUserAuthenticated: true,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};
