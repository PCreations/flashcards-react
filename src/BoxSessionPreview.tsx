import React from 'react';

type BoxSessionPreviewProps = {
  isSessionPreviewLoading: boolean;
  sessionPreviewRequestError?: string;
  box: { name: string; totalFlashcards: number; archivedFlashcards: number };
  numberOfFlashcardsToReview: number;
};

export const BoxSessionPreview: React.FC<BoxSessionPreviewProps> = ({
  isSessionPreviewLoading,
  sessionPreviewRequestError,
  box,
  numberOfFlashcardsToReview,
}) => {
  if (isSessionPreviewLoading) {
    return <>loading</>;
  }
  if (sessionPreviewRequestError) {
    return <div role="sessionPreviewError">{sessionPreviewRequestError}</div>;
  }
  return (
    <div>
      <h1>{box.name}</h1>
      <span>{box.totalFlashcards} flashcards</span>
      <span>{box.archivedFlashcards} archived</span>
      <p>{numberOfFlashcardsToReview} flashcards to review today</p>
      <button>Start the session</button>
      <button>Add a new flashcard in this box</button>
    </div>
  );
};
