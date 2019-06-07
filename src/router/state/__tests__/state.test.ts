import { routerReducer, getCurrentRoute, Routes, changeRoute } from '..';

describe('router state', () => {
  test('default route is "Home"', () => {
    const routerState = routerReducer();
    expect(getCurrentRoute(routerState)).toEqual(Routes.HOME);
  });

  test('given a changeRoute action with route = Routes.NEW_BOX and a default routerState then the current route should now be Routes.NEW_BOX', () => {
    const routerState = routerReducer();
    expect(getCurrentRoute(routerReducer(routerState, changeRoute(Routes.NEW_BOX)))).toEqual(Routes.NEW_BOX);
  });
});
