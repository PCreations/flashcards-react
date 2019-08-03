import { createRequestStatusManager, RequestStatusManagerState, HandledActions, RequestStatusEnum } from '..';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

describe('createRequestStatusManager', () => {
  describe('handling one request status manager', () => {
    test(`
    given a requestStatusManager
    and no request has ever been created
    when creating a request
    then the request status should be NEVER_STARTED
  `, () => {
      const requestId = '42';
      const requestStatusManager = createRequestStatusManager();
      const store = createStore<RequestStatusManagerState, HandledActions, any, any>(
        requestStatusManager.reducer,
        requestStatusManager.initialState,
      );
      store.dispatch(requestStatusManager.createRequest(requestId));
      expect(requestStatusManager.getRequestStatus(requestId, store.getState()).status).toBe(
        RequestStatusEnum.NEVER_STARTED,
      );
    });
    test(`
    given a requestStatusManager
    when trying to get the status of a non existing request
    then an error should be thrown
  `, () => {
      const requestStatusManager = createRequestStatusManager();
      const store = createStore<RequestStatusManagerState, HandledActions, any, any>(
        requestStatusManager.reducer,
        requestStatusManager.initialState,
      );
      expect(() =>
        requestStatusManager.getRequestStatus('NON_EXISTING_REQUEST_ID', store.getState()),
      ).toThrowError();
    });
    test(`
    given a requestStatusManager
    and a request in a NEVER_STARTED state
    when the request has started
    then the request status should be STARTED
  `, () => {
      const requestId = '42';
      const requestStatusManager = createRequestStatusManager();
      const store = createStore<RequestStatusManagerState, HandledActions, any, any>(
        requestStatusManager.reducer,
        requestStatusManager.initialState,
      );
      store.dispatch(requestStatusManager.createRequest(requestId));
      store.dispatch(requestStatusManager.requestStarted(requestId));
      expect(requestStatusManager.getRequestStatus(requestId, store.getState()).status).toBe(
        RequestStatusEnum.STARTED,
      );
    });
    test(`
    given a requestStatusManager
    and a request in a STARTED state
    when the request has succeeded
    then the request status should be SUCCEEDED
  `, () => {
      const requestId = '42';
      const requestStatusManager = createRequestStatusManager();
      const store = createStore<RequestStatusManagerState, HandledActions, any, any>(
        requestStatusManager.reducer,
        requestStatusManager.initialState,
      );
      store.dispatch(requestStatusManager.createRequest(requestId));
      store.dispatch(requestStatusManager.requestStarted(requestId));
      store.dispatch(requestStatusManager.requestSucceeded(requestId));
      expect(requestStatusManager.getRequestStatus(requestId, store.getState()).status).toBe(
        RequestStatusEnum.SUCCEEDED,
      );
    });
    test(`
    given a requestStatusManager
    and a request in a STARTED state
    when the request has failed
    then the request status should be FAILED
    and the request status error should be populated with the error message
  `, () => {
      const requestId = '42';
      const expectedErrorMessage = 'some error message';
      const requestStatusManager = createRequestStatusManager();
      const store = createStore<RequestStatusManagerState, HandledActions, any, any>(
        requestStatusManager.reducer,
        requestStatusManager.initialState,
      );
      store.dispatch(requestStatusManager.createRequest(requestId));
      store.dispatch(requestStatusManager.requestStarted(requestId));
      store.dispatch(requestStatusManager.requestFailed(requestId, expectedErrorMessage));
      expect(requestStatusManager.getRequestStatus(requestId, store.getState()).status).toBe(
        RequestStatusEnum.FAILED,
      );
      expect(requestStatusManager.getRequestStatus(requestId, store.getState()).error).toBe(
        expectedErrorMessage,
      );
    });
    /*test(`
      given a requestStatusManager
      when creating a requestFetcher that resolves to { foo: 'data' } and emits an fooDataReceived action
      and resolving the fetcher
      then the state should have been updated for the request to :
        NEVER_STARTED
        STARTED
        SUCCEEDED
      and 
    `, async done => {
      const requestId = '42';
      const requestStatusManager = createRequestStatusManager();
      const fooReducer = (state: { foo: string } = { foo: '' }, action: any): { foo: string } => {
        if (action.type === 'foo data received') {
          return {
            ...state,
            foo: action.payload.data,
          };
        }
        return state;
      };
      const reducer = combineReducers({
        foo: fooReducer,
        bar: requestStatusManager.reducer,
      });
      const initialState = {
        foo: { foo: '' },
        bar: requestStatusManager.initialState,
      };
      const store = createStore(reducer, initialState);
      const getFooData = (state: typeof initialState) => state.foo.foo;
      const fetchFooData = jest.fn().mockResolvedValueOnce('some data');
      const fooDataReceived = (data: string) => ({
        type: 'foo data received',
        payload: {
          data,
        },
      });
      const fetchAction = requestStatusManager.createFetcher(fetchFooData, fooDataReceived);
      await store.dispatch(fetchAction(requestId));
      expect(getFooData(store.getState())).toBe('some data');
      expect(requestStatusManager.getRequestStatus(requestId, store.getState().bar).status).toBe(
        RequestStatusEnum.SUCCEEDED,
      );
    });*/
  });
  describe('handling multiple request status manager', () => {
    test(`
    given a foo requestStatusManager
    and a bar requestStatusManager
    and a foo request in a STARTED state
    when creating a bar request
    then the bar request should be in a NEVER_STARTED state
    and the foo request should not have been touched
    `, () => {
      const fooRequestId = 'foo42';
      const barRequestId = 'bar42';
      const fooRequestStatusManager = createRequestStatusManager();
      const barRequestStatusManager = createRequestStatusManager();
      const reducer = combineReducers({
        foo: fooRequestStatusManager.reducer,
        bar: barRequestStatusManager.reducer,
      });
      const initialState = {
        foo: fooRequestStatusManager.initialState,
        bar: barRequestStatusManager.initialState,
      };
      const store = createStore<ReturnType<typeof reducer>, HandledActions, any, any>(reducer, initialState);
      store.dispatch(fooRequestStatusManager.createRequest(fooRequestId));
      store.dispatch(fooRequestStatusManager.requestStarted(fooRequestId));
      store.dispatch(barRequestStatusManager.createRequest(barRequestId));
      expect(barRequestStatusManager.getRequestStatus(barRequestId, store.getState().bar).status).toBe(
        RequestStatusEnum.NEVER_STARTED,
      );
      expect(fooRequestStatusManager.getRequestStatus(fooRequestId, store.getState().foo).status).toBe(
        RequestStatusEnum.STARTED,
      );
    });
  });
});
