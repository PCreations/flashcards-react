import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { FlashcardsAppDependencies, FlashcardsAppState } from '../core/store';
import { RoutePath } from '../router/state';
import { RoutesHistory } from '../router/context/routesHistory';
import { RoutesHistoryProvider } from '../router/context';
import { createTestStore } from './createTestStore';

export const createRender = ({
  deps,
  routesHistory = {
    getCurrentRoute: () => RoutePath.HOME,
    pushRoute: jest.fn(),
    onPopStateEvent: jest.fn(),
  },
  initialState = FlashcardsAppState(),
}: {
  deps?: FlashcardsAppDependencies;
  routesHistory?: RoutesHistory;
  initialState?: FlashcardsAppState;
}) => {
  const store = createTestStore(deps, initialState);
  return (ui: React.ReactElement<any>, ...rest: any) =>
    render(
      <Provider store={store}>
        <RoutesHistoryProvider routesHistory={routesHistory}>{ui}</RoutesHistoryProvider>
      </Provider>,
      rest,
    );
};
