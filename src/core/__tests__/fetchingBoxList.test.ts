import { createStore } from '../store';

test(`
  given the boxes for the current player haven't been fetched yet
  when a fetchBoxes command is issued
  then the boxes should be loading
  then the boxes should eventually be stored in the store
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
  const fetchBoxes = jest.fn().mockResolvedValueOnce(boxes);
  const store = createStore({ fetchBoxes });
  store.subscribe(() => {});
});
