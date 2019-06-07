import { Record } from 'immutable';
import { Routes } from './routes';
import { changeRoute, RouterActionTypes } from './actions';

type RouterStateProps = {
  currentRoute: Routes;
};

export const RouterState = Record<RouterStateProps>({
  currentRoute: Routes.HOME,
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
