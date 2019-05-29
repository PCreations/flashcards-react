import React from 'react';

type Box = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

type BoxListProps = {
  boxes: Box[];
};

export const BoxList: React.FC<BoxListProps> = ({ boxes }) => (
  <div>
    <h1>Select a box :</h1>
    <ol>
      {boxes.map(box => (
        <div>
          <span data-testid="boxName">{box.boxName}</span>
          <span data-testid="boxFlashcardsTotal">{box.totalFlashcards}</span>
          {box.archivedFlashcards > 0 && (
            <span data-testid="boxArchivedFlashcards">{box.archivedFlashcards}</span>
          )}
        </div>
      ))}
    </ol>
  </div>
);
