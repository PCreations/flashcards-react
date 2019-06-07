import React, { useContext } from 'react';
import { RoutesHistory } from './routesHistory';
import { useHistory } from './useHistory';
import { RouterState, HandledActions } from '../state';

const RoutesHistoryStateContext = React.createContext(RouterState());
const RoutesHistoryDispatchContext = React.createContext((action: HandledActions) => {});

export const RoutesHistoryProvider: React.FC<{ routesHistory: RoutesHistory }> = ({
  routesHistory,
  children,
}) => {
  const { state, dispatch } = useHistory(routesHistory);
  return (
    <RoutesHistoryStateContext.Provider value={state}>
      <RoutesHistoryDispatchContext.Provider value={dispatch}>
        {children}
      </RoutesHistoryDispatchContext.Provider>
    </RoutesHistoryStateContext.Provider>
  );
};

export const useRoutesHistoryState = () => useContext(RoutesHistoryStateContext);
export const useRoutesHistoryDispatch = () => useContext(RoutesHistoryDispatchContext);
