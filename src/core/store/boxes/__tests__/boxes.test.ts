import { createStore, FlashcardsAppState } from '../..';
import { getBoxes, getBoxesRequestStatus, BoxesRequestStatusEnum, fetchBoxes } from '..';

test(`
  given no boxes have been fetched yet
  then the getBoxes selector should return an empty array
  and the getBoxesRequestStatus selector should return NEVER_STARTED
`, () => {
  const store = createStore({ fetchBoxes: jest.fn(), signIn: jest.fn() });
  expect(getBoxes(store.getState())).toEqual([]);
  expect(getBoxesRequestStatus(store.getState())).toEqual({ status: BoxesRequestStatusEnum.NEVER_STARTED });
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
      id: 'box1',
      boxName: 'Capitals of the World',
      totalFlashcards: 50,
      archivedFlashcards: 20,
    },
    {
      id: 'box2',
      boxName: 'Some other box',
      totalFlashcards: 40,
      archivedFlashcards: 0,
    },
    {
      id: 'box3',
      boxName: 'Some other box 2',
      totalFlashcards: 75,
      archivedFlashcards: 50,
    },
  ];
  const updates: FlashcardsAppState[] = [];
  const store = createStore({ fetchBoxes: jest.fn().mockResolvedValueOnce(boxes), signIn: jest.fn() });
  store.subscribe(() => updates.push(store.getState()));
  await store.dispatch(fetchBoxes());
  expect(getBoxesRequestStatus(updates[0])).toEqual({ status: BoxesRequestStatusEnum.PENDING });
  expect(getBoxes(updates[1])).toEqual(boxes);
  expect(getBoxesRequestStatus(updates[1])).toEqual({ status: BoxesRequestStatusEnum.SUCCEEDED });
});

test(`
  given no boxes have been fetched yet
  and the fetchBoxes request eventually throws an error
  when a fetchBoxes action is dispatched
  then the getBoxes selector should return an empty array
  and the boxRequestStatus selector should indicate that something got wrong, with the thrown error's message
`, async () => {
  const someError = new Error('some error');
  const store = createStore({ fetchBoxes: jest.fn().mockRejectedValueOnce(someError), signIn: jest.fn() });
  await store.dispatch(fetchBoxes());
  expect(getBoxes(store.getState())).toEqual([]);
  expect(getBoxesRequestStatus(store.getState())).toEqual({
    status: BoxesRequestStatusEnum.FAILED,
    error: 'some error',
  });
});
