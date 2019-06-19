import { List } from 'immutable';
import { createTestStore } from '../../../../__tests__/createTestStore';
import { FlashcardsAppState } from '../..';
import { getBoxes, getBoxesRequestStatus, BoxesRequestStatusEnum, fetchBoxes, addBox } from '..';
import { Box } from '../types';

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
  const boxes = [
    {
      boxName: 'Capitals of the World',
      totalFlashcards: 50,
      archivedFlashcards: 20,
    },
    {
      boxName: 'Some other box',
      totalFlashcards: 40,
      archivedFlashcards: 0,
    },
    {
      boxName: 'Some other box 2',
      totalFlashcards: 75,
      archivedFlashcards: 50,
    },
  ];
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

test(`
  given some boxes have been fetched
  when a addBox action is dispatched for a box named "the new box"
  then the boxes list should optimistically contain the new box with 1 total flashcards and 0 archived flashcards and an optimistic flag set to true
  and the boxes list should eventually contain the real box returned by the server
`, () => {
  const boxes = [
    {
      boxName: 'Capitals of the World',
      totalFlashcards: 50,
      archivedFlashcards: 20,
    },
    {
      boxName: 'Some other box',
      totalFlashcards: 40,
      archivedFlashcards: 0,
    },
    {
      boxName: 'Some other box 2',
      totalFlashcards: 75,
      archivedFlashcards: 50,
    },
  ];
  const store = createTestStore({
    fetchBoxes: jest.fn().mockResolvedValueOnce(boxes),
  });
  const updates: FlashcardsAppState[] = [];
  store.subscribe(() => updates.push(store.getState()));
  store.dispatch(addBox({ boxName: 'the new box' }));
  expect(getBoxes(store.getState())).toEqual([
    ...boxes,
    {
      boxName: 'the new box',
      totalFlashcards: 1,
      archivedFlashcards: 0,
      optimistic: true,
    },
  ]);
});
