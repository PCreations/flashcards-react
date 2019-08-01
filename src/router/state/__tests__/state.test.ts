import { routerReducer, getCurrentRoute, RoutePath, changeRoute } from '..';

describe('router state', () => {
  test('default route is "Home"', () => {
    const routerState = routerReducer();
    expect(getCurrentRoute(routerState)).toEqual(RoutePath.HOME);
  });

  test('given a changeRoute action with route = Routes.NEW_BOX and a default routerState then the current route should now be Routes.NEW_BOX', () => {
    const routerState = routerReducer();
    expect(getCurrentRoute(routerReducer(routerState, changeRoute(RoutePath.NEW_BOX)))).toEqual(
      RoutePath.NEW_BOX,
    );
  });
});
