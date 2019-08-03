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

export type FetchedBoxData = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type FetchedSessionPreviewData = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  flashcardsToReview: number;
};

type SessionProps = {
  boxName: string;
  flashcardsToReview: number;
};

export const Session = Record<SessionProps>({
  boxName: '',
  flashcardsToReview: 0,
});

export type Session = {
  boxName: string;
  flashcardsToReview: number;
};

type SessionPreviewProps = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  flashcardsToReview: number;
};

export const SessionPreview = Record<SessionPreviewProps>({
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
  flashcardsToReview: 0,
});

export type SessionPreview = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  flashcardsToReview: number;
};
