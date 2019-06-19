import { Record } from 'immutable';

type BoxProps = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export const Box = Record<BoxProps>({
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
});

export type Box = ReturnType<typeof Box>;
