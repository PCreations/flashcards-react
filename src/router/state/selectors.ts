import { RouterState } from './reducers';

export const getCurrentRoute = (routerState: RouterState) => routerState.currentRoute;

export const getCurrentParams = (routerState: RouterState) => routerState.currentParams;
