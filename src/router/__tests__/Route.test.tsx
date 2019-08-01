import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup } from 'react-testing-library';
import { createRender } from '../../__tests__/createRender';
import { Route, Redirect } from '..';
import { RoutesHistory } from '../context/routesHistory';
import { RoutePath } from '../state';

describe('Route', () => {
  afterEach(cleanup);
  test(`
    given a routes history where the current pathname is '/'
    and a <Route url={RoutePath.HOME} /> component
    then the component should be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return '/';
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(<Route path={RoutePath.HOME}>{() => <>some text</>}</Route>);
    expect(queryByText('some text')).toBeInTheDocument();
  });
  test(`
    given a routes history where the current pathname is '/'
    and a <Route url={[RoutePath.NEW_BOX, RoutePath.HOME]} /> component
    then the component should be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return '/';
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(
      <Route path={[RoutePath.NEW_BOX, RoutePath.HOME]}>{() => <>some text</>}</Route>,
    );
    expect(queryByText('some text')).toBeInTheDocument();
  });
  test(`
    given a routes history where the current pathname is '/newBox'
    and a <Route path={RoutePath.HOME} /> component
    then the component should not be rendered
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return '/newBox';
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(<Route path={RoutePath.HOME}>{() => <>some text</>}</Route>);
    expect(queryByText('some text')).toBe(null);
  });
  test(`
    given a routes history where the current route is /sessionPreview/some-box
    and a <Route path={RoutePath.SESSION_PREVIEW} /> component
    then the component should be rendered
    and the boxName params should be some-box
  `, () => {
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return '/sessionPreview/some-box';
      },
      pushRoute: jest.fn(),
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    const { queryByText } = render(
      <Route path={RoutePath.SESSION_PREVIEW}>
        {params => {
          expect(params.boxName).toEqual('some-box');
          return <>some text</>;
        }}
      </Route>,
    );
    expect(queryByText('some text')).toBeInTheDocument();
  });
  test(`
    given a routes history where the current route is /newBox
    and a <Redirect to={RoutePath.HOME} /> component
    then the currentRoute should now be RoutePath.HOME
  `, () => {
    let currentRoute = '/newBox';
    const routesHistory: RoutesHistory = {
      getCurrentRoute() {
        return currentRoute;
      },
      pushRoute: route => {
        currentRoute = route;
      },
      onPopStateEvent: jest.fn(),
    };
    const render = createRender({ routesHistory });
    render(<Redirect to={RoutePath.HOME} />);
    expect(routesHistory.getCurrentRoute()).toEqual('/');
  });
});
