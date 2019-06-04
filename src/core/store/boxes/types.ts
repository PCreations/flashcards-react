import { Record } from 'immutable';

type BoxProps = {
  id: string;
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export const Box = Record<BoxProps>({
  id: '',
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
});

export type Box = ReturnType<typeof Box>;
