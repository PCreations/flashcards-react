import React from 'react';
import { connect } from 'react-redux';

export type AddBoxButtonProps = {
  createNewBox: () => void;
};

const AddBoxButtonDisplay: React.FC<AddBoxButtonProps> = ({ createNewBox }) => (
  <button aria-label="create a new box" onClick={createNewBox}>
    Create a new box
  </button>
);

export const AddBoxButton = connect(
  null,
  dispatch => ({
    createNewBox() {
      //todo
    },
  }),
)(AddBoxButtonDisplay);
