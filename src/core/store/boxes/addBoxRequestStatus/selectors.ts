import { AddBoxRequestStatus } from './reducer';

export const createSelectors = <S>(getAddBoxRequestStatusSlice: (state: S) => AddBoxRequestStatus) => ({
  getAddBoxRequestStatusError(state: S) {
    return getAddBoxRequestStatusSlice(state).error;
  },
});
