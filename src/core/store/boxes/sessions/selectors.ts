import { Sessions, Session } from './reducer';

export const createSelectors = <S>(getSessionsSlice: (state: S) => Sessions) => ({
  getSessionFlashcardsToReview(boxName: string, state: S) {
    return getSessionsSlice(state).get(boxName, Session({ boxName })).flashcardsToReview;
  },
});
