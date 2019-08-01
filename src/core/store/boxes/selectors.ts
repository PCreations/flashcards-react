import { FlashcardsAppState } from '..';
import { BoxSessionPreviewRequestStatus } from './reducers';
import { SessionPreview } from './types';

export const getBoxes = (state: FlashcardsAppState) => state.boxes.data.toList();

export const getBoxesRequestStatus = (state: FlashcardsAppState) => state.boxes.boxesRequestStatus;

export const getAddBoxRequestStatus = (state: FlashcardsAppState) => state.boxes.addBoxRequestStatus;

export const getSessionPreview = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessions.get(boxName, SessionPreview({ boxName }));

export const getBoxSessionPreviewRequestStatus = (boxName: string, state: FlashcardsAppState) =>
  state.boxes.sessionsPreviewRequests.get(boxName, BoxSessionPreviewRequestStatus());
