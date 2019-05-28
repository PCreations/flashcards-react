import React from 'react';

type BoxListEmptyStateProps = {
  createNewBox: () => void;
};

export const BoxListEmptyState: React.FC<BoxListEmptyStateProps> = ({ createNewBox }) => (
  <div>
    <h1>No flashcards box yet</h1>
    <h2>Create a new box and it will show up here.</h2>
    <button aria-label="create a new box" onClick={createNewBox}>
      Create a new box
    </button>
  </div>
);
