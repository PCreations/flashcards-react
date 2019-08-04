import { BoxesRequestStatus, BoxesRequestStatusEnum } from './reducer';

export const createSelectors = <S>(getBoxesRequestStatusSlice: (state: S) => BoxesRequestStatus) => ({
  shouldBoxesRequestBeStarted(state: S) {
    return getBoxesRequestStatusSlice(state).status === BoxesRequestStatusEnum.NEVER_STARTED;
  },
  isBoxesRequestPending(state: S) {
    return getBoxesRequestStatusSlice(state).status === BoxesRequestStatusEnum.PENDING;
  },
  getBoxesRequestStatusError(state: S) {
    return getBoxesRequestStatusSlice(state).error;
  },
});
