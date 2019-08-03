import { FlashcardsAppState } from '..';
import { BoxSessionPreviewRequestStatus } from './reducers';
import { SessionPreview, Box, Session } from './types';

export const getBoxes = (state: FlashcardsAppState) => state.boxes.data.toList();

export const getBoxesRequestStatus = (state: FlashcardsAppState) => state.boxes.boxesRequestStatus;

export const getAddBoxRequestStatus = (state: FlashcardsAppState) => state.boxes.addBoxRequestStatus;

export const getSessionPreview = (boxName: string, state: FlashcardsAppState) => {
  const box = state.boxes.data.get(boxName, Box({ boxName }));
  const session = state.boxes.sessions.get(boxName, Session({ boxName }));
  const sessionPreview = SessionPreview({
    boxName: session.boxName,
    totalFlashcards: box.totalFlashcards,
    archivedFlashcards: box.archivedFlashcards,
    flashcardsToReview: session.flashcardsToReview,
  });
  return sessionPreview;
};

export const getBoxSessionPreviewRequestStatus = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessionsPreviewRequests.get(boxName, BoxSessionPreviewRequestStatus());
