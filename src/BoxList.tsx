import React from 'react';
import { BoxesRequestStatusEnum } from './core/store/boxes';
import { AddBoxButton } from './AddBoxButton';

type Box = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type BoxListProps = {
  boxes: Box[];
  boxesRequestStatus: BoxesRequestStatusEnum;
  boxesRequestError?: string;
  addBoxRequestError?: string;
};

export const BoxList: React.FC<BoxListProps> = ({
  boxes,
  boxesRequestStatus,
  boxesRequestError,
  addBoxRequestError,
}) =>
  boxesRequestStatus === BoxesRequestStatusEnum.PENDING ? (
    <div>loading...</div>
  ) : (
    <div>
      {boxesRequestStatus === BoxesRequestStatusEnum.FAILED && <div>{boxesRequestError}</div>}
      {addBoxRequestError && <div role="addBoxError">{addBoxRequestError}</div>}
      <h1>Select a box :</h1>
      <ol>
        {boxes.map(box => (
          <div key={box.boxName}>
            <span data-testid="boxName">{box.boxName}</span>
            <span data-testid="boxFlashcardsTotal">{box.totalFlashcards}</span>
            {box.archivedFlashcards > 0 && (
              <span data-testid="boxArchivedFlashcards">{box.archivedFlashcards}</span>
            )}
          </div>
        ))}
      </ol>
      <AddBoxButton />
    </div>
  );
