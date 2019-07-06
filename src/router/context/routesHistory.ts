export interface RoutesHistory {
  getCurrentRoute: () => string;
  pushRoute: (route: string) => void;
  onPopStateEvent: (listener: (route: string) => void) => void;
}
