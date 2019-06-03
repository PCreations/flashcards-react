import React, { useEffect } from 'react';
import { BoxList, BoxListProps } from './BoxList';
import { BoxListEmptyState, BoxListEmptyStateProps } from './BoxListEmptyState';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { getBoxes, fetchBoxes, getBoxesRequestStatus, BoxesRequestStatusEnum } from './core/store/boxes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type BoxScreenProps = BoxListProps &
  BoxListEmptyStateProps & {
    fetchBoxes: () => void;
  };

const BoxScreen: React.FC<BoxScreenProps> = ({ boxes, boxesRequestStatus, fetchBoxes, createNewBox }) => {
  useEffect(() => {
    console.log({ length: boxes.length, boxesRequestStatus });
    if (boxesRequestStatus === BoxesRequestStatusEnum.NEVER_STARTED) {
      fetchBoxes();
    }
  });
  return boxes.length === 0 ? (
    <BoxListEmptyState createNewBox={createNewBox} />
  ) : (
    <BoxList boxes={boxes} boxesRequestStatus={boxesRequestStatus} />
  );
};

export default connect(
  (state: FlashcardsAppState) => ({
    boxes: getBoxes(state),
    boxesRequestStatus: getBoxesRequestStatus(state).status,
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    createNewBox: () => {},
    fetchBoxes: () => dispatch(fetchBoxes()),
  }),
)(BoxScreen);
