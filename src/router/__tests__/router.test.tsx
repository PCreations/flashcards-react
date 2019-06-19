import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup } from 'react-testing-library';
import { createRender } from '../../__tests__/createRender';
import { Route } from '..';
import { Routes } from '../state';
import { RoutesHistory } from '../context/routesHistory';

describe('Route', () => {
  afterEach(cleanup);
  test(`
    given a routes history where the current route is Routes.HOME
    and a <Route url={Routes.HOME} /> component
    then the component should be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return Routes.HOME;
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(<Route url={Routes.HOME}>some text</Route>);
    expect(queryByText('some text')).toBeInTheDocument();
  });
  test(`
    given a routes history where the current route is Routes.HOME
    and a <Route url={[Routes.NEW_BOX, Routes.HOME]} /> component
    then the component should be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return Routes.HOME;
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(<Route url={[Routes.NEW_BOX, Routes.HOME]}>some text</Route>);
    expect(queryByText('some text')).toBeInTheDocument();
  });
  test(`
    given a routes history where the current route is Routes.HOME
    and a <Route url={Routes.NEW_BOX} /> component
    then the component should not be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return Routes.HOME;
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(<Route url={Routes.NEW_BOX}>some text</Route>);
    expect(queryByText('some text')).toBe(null);
  });
});
