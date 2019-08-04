import {
  SessionsPreviewRequests,
  BoxSessionPreviewRequestStatus,
  BoxSessionPreviewRequestStatusEnum,
} from './reducer';

export const createSelectors = <S>(
  getSessionsPreviewRequestsSlice: (state: S) => SessionsPreviewRequests,
) => ({
  shouldSessionPreviewRequestBeStarted(boxName: string, state: S) {
    return (
      getSessionsPreviewRequestsSlice(state).get(boxName, BoxSessionPreviewRequestStatus()).status ===
      BoxSessionPreviewRequestStatusEnum.NEVER_STARTED
    );
  },
  isSessionPreviewRequestPending(boxName: string, state: S) {
    return (
      getSessionsPreviewRequestsSlice(state).get(boxName, BoxSessionPreviewRequestStatus()).status ===
      BoxSessionPreviewRequestStatusEnum.PENDING
    );
  },
  getSessionPreviewRequestError(boxName: string, state: S) {
    return getSessionsPreviewRequestsSlice(state).get(boxName, BoxSessionPreviewRequestStatus()).error;
  },
});
