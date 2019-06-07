import { Routes } from '../state';

export interface RoutesHistory {
  getCurrentRoute: () => Routes;
  pushRoute: (route: Routes) => void;
  onPopStateEvent: (listener: (route: Routes) => void) => void;
}
