import { FlashcardsAppState } from '..';
import {
  BoxSessionPreviewRequestStatus,
  BoxesRequestStatusEnum,
  BoxSessionPreviewRequestStatusEnum,
} from './reducers';
import { SessionPreview, Box, Session } from './types';

export const getBoxes = (state: FlashcardsAppState) => state.boxes.data.toList();

export const shouldBoxesRequestBeStarted = (state: FlashcardsAppState) =>
  state.boxes.boxesRequestStatus.status === BoxesRequestStatusEnum.NEVER_STARTED;

export const isBoxesRequestPending = (state: FlashcardsAppState) =>
  state.boxes.boxesRequestStatus.status === BoxesRequestStatusEnum.PENDING;

export const getBoxesRequestStatusError = (state: FlashcardsAppState) => state.boxes.boxesRequestStatus.error;

export const getAddBoxRequestStatusError = (state: FlashcardsAppState) =>
  state.boxes.addBoxRequestStatus.error;

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

export const shouldSessionPreviewRequestBeStarted = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessionsPreviewRequests.get(boxName, BoxSessionPreviewRequestStatus()).status ===
  BoxSessionPreviewRequestStatusEnum.NEVER_STARTED;

export const isSessionPreviewRequestPending = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessionsPreviewRequests.get(boxName, BoxSessionPreviewRequestStatus()).status ===
  BoxSessionPreviewRequestStatusEnum.PENDING;

export const getSessionPreviewRequestError = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessionsPreviewRequests.get(boxName, BoxSessionPreviewRequestStatus()).error;
