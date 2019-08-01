import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, act } from 'react-testing-library';
import userEvent from 'user-event';
import { createRender } from '../../__tests__/createRender';
import { RoutesHistory } from '../context/routesHistory';
import { Link } from '..';

describe('Link', () => {
  afterEach(cleanup);
  test(`
    given a <Link title="Some Box" to="something">Some Box</Link>
    when rendered
    then a tag with Some Box as title should be rendered
    and the Some Box text should be visible
  `, () => {
    const render = createRender({});
    const { getByTitle, container } = render(
      <Link title="Some Box" to="something">
        Some Box
      </Link>,
    );
    expect(getByTitle('Some Box')).toBeInTheDocument();
    expect(container).toHaveTextContent('Some Box');
  });
  test(`
    given a routesHistory where the current route is '/'
    given a <Link title="New box" to="/newBox"/>
    when clicking on the generated link
    then the new currentRoute should be '/newBox'
  `, () => {
    let currentRoute = '/';
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
    const { getByTitle } = render(<Link title="New box" to="/newBox" />);
    act(() => {
      userEvent.click(getByTitle('New box'));
    });
    expect(routesHistory.getCurrentRoute()).toBe('/newBox');
  });
});
