import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoxes,
  fetchBoxes,
  getBoxesRequestStatus,
  BoxesRequestStatusEnum,
  addBox,
  getAddBoxRequestStatus,
} from './core/store/boxes';
import { Route } from './router';
import { RoutePath } from './router/state';
import { BoxList } from './BoxList';
import { BoxListEmptyState } from './BoxListEmptyState';
import { AddBoxForm } from './AddBoxForm/';

export const BoxScreen: React.FC = () => {
  const boxes = useSelector(getBoxes);
  const boxesRequestStatus = useSelector(getBoxesRequestStatus).status;
  const addBoxRequestError = useSelector(getAddBoxRequestStatus).error;
  const dispatch = useDispatch();
  useEffect(() => {
    if (boxesRequestStatus === BoxesRequestStatusEnum.NEVER_STARTED) {
      dispatch(fetchBoxes());
    }
  }, [boxesRequestStatus, dispatch]);
  return (
    <>
      {boxesRequestStatus === BoxesRequestStatusEnum.PENDING ? (
        <p>loading...</p>
      ) : boxes.size === 0 ? (
        <BoxListEmptyState />
      ) : (
        <BoxList
          boxes={boxes.toArray()}
          boxesRequestStatus={boxesRequestStatus}
          addBoxRequestError={addBoxRequestError}
        />
      )}
      <Route path={RoutePath.NEW_BOX}>
        {() => <AddBoxForm onSubmit={fields => dispatch(addBox(fields))} />}
      </Route>
    </>
  );
};
