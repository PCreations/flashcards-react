export enum RouterActionTypes {
  ROUTE_CHANGED = '[router] - the current route changed',
}

export const changeRoute = (route: string) => ({
  type: RouterActionTypes.ROUTE_CHANGED as RouterActionTypes.ROUTE_CHANGED,
  payload: {
    route,
  },
});
