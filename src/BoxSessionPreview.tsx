import React from 'react';
import { BoxSessionPreviewRequestStatusEnum } from './core/store/boxes';

type BoxSessionPreviewProps = {
  sessionPreviewRequestStatus: BoxSessionPreviewRequestStatusEnum;
  sessionPreviewRequestError?: string;
  box: { name: string; totalFlashcards: number; archivedFlashcards: number };
  numberOfFlashcardsToReview: number;
};

export const BoxSessionPreview: React.FC<BoxSessionPreviewProps> = ({
  sessionPreviewRequestStatus,
  sessionPreviewRequestError,
  box,
  numberOfFlashcardsToReview,
}) => {
  if (
    sessionPreviewRequestStatus === BoxSessionPreviewRequestStatusEnum.PENDING ||
    sessionPreviewRequestStatus === BoxSessionPreviewRequestStatusEnum.NEVER_STARTED
  ) {
    return <>loading</>;
  }
  if (sessionPreviewRequestStatus === BoxSessionPreviewRequestStatusEnum.FAILED) {
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
