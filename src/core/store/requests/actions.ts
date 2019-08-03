import uuid from 'uuid';
import { RequestStatusManagerId } from './createRequestStatusManager';
import { RequestId } from './RequestStatus';
import { FlashcardsThunkAction } from '..';

export enum RequestStatusManagerActionTypes {
  REQUEST_CREATED = '[requests] - a request has been created',
  REQUEST_STARTED = '[requests] - a request has been started',
  REQUEST_SUCCEEDED = '[requests] - a request has succeeded',
  REQUEST_FAILED = '[requests] - a request has failed',
}

export const createRequest = (requestStatusManagerId: RequestStatusManagerId, requestId: RequestId) => ({
  type: RequestStatusManagerActionTypes.REQUEST_CREATED as RequestStatusManagerActionTypes.REQUEST_CREATED,
  payload: {
    requestId,
  },
  meta: {
    requestStatusManagerId,
  },
});

export const requestStarted = (requestStatusManagerId: RequestStatusManagerId, requestId: RequestId) => ({
  type: RequestStatusManagerActionTypes.REQUEST_STARTED as RequestStatusManagerActionTypes.REQUEST_STARTED,
  payload: {
    requestId,
  },
  meta: {
    requestStatusManagerId,
  },
});

export const requestSucceeded = (requestStatusManagerId: RequestStatusManagerId, requestId: RequestId) => ({
  type: RequestStatusManagerActionTypes.REQUEST_SUCCEEDED as RequestStatusManagerActionTypes.REQUEST_SUCCEEDED,
  payload: {
    requestId,
  },
  meta: {
    requestStatusManagerId,
  },
});

export const requestFailed = (
  requestStatusManagerId: RequestStatusManagerId,
  requestId: RequestId,
  error: string,
) => ({
  type: RequestStatusManagerActionTypes.REQUEST_FAILED as RequestStatusManagerActionTypes.REQUEST_FAILED,
  payload: {
    requestId,
    error,
  },
  meta: {
    requestStatusManagerId,
  },
});
