import { Map } from 'immutable';
import {
  createRequest,
  requestStarted,
  requestSucceeded,
  requestFailed,
  RequestStatusManagerActionTypes,
} from './actions';
import { RequestId, RequestStatus, RequestStatusEnum } from './RequestStatus';
import { RequestStatusManagerId } from './createRequestStatusManager';

export type HandledActions =
  | ReturnType<typeof createRequest>
  | ReturnType<typeof requestStarted>
  | ReturnType<typeof requestSucceeded>
  | ReturnType<typeof requestFailed>;

export type RequestStatusManagerState = Map<RequestId, RequestStatus>;

const RequestStatusManagerState = (state?: RequestStatusManagerState): RequestStatusManagerState =>
  state || Map<RequestId, RequestStatus>();

export const createRequestStatusManagerReducer = (requestStatusManagerId: RequestStatusManagerId) =>
  function requestStatusManagerReducer(
    state = RequestStatusManagerState(),
    action?: HandledActions,
  ): RequestStatusManagerState {
    if (!action || !action.meta) return state;
    if (action.meta.requestStatusManagerId !== requestStatusManagerId) return state;
    switch (action.type) {
      case RequestStatusManagerActionTypes.REQUEST_CREATED:
        return state.set(action.payload.requestId, RequestStatus());
      case RequestStatusManagerActionTypes.REQUEST_STARTED:
        return state.update(action.payload.requestId, requestStatus =>
          requestStatus.set('status', RequestStatusEnum.STARTED),
        );
      case RequestStatusManagerActionTypes.REQUEST_SUCCEEDED:
        return state.update(action.payload.requestId, requestStatus =>
          requestStatus.set('status', RequestStatusEnum.SUCCEEDED),
        );
      case RequestStatusManagerActionTypes.REQUEST_FAILED:
        return state.update(action.payload.requestId, requestStatus =>
          requestStatus.set('status', RequestStatusEnum.FAILED).set('error', action.payload.error),
        );
    }
    return state;
  };
