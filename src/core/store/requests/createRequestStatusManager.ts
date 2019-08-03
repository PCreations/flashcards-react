import uuid from 'uuid';
import { RequestId } from './RequestStatus';
import { createRequest, requestStarted, requestSucceeded, requestFailed } from './actions';
import { createRequestStatusManagerReducer, RequestStatusManagerState } from './reducer';

export type RequestStatusManagerId = ReturnType<typeof uuid>;

export const createRequestStatusManager = () => {
  const requestManagerId = uuid();
  const getRequestStatus = (requestId: RequestId, state: RequestStatusManagerState) => {
    const requestStatus = state.get(requestId);
    if (!requestStatus) throw new Error(`request with id ${requestId} not found`);
    return requestStatus;
  };
  const reducer = createRequestStatusManagerReducer(requestManagerId);
  return {
    reducer: reducer,
    initialState: reducer(),
    createRequest: createRequest.bind(null, requestManagerId),
    requestStarted: requestStarted.bind(null, requestManagerId),
    requestSucceeded: requestSucceeded.bind(null, requestManagerId),
    requestFailed: requestFailed.bind(null, requestManagerId),
    getRequestStatus,
  };
};
