import { renderHook, act } from 'react-hooks-testing-library';
import { useHistory } from '../useHistory';
import { Routes, changeRoute } from '../../state';

describe('useHistory hook', () => {
  test(`
  given an routes history with an initial current route being Routes.NEW_BOX
  when the useHistory hook is mounted
  then the current route should be Routes.NEW_BOX
  `, () => {
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return Routes.NEW_BOX;
        },
        pushRoute: jest.fn(),
        onPopStateEvent: jest.fn(),
      }),
    );
    expect(result.current.state.currentRoute).toBe(Routes.NEW_BOX);
  });
  test(`
  given an routes history with an initial current route being Routes.HOME
  when a changeRoute action is dispatched with Routes.NEW_BOX as payload
  then the current route should be Routes.NEW_BOX
  and the routes history pushState should have received the Routes.NEW_BOX
  `, () => {
    const pushRoute = jest.fn();
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return Routes.HOME;
        },
        pushRoute,
        onPopStateEvent: jest.fn(),
      }),
    );
    expect(result.current.state.currentRoute).toBe(Routes.HOME);
    act(() => result.current.dispatch(changeRoute(Routes.NEW_BOX)));
    expect(pushRoute).toHaveBeenCalledWith(Routes.NEW_BOX);
    expect(result.current.state.currentRoute).toBe(Routes.NEW_BOX);
  });
  test(`
  given an routes history with an initial current route being Routes.NEW_BOX
  when a popstate event is triggered by the routes history with Routes.HOME as payload
  then the current route should be Routes.HOME
  and the routes history pushState should not have been called
  `, () => {
    let popStateListener: (route: Routes) => void = () => {};
    const { result } = renderHook(() =>
      useHistory({
        getCurrentRoute() {
          return Routes.HOME;
        },
        pushRoute: jest.fn(),
        onPopStateEvent: listener => {
          popStateListener = listener;
        },
      }),
    );
    expect(result.current.state.currentRoute).toBe(Routes.HOME);
    act(() => popStateListener(Routes.NEW_BOX));
    expect(result.current.state.currentRoute).toBe(Routes.NEW_BOX);
  });
});
