import { AuthState, NOT_AUTHENTICATED, AuthEventTypes } from './types';

const initialState: AuthState = {
  currentUser: {
    status: NOT_AUTHENTICATED,
  },
};

export const authReducer = (state = initialState, event?: AuthEventTypes) => {
  if (!event) {
    return state;
  }
  switch (event.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        currentUser: event.payload,
      };
    default:
      return state;
  }
};
