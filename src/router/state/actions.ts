import { Routes } from './routes';

export enum RouterActionTypes {
  ROUTE_CHANGED = '[router] - the current route changed',
}

export const changeRoute = (route: Routes) => ({
  type: RouterActionTypes.ROUTE_CHANGED as RouterActionTypes.ROUTE_CHANGED,
  payload: {
    route,
  },
});
