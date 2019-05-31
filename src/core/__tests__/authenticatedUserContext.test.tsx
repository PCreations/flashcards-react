import React from 'react';
import { render } from 'react-testing-library';
import {
  AuthenticatedUserProvider,
  useAuthenticatedUserState,
  useAuthenticatedUserDispatch,
  NOT_AUTHENTICATED,
  userAuthenticated,
} from '../authenticatedUserContext';
import { AUTHENTICATED } from '../store/auth/types';

const setupContextHooks = <S, D>({
  Provider,
  useStateHook,
  useDispatchHook,
}: {
  Provider: React.ComponentType;
  useStateHook: () => S;
  useDispatchHook: () => D;
}): { getState: () => S; getDispatch: () => D } => {
  type TestProps = {
    children: ({ state, dispatch }: { state: S; dispatch: D }) => void;
  };
  const Test: React.FC<TestProps> = ({ children }) => {
    const state = useStateHook();
    const dispatch = useDispatchHook();
    children({ state, dispatch });
    return null;
  };
  let state: S;
  let dispatch: D;
  render(
    <Provider>
      <Test>{res => ({ state, dispatch } = res)}</Test>
    </Provider>,
  );
  return {
    getState() {
      return state;
    },
    getDispatch() {
      return dispatch;
    },
  };
};

test('initial state', () => {
  const { getState, getDispatch } = setupContextHooks({
    Provider: AuthenticatedUserProvider,
    useStateHook: useAuthenticatedUserState,
    useDispatchHook: useAuthenticatedUserDispatch,
  });
  expect(getState()).toEqual({
    currentUser: {
      status: NOT_AUTHENTICATED,
    },
  });
  getDispatch()(userAuthenticated({ userId: '42' }));
  expect(getState()).toEqual({
    currentUser: {
      status: AUTHENTICATED,
      userId: '42',
    },
  });
});
