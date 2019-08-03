import { List } from 'immutable';
import { createTestStore } from '../../../../__tests__/createTestStore';
import { getTestBoxesData } from '../../../../__tests__/data/boxes';
import { FlashcardsAppState, rootReducer } from '../..';
import {
  getBoxes,
  getBoxesRequestStatus,
  getSessionPreview,
  BoxesRequestStatusEnum,
  fetchBoxes,
  addBox,
  getAddBoxRequestStatus,
  getBoxSessionPreviewRequestStatus,
} from '..';
import { Box, SessionPreview } from '../types';
import { boxesRequestSucceeded, fetchSessionPreview } from '../actions';
import { AddBoxRequestStatusEnum, BoxSessionPreviewRequestStatusEnum } from '../reducers';

describe('fetching boxes', () => {
  test(`
  given no boxes have been fetched yet
  then the getBoxes selector should return an empty array
  and the getBoxesRequestStatus selector should return NEVER_STARTED
`, () => {
    const store = createTestStore();
    expect(getBoxes(store.getState())).toEqual(List());
    expect(getBoxesRequestStatus(store.getState()).status).toEqual(BoxesRequestStatusEnum.NEVER_STARTED);
  });

  test(`
  given no boxes have been fetched yet
  when a fetchBoxes action is dispatched
  then the boxesRequestStatus selector should return PENDING on the first state update
  then the getBoxes selector should return the boxes array
  and the boxesRequestStatus selector should return SUCCEED on the last state update
`, async () => {
    const boxes = getTestBoxesData();
    const updates: FlashcardsAppState[] = [];
    const store = createTestStore({
      fetchBoxes: jest.fn().mockResolvedValueOnce(boxes),
    });
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(fetchBoxes());
    expect(getBoxesRequestStatus(updates[0]).status).toEqual(BoxesRequestStatusEnum.PENDING);
    expect(getBoxes(updates[1])).toEqual(List(boxes.map(Box)));
    expect(getBoxesRequestStatus(updates[1]).status).toEqual(BoxesRequestStatusEnum.SUCCEEDED);
  });

  test(`
  given no boxes have been fetched yet
  and the fetchBoxes request eventually throws an error
  when a fetchBoxes action is dispatched
  then the getBoxes selector should return an empty array
  and the boxRequestStatus selector should indicate that something got wrong, with the thrown error's message
`, async () => {
    const someError = new Error('some error');
    const store = createTestStore({
      fetchBoxes: jest.fn().mockRejectedValueOnce(someError),
    });
    await store.dispatch(fetchBoxes());
    expect(getBoxes(store.getState())).toEqual(List());
    expect(getBoxesRequestStatus(store.getState()).toJS()).toEqual({
      status: BoxesRequestStatusEnum.FAILED,
      error: 'some error',
    });
  });
});

describe('adding a box', () => {
  test(`
  given some boxes have been fetched
  when a addBox action is dispatched for a box named "the new box"
  then the boxes list should optimistically contain the new box with 1 total flashcards and 0 archived flashcards and an optimistic flag set to true
  and the boxes list should eventually contain the real box returned by the server
`, async () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const store = createTestStore(
      {
        fetchBoxes: jest.fn().mockResolvedValueOnce(boxes),
      },
      initialState,
    );
    const updates: FlashcardsAppState[] = [];
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(addBox({ boxName: 'the new box', flashcardAnswer: '', flashcardQuestion: '' }));
    expect(getBoxes(updates[1]).toJS()).toEqual([
      ...boxes.map(b => ({ ...b, optimistic: false })),
      {
        boxName: 'the new box',
        totalFlashcards: 1,
        archivedFlashcards: 0,
        optimistic: true,
      },
    ]);
    expect(getAddBoxRequestStatus(updates[1]).toJS()).toEqual({
      status: AddBoxRequestStatusEnum.SUCCEEDED,
      error: undefined,
    });
  });

  test(`
  given boxes have been fetched but no boxes were returned
  when a addBox action is dispatched for a box named "the new box"
  and a fetchBoxes action is dispatched and there is still no boxes on the server
  then the boxes list should optimistically contain the new box with 1 total flashcards and 0 archived flashcards and an optimistic flag set to true
`, async () => {
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List() }));
    const store = createTestStore(
      {
        fetchBoxes: jest.fn().mockResolvedValue([]),
      },
      initialState,
    );
    const updates: FlashcardsAppState[] = [];
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(addBox({ boxName: 'the new box', flashcardAnswer: '', flashcardQuestion: '' }));
    await store.dispatch(fetchBoxes());
    expect(getBoxes(updates[0]).toJS()).toEqual([
      {
        boxName: 'the new box',
        totalFlashcards: 1,
        archivedFlashcards: 0,
        optimistic: true,
      },
    ]);
  });

  test(`
  given some boxes have been fetched
  when a addBox action is dispatched for a box named "My New Awesome Box"
  and the server eventually returns an unknown error
  then the boxes list should still optimistically contain My New Awesome Box with 1 total flashcards and 0 archived flashcards and an optimistic flag set to true
  and the getAddBoxRequestStatus should return FAILED_WITH_UNKNOWN_ERROR
`, async () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const store = createTestStore(
      {
        fetchBoxes: jest.fn().mockResolvedValue([]),
        addFlashcardToBox: jest.fn().mockRejectedValueOnce(new Error()),
      },
      initialState,
    );
    await store.dispatch(
      addBox({ boxName: 'My New Awesome Box', flashcardAnswer: '', flashcardQuestion: '' }),
    );
    expect(getAddBoxRequestStatus(store.getState()).toJS()).toEqual({
      status: AddBoxRequestStatusEnum.FAILED_WITH_UNKNOWN_ERROR,
      error: 'An error occured while creating the "My New Awesome Box" box. Please retry later',
    });
  });
});

