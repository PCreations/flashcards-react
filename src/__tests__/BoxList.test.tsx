import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { BoxList } from '../BoxList';

describe('BoxList', () => {
  afterEach(cleanup);
  it('should render the call to action to select a box', () => {
    const { getByText } = render(<BoxList boxes={[]} />);
    expect(getByText(/select a box :/i)).toBeInTheDocument();
  });
  it('should render the given boxes', () => {
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
    const { getAllByTestId } = render(<BoxList boxes={boxes} />);
    expect(getAllByTestId('boxName').map(e => e.textContent)).toEqual(boxes.map(b => b.boxName));
    expect(getAllByTestId('boxFlashcardsTotal').map(e => e.textContent)).toEqual(
      boxes.map(b => `${b.totalFlashcards}`),
    );
    expect(getAllByTestId('boxArchivedFlashcards').map(e => e.textContent)).toEqual(
      boxes.filter(b => b.archivedFlashcards > 0).map(b => `${b.archivedFlashcards}`),
    );
  });
});
