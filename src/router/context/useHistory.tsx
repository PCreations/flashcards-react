import { useReducer } from 'react';
import { RoutesHistory } from './routesHistory';
import { routerReducer, RouterState, HandledActions, RouterActionTypes, changeRoute } from '../state';

export const useHistory = (routesHistory: RoutesHistory) => {
  const currentRoute = routesHistory.getCurrentRoute();
  const [state, baseDispatch] = useReducer(routerReducer, RouterState({ currentRoute }));
  const dispatch = (action: HandledActions) => {
    if (action.type === RouterActionTypes.ROUTE_CHANGED) {
      routesHistory.pushRoute(action.payload.route);
    }
    baseDispatch(action);
  };
  routesHistory.onPopStateEvent(route => baseDispatch(changeRoute(route)));
  return { state, dispatch };
};
