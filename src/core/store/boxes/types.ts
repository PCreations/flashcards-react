import { Record } from 'immutable';

type BoxProps = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  optimistic?: boolean;
};

export const Box = Record<BoxProps>({
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
  optimistic: false,
});

export type Box = ReturnType<typeof Box>;