describe('fetching session preview', () => {
  test(`
  given some boxes have been fetched
  and the session preview for the box box42 has not been fetched
  then the getSessionPreview selector should return a partial SessionPreview record
  and the getBoxSessionPreviewRequestStatus selector should return NEVER_STARTED 
`, () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const store = createTestStore({}, initialState);
    expect(getSessionPreview(boxes[0].boxName, store.getState())).toEqual(
      SessionPreview({
        boxName: boxes[0].boxName,
        totalFlashcards: boxes[0].totalFlashcards,
        archivedFlashcards: boxes[0].archivedFlashcards,
      }),
    );
    expect(getBoxSessionPreviewRequestStatus(boxes[0].boxName, store.getState()).status).toEqual(
      BoxesRequestStatusEnum.NEVER_STARTED,
    );
  });

  test(`
  given some boxes have been fetched
  abd the session preview for the box box42 has not been fetched
  when a fetchSessionPreview action is dispatched
  then the boxSessionPreviewRequestStatus selector should return PENDING on the first state update
  then the getSessionPreview selector should return the correct session preview
  and the getBoxSessionPreviewRequestStatus selector should return SUCCEED on the last state update
  `, async () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const store = createTestStore(
      {
        fetchSessionPreview: jest.fn().mockResolvedValueOnce({
          boxName: boxes[0].boxName,
          totalFlashcards: boxes[0].totalFlashcards,
          archivedFlashcards: boxes[0].archivedFlashcards,
          flashcardsToReview: 7,
        }),
      },
      initialState,
    );
    const updates: FlashcardsAppState[] = [];
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(fetchSessionPreview({ boxName: boxes[0].boxName }));
    expect(getBoxSessionPreviewRequestStatus(boxes[0].boxName, updates[0]).status).toEqual(
      BoxSessionPreviewRequestStatusEnum.PENDING,
    );
    expect(getSessionPreview(boxes[0].boxName, updates[1])).toEqual(
      SessionPreview({
        boxName: boxes[0].boxName,
        totalFlashcards: boxes[0].totalFlashcards,
        archivedFlashcards: boxes[0].archivedFlashcards,
        flashcardsToReview: 7,
      }),
    );
    expect(getBoxSessionPreviewRequestStatus(boxes[0].boxName, updates[1]).status).toEqual(
      BoxSessionPreviewRequestStatusEnum.SUCCEEDED,
    );
  });

  test(`
  given some boxes have been fetched
  and the session preview for the box box42 has not been fetched
  and the fetchSessionPreview request eventually throws an error
  when a fetchSessionPreview action is dispatched
  then the getBoxSessionPreviewRequestStatus selector should indicate that something got wrong, with the thrown error's message
`, async () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const someError = new Error('some error');
    const store = createTestStore(
      {
        fetchSessionPreview: jest.fn().mockRejectedValueOnce(someError),
      },
      initialState,
    );
    await store.dispatch(fetchSessionPreview({ boxName: boxes[0].boxName }));
    expect(getBoxSessionPreviewRequestStatus(boxes[0].boxName, store.getState()).toJS()).toEqual({
      status: BoxSessionPreviewRequestStatusEnum.FAILED,
      error: 'some error',
    });
  });

  xtest(`
  given some boxes have been fetched
  and a new box has just been added
  when a fetchSessionPreview action is dispatched for this new box
  then the boxSessionPreviewRequestStatus selector should return PENDING on the first state update
  then the getSessionPreview selector should return the correct session preview
  and the getBoxSessionPreviewRequestStatus selector should return SUCCEED on the last state update
`, async () => {
    const boxes = getTestBoxesData();
    const initialState = rootReducer(undefined, boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
    const theNewBox = Box({
      boxName: 'the new box',
      totalFlashcards: 1,
      archivedFlashcards: 0,
    });
    const store = createTestStore(
      {
        fetchSessionPreview: jest.fn().mockResolvedValueOnce({
          ...theNewBox,
          flashcardsToReview: 1,
        }),
      },
      initialState,
    );
    await store.dispatch(addBox({ boxName: theNewBox.boxName, flashcardAnswer: '', flashcardQuestion: '' }));
    const updates: FlashcardsAppState[] = [];
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(fetchSessionPreview({ boxName: theNewBox.boxName }));
    expect(getBoxSessionPreviewRequestStatus(theNewBox.boxName, updates[0]).status).toEqual(
      BoxSessionPreviewRequestStatusEnum.PENDING,
    );
    expect(getSessionPreview(theNewBox.boxName, updates[1])).toEqual(
      SessionPreview({
        boxName: theNewBox.boxName,
        totalFlashcards: theNewBox.totalFlashcards,
        archivedFlashcards: theNewBox.archivedFlashcards,
        flashcardsToReview: 1,
      }),
    );
    expect(getBoxSessionPreviewRequestStatus(theNewBox.boxName, updates[1]).status).toEqual(
      BoxSessionPreviewRequestStatusEnum.SUCCEEDED,
    );
  });
});
