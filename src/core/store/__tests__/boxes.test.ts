import { List } from 'immutable';
import { createTestStore } from '../../../__tests__/createTestStore';
import { getTestBoxesData } from '../../../__tests__/data/boxes';
import { FlashcardsAppState, rootReducer, boxesSelectors } from '..';
import { fetchBoxes, addBox, Box, SessionPreview } from '../boxes';
import { boxesRequestSucceeded, fetchSessionPreview } from '../boxes/actions';

describe('fetching boxes', () => {
  test(`
  given no boxes have been fetched yet
  then the getBoxes selector should return an empty array
  and the shouldBoxesRequestBeStarted selector should return true
`, () => {
    const store = createTestStore();
    expect(boxesSelectors.getBoxes(store.getState())).toEqual(List());
    expect(boxesSelectors.shouldBoxesRequestBeStarted(store.getState())).toEqual(true);
  });

  test(`
  given no boxes have been fetched yet
  when a fetchBoxes action is dispatched
  then the boxesRequestStatus selector should return PENDING on the first state update
  then the getBoxes selector should return the boxes array
`, async () => {
    const boxes = getTestBoxesData();
    const updates: FlashcardsAppState[] = [];
    const store = createTestStore({
      fetchBoxes: jest.fn().mockResolvedValueOnce(boxes),
    });
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(fetchBoxes());
    expect(boxesSelectors.isBoxesRequestPending(updates[0])).toEqual(true);
    expect(boxesSelectors.getBoxes(updates[1])).toEqual(List(boxes.map(Box)));
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
    expect(boxesSelectors.getBoxes(store.getState())).toEqual(List());
    expect(boxesSelectors.getBoxesRequestStatusError(store.getState())).toEqual('some error');
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
    expect(boxesSelectors.getBoxes(updates[1]).toJS()).toEqual([
      ...boxes.map(b => ({ ...b, optimistic: false })),
      {
        boxName: 'the new box',
        totalFlashcards: 1,
        archivedFlashcards: 0,
        optimistic: true,
      },
    ]);
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
    expect(boxesSelectors.getBoxes(updates[0]).toJS()).toEqual([
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
  and the getAddBoxRequestStatusError should return a comprehensive error message
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
    expect(boxesSelectors.getAddBoxRequestStatusError(store.getState())).toEqual(
      'An error occured while creating the "My New Awesome Box" box. Please retry later',
    );
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
    expect(boxesSelectors.getSessionPreview(boxes[0].boxName, store.getState())).toEqual(
      SessionPreview({
        boxName: boxes[0].boxName,
        totalFlashcards: boxes[0].totalFlashcards,
        archivedFlashcards: boxes[0].archivedFlashcards,
      }),
    );
    expect(boxesSelectors.shouldSessionPreviewRequestBeStarted(boxes[0].boxName, store.getState())).toEqual(
      true,
    );
  });

  test(`
  given some boxes have been fetched
  abd the session preview for the box box42 has not been fetched
  when a fetchSessionPreview action is dispatched
  then the isBoxSessionPreviewRequestPending selector should return true on the first state update
  then the getSessionPreview selector should return the correct session preview
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
    expect(boxesSelectors.isSessionPreviewRequestPending(boxes[0].boxName, updates[0])).toEqual(true);
    expect(boxesSelectors.getSessionPreview(boxes[0].boxName, updates[1])).toEqual(
      SessionPreview({
        boxName: boxes[0].boxName,
        totalFlashcards: boxes[0].totalFlashcards,
        archivedFlashcards: boxes[0].archivedFlashcards,
        flashcardsToReview: 7,
      }),
    );
  });

  test(`
  given some boxes have been fetched
  and the session preview for the box box42 has not been fetched
  and the fetchSessionPreview request eventually throws an error
  when a fetchSessionPreview action is dispatched
  then the getSessionPreviewRequestError selector should return the thrown error's message
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
    expect(boxesSelectors.getSessionPreviewRequestError(boxes[0].boxName, store.getState())).toEqual(
      'some error',
    );
  });

  test(`
  given some boxes have been fetched
  and a new box has just been added
  when a fetchSessionPreview action is dispatched for this new box
  then the isSessionPreviewRequestPending selector should return true on the first state update
  then the getSessionPreview selector should return the correct session preview`, async () => {
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
          ...theNewBox.toJS(),
          flashcardsToReview: 1,
        }),
      },
      initialState,
    );
    await store.dispatch(addBox({ boxName: theNewBox.boxName, flashcardAnswer: '', flashcardQuestion: '' }));
    const updates: FlashcardsAppState[] = [];
    store.subscribe(() => updates.push(store.getState()));
    await store.dispatch(fetchSessionPreview({ boxName: theNewBox.boxName }));
    expect(boxesSelectors.isSessionPreviewRequestPending(theNewBox.boxName, updates[0])).toEqual(true);
    expect(boxesSelectors.getSessionPreview(theNewBox.boxName, store.getState())).toEqual(
      SessionPreview({
        boxName: theNewBox.boxName,
        totalFlashcards: theNewBox.totalFlashcards,
        archivedFlashcards: theNewBox.archivedFlashcards,
        flashcardsToReview: 1,
      }),
    );
  });
});
