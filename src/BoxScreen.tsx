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

const withImmutablePropsToJS = (BoxScreen: React.FC<BoxScreenProps>) => {
  const Wrapper: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = ({
    boxes,
    ...rest
  }) => <BoxScreen boxes={boxes.toJS()} {...rest} />;
  return Wrapper;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(BoxScreen));
