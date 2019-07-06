import React from 'react';
import { RoutePath, matchRoute, getCurrentRoute, changeRoute } from './state';
import { useRoutesHistoryDispatch, useRoutesHistoryState } from './context';

type RouteProps = {
  path: RoutePath | RoutePath[];
  children: (params: { [key: string]: any }) => React.ReactElement;
};

export const Route: React.FC<RouteProps> = ({ path, children }) => {
  const state = useRoutesHistoryState();
  const currentRoute = getCurrentRoute(state);
  const pathAsArray = Array.isArray(path) ? path : [path];
  const matchedRoutes = pathAsArray.map(path => matchRoute(currentRoute, path)).filter(Boolean) as {
    [key: string]: any;
  };
  return matchedRoutes.length === 0 ? null : children(matchedRoutes[0]);
};

type RedirectProps = {
  to: RoutePath;
};

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const state = useRoutesHistoryState();
  const dispatch = useRoutesHistoryDispatch();
  const currentRoute = getCurrentRoute(state);
  if (currentRoute !== to) {
    dispatch(changeRoute(to));
  }
  return null;
};
