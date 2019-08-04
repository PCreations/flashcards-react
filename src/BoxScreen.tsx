import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boxesSelectors } from './core/store';
import { fetchBoxes, addBox } from './core/store/boxes';
import { Route } from './router';
import { RoutePath } from './router/state';
import { BoxList } from './BoxList';
import { BoxListEmptyState } from './BoxListEmptyState';
import { AddBoxForm } from './AddBoxForm/';

export const BoxScreen: React.FC = () => {
  const boxes = useSelector(boxesSelectors.getBoxes);
  const startBoxesRequest = useSelector(boxesSelectors.shouldBoxesRequestBeStarted);
  const boxesRequestPending = useSelector(boxesSelectors.isBoxesRequestPending);
  const boxesRequestError = useSelector(boxesSelectors.getBoxesRequestStatusError);
  const addBoxRequestError = useSelector(boxesSelectors.getAddBoxRequestStatusError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (startBoxesRequest) {
      dispatch(fetchBoxes());
    }
  }, [dispatch, startBoxesRequest]);
  return (
    <>
      {boxesRequestPending ? (
        <p>loading...</p>
      ) : boxes.size === 0 ? (
        <BoxListEmptyState />
      ) : (
        <BoxList
          boxes={boxes.toArray()}
          isBoxesRequestPending={boxesRequestPending}
          boxesRequestError={boxesRequestError}
          addBoxRequestError={addBoxRequestError}
        />
      )}
      <Route path={RoutePath.NEW_BOX}>
        {() => <AddBoxForm onSubmit={fields => dispatch(addBox(fields))} />}
      </Route>
    </>
  );
};
