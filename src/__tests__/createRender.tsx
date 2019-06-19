import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { createStore, FlashcardsAppDependencies, FlashcardsAppState } from '../core/store';
import { Routes } from '../router/state';
import { RoutesHistory } from '../router/context/routesHistory';
import { RoutesHistoryProvider } from '../router/context';

export const createRender = ({
  deps = { signIn: jest.fn(), fetchBoxes: jest.fn(), saveAuthData: jest.fn(), getAuthData: jest.fn() },
  routesHistory = {
    getCurrentRoute: () => Routes.HOME,
    pushRoute: jest.fn(),
    onPopStateEvent: jest.fn(),
  },
  initialState = FlashcardsAppState(),
}: {
  deps?: FlashcardsAppDependencies;
  routesHistory?: RoutesHistory;
  initialState?: FlashcardsAppState;
}) => {
  const store = createStore(deps, initialState);
  return (ui: React.ReactElement<any>, ...rest: any) =>
    render(
      <Provider store={store}>
        <RoutesHistoryProvider routesHistory={routesHistory}>{ui}</RoutesHistoryProvider>
      </Provider>,
      rest,
    );
};
