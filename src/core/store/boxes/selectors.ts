import { Record } from 'immutable';
import * as data from './data';
import * as sessions from './sessions';
import * as sessionsPreviewRequests from './sessionsPreviewRequests';
import * as boxesRequestStatus from './boxesRequestStatus';
import * as addBoxRequestStatus from './addBoxRequestStatus';
import { BoxesState } from './reducer';

type SessionPreviewProps = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  flashcardsToReview: number;
};

export const SessionPreview = Record<SessionPreviewProps>({
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
  flashcardsToReview: 0,
});

export type SessionPreview = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  flashcardsToReview: number;
};

export const createSelectors = <S>(getBoxesSlice: (state: S) => BoxesState) => {
  const dataSelectors = data.createSelectors((state: S) => getBoxesSlice(state).data);
  const sessionsSelectors = sessions.createSelectors((state: S) => getBoxesSlice(state).sessions);
  const sessionsPreviewSelectors = sessionsPreviewRequests.createSelectors(
    (state: S) => getBoxesSlice(state).sessionsPreviewRequests,
  );
  const boxesRequestStatusSelectors = boxesRequestStatus.createSelectors(
    (state: S) => getBoxesSlice(state).boxesRequestStatus,
  );
  const addBoxRequestStatusSelectors = addBoxRequestStatus.createSelectors(
    (state: S) => getBoxesSlice(state).addBoxRequestStatus,
  );
  const getSessionPreview = (boxName: string, state: S) => {
    const box = dataSelectors.getBox(boxName, state);
    const flashcardsToReview = sessionsSelectors.getSessionFlashcardsToReview(boxName, state);
    return SessionPreview({
      boxName,
      totalFlashcards: box.totalFlashcards,
      archivedFlashcards: box.archivedFlashcards,
      flashcardsToReview,
    });
  };
  return {
    getSessionPreview,
    ...dataSelectors,
    ...sessionsPreviewSelectors,
    ...boxesRequestStatusSelectors,
    ...addBoxRequestStatusSelectors,
  };
};
