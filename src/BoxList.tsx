import React from 'react';

type Box = {
  id: string;
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type BoxListProps = {
  boxes: Box[];
  loading: boolean;
};

export const BoxList: React.FC<BoxListProps> = ({ boxes, loading }) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <h1>Select a box :</h1>
      <ol>
        {boxes.map(box => (
          <div key={box.id}>
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
