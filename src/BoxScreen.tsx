import React, { useEffect } from 'react';
import { BoxList, BoxListProps } from './BoxList';
import { BoxListEmptyState, BoxListEmptyStateProps } from './BoxListEmptyState';
import { connect } from 'react-redux';
import { FlashcardsAppState, FlashcardsAppDependencies } from './core/store';
import { readBoxes } from './core/store/boxes/selectors';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchBoxes } from './core/store/boxes/behaviors';

type BoxScreenProps = BoxListProps &
  BoxListEmptyStateProps & {
    fetchBoxes: () => void;
  };

const BoxScreen: React.FC<BoxScreenProps> = ({ boxes, loading, fetchBoxes, createNewBox }) => {
  useEffect(() => {
    if (boxes.length === 0 && loading === false) {
      fetchBoxes();
    }
  });
  return boxes.length === 0 ? (
    <BoxListEmptyState createNewBox={createNewBox} />
  ) : (
    <BoxList boxes={boxes} loading={loading} />
  );
};

export default connect(
  (state: FlashcardsAppState) => ({
    boxes: readBoxes(state).data,
    loading: readBoxes(state).loading,
  }),
  (dispatch: ThunkDispatch<FlashcardsAppState, FlashcardsAppDependencies, AnyAction>) => ({
    createNewBox: () => {},
    fetchBoxes: () => dispatch(fetchBoxes()),
  }),
)(BoxScreen);
