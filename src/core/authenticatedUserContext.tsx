import React, { useReducer, useContext, useMemo } from 'react';

export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

export const USER_AUTHENTICATED = Symbol(
  '[authenticatedUserContext][event] - the user has been authenticated',
);

export const userAuthenticated = ({ userId }: { userId: string }) => ({
  type: USER_AUTHENTICATED,
  payload: {
    userId,
  },
});

export type State = {
  currentUser: {
    status: typeof AUTHENTICATED | typeof NOT_AUTHENTICATED;
    userId?: string;
  };
};

type Events = ReturnType<typeof userAuthenticated>;

export type Dispatch = (event: Events) => void;

export const initialAuthenticatedUserState: State = {
  currentUser: {
    status: NOT_AUTHENTICATED,
  },
};

const initialDispatch: Dispatch = () => {};

const reducer = (state: State, event: Events): State => {
  if (event.type === USER_AUTHENTICATED) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        status: AUTHENTICATED,
        userId: event.payload.userId,
      },
    };
  }
  return state;
};

const AuthenticatedUserStateContext = React.createContext(initialAuthenticatedUserState);
const AuthenticatedUserDispatchContext = React.createContext(initialDispatch);

export const useAuthenticatedUserState = () => useContext(AuthenticatedUserStateContext);

export const useAuthenticatedUserDispatch = () => useContext(AuthenticatedUserDispatchContext);

export const AuthenticatedUserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthenticatedUserState);
  return (
    <AuthenticatedUserStateContext.Provider value={state}>
      <AuthenticatedUserDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticatedUserDispatchContext.Provider>
    </AuthenticatedUserStateContext.Provider>
  );
};
