import { Record, Map } from 'immutable';
import { changeRoute, RouterActionTypes } from './actions';
import { RoutePath } from '.';

type RouterStateProps = {
  currentRoute: string;
  currentParams: Map<string, string>;
};

export const RouterState = Record<RouterStateProps>({
  currentRoute: RoutePath.HOME,
  currentParams: Map({}),
});

export type RouterState = ReturnType<typeof RouterState>;

export type HandledActions = ReturnType<typeof changeRoute>;

export const routerReducer = (state = RouterState(), action?: HandledActions) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case RouterActionTypes.ROUTE_CHANGED:
      return state.set('currentRoute', action.payload.route);
  }
};
