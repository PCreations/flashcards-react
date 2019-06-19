import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { getBoxes, fetchBoxes, getBoxesRequestStatus, BoxesRequestStatusEnum } from './core/store/boxes';
import { Route } from './router';
import { Routes } from './router/state';
import { BoxList, BoxListProps } from './BoxList';
import { BoxListEmptyState } from './BoxListEmptyState';
import { AddBoxForm } from './AddBoxForm';

type BoxScreenProps = BoxListProps & {
  fetchBoxes: () => void;
};

const BoxScreenDisplay: React.FC<BoxScreenProps> = ({ boxes, boxesRequestStatus, fetchBoxes }) => {
  useEffect(() => {
    if (boxesRequestStatus === BoxesRequestStatusEnum.NEVER_STARTED) {
      fetchBoxes();
    }
  });
  return (
    <>
      {boxesRequestStatus === BoxesRequestStatusEnum.PENDING ? (
        <p>loading...</p>
      ) : boxes.length === 0 ? (
        <BoxListEmptyState />
      ) : (
        <BoxList boxes={boxes} boxesRequestStatus={boxesRequestStatus} />
      )}
      <Route url={Routes.NEW_BOX}>
        <AddBoxForm onSubmit={() => {}} />
      </Route>
    </>
  );
};

const mapStateToProps = (state: FlashcardsAppState) => ({
  boxes: getBoxes(state),
  boxesRequestStatus: getBoxesRequestStatus(state).status,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>,
) => ({
  createNewBox: () => {},
  fetchBoxes: () => dispatch(fetchBoxes()),
});

const withImmutablePropsToJS = (BoxScreenDisplay: React.FC<BoxScreenProps>) => {
  const Wrapper: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = ({
    boxes,
    ...rest
  }) => <BoxScreenDisplay boxes={boxes.toJS()} {...rest} />;
  return Wrapper;
};

export const BoxScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(BoxScreenDisplay));
