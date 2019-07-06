import React, { useCallback } from 'react';
import { changeRoute, RoutePath } from './router/state';
import { useRoutesHistoryDispatch } from './router/context';

export const AddBoxButton: React.FC = () => {
  const dispatch = useRoutesHistoryDispatch();
  const createNewBox = useCallback(() => {
    return dispatch(changeRoute(RoutePath.NEW_BOX));
  }, [dispatch]);
  return (
    <button aria-label="create a new box" onClick={createNewBox}>
      Create a new box
    </button>
  );
};
