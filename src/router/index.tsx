import React from 'react';
import { Routes, getCurrentRoute, changeRoute } from './state';
import { useRoutesHistoryDispatch, useRoutesHistoryState } from './context';

type RouteProps = {
  url: Routes;
};

export const Route: React.FC<RouteProps> = ({ url, children }) => {
  const state = useRoutesHistoryState();
  if (getCurrentRoute(state) === url) {
    return <>{children}</>;
  }
  return null;
};

type RedirectProps = {
  to: Routes;
};

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const state = useRoutesHistoryState();
  const dispatch = useRoutesHistoryDispatch();
  const currentRoute = getCurrentRoute(state);
  if (currentRoute !== to) {
    dispatch(changeRoute(Routes.HOME));
  }
  return null;
};
