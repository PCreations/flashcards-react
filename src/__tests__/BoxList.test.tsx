import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { BoxList } from '../BoxList';

describe('BoxList', () => {
  afterEach(cleanup);
  it('should render the call to action to select a box if not loading', () => {
    const { getByText } = render(<BoxList boxes={[]} loading={false} />);
    expect(getByText(/select a box :/i)).toBeInTheDocument();
  });
  it('should inform that the boxes are loading if loading is true', () => {
    const { getByText } = render(<BoxList boxes={[]} loading={true} />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it('should render the given boxes', () => {
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
    const { getAllByTestId } = render(<BoxList boxes={boxes} loading={false} />);
    expect(getAllByTestId('boxName').map(e => e.textContent)).toEqual(boxes.map(b => b.boxName));
    expect(getAllByTestId('boxFlashcardsTotal').map(e => e.textContent)).toEqual(
      boxes.map(b => `${b.totalFlashcards}`),
    );
    expect(getAllByTestId('boxArchivedFlashcards').map(e => e.textContent)).toEqual(
      boxes.filter(b => b.archivedFlashcards > 0).map(b => `${b.archivedFlashcards}`),
    );
  });
});
