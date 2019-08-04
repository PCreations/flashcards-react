import React from 'react';
import { AddBoxButton } from './AddBoxButton';
import { buildUrl, RoutePath } from './router/state';
import { Link } from './router';

type Box = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type BoxListProps = {
  boxes: Box[];
  isBoxesRequestPending?: boolean;
  boxesRequestError?: string;
  addBoxRequestError?: string;
};

const BoxRequestError: React.FC<{ error?: string; role: string }> = ({ error, role }) => (
  <div role={role}>{error}</div>
);

export const BoxList: React.FC<BoxListProps> = ({
  boxes,
  isBoxesRequestPending = false,
  boxesRequestError,
  addBoxRequestError,
}) =>
  isBoxesRequestPending ? (
    <div>loading...</div>
  ) : (
    <div>
      {boxesRequestError && <BoxRequestError role="boxesRequestError" error={boxesRequestError} />}
      {addBoxRequestError && <BoxRequestError role="addBoxError" error={addBoxRequestError} />}
      <h1>Select a box :</h1>
      <ol>
        {boxes.map(box => (
          <div key={box.boxName}>
            <Link
              title="Box session preview"
              to={buildUrl(RoutePath.SESSION_PREVIEW, { boxName: box.boxName }) || ''}
            >
              {box.boxName}
            </Link>
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
