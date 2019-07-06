import { renderHook, act } from 'react-hooks-testing-library';
import { useHistory } from '../useHistory';
import { RoutePath, changeRoute } from '../../state';

describe('useHistory hook', () => {
  test(`
  given an routes history with an initial current route being RoutePath.NEW_BOX
  when the useHistory hook is mounted
  then the current route should be RoutePath.NEW_BOX
  `, () => {
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return RoutePath.NEW_BOX;
        },
        pushRoute: jest.fn(),
        onPopStateEvent: jest.fn(),
      }),
    );
    expect(result.current.state.currentRoute).toBe(RoutePath.NEW_BOX);
  });
  test(`
  given an routes history with an initial current route being RoutePath.HOME
  when a changeRoute action is dispatched with RoutePath.NEW_BOX as payload
  then the current route should be RoutePath.NEW_BOX
  and the routes history pushState should have received the RoutePath.NEW_BOX
  `, () => {
    const pushRoute = jest.fn();
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return RoutePath.HOME;
        },
        pushRoute,
        onPopStateEvent: jest.fn(),
      }),
    );
    expect(result.current.state.currentRoute).toBe(RoutePath.HOME);
    act(() => result.current.dispatch(changeRoute(RoutePath.NEW_BOX)));
    expect(pushRoute).toHaveBeenCalledWith(RoutePath.NEW_BOX);
    expect(result.current.state.currentRoute).toBe(RoutePath.NEW_BOX);
  });
  test(`
  given an routes history with an initial current route being RoutePath.NEW_BOX
  when a popstate event is triggered by the routes history with RoutePath.HOME as payload
  then the current route should be RoutePath.HOME
  and the routes history pushState should not have been called
  `, () => {
    let popStateListener: (route: RoutePath) => void = () => {};
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return RoutePath.HOME;
        },
        pushRoute: jest.fn(),
        onPopStateEvent: listener => {
          popStateListener = listener;
        },
      }),
    );
    expect(result.current.state.currentRoute).toBe(RoutePath.HOME);
    act(() => popStateListener(RoutePath.NEW_BOX));
    expect(result.current.state.currentRoute).toBe(RoutePath.NEW_BOX);
  });
});
