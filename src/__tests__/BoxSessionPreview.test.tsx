import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import { createRender } from './createRender';
import { BoxSessionPreview } from '../BoxSessionPreview';
import { BoxeSessionPreviewRequestStatusEnum } from '../core/store/boxes';

describe('BoxSessionPreview', () => {
  afterEach(cleanup);
  it('should inform that the session preview is loading if session preview request is pending', () => {
    const render = createRender({});
    const { getByText } = render(
      <BoxSessionPreview
        sessionPreviewRequestStatus={BoxeSessionPreviewRequestStatusEnum.PENDING}
        box={{ name: 'the box', totalFlashcards: 50, archivedFlashcards: 20 }}
        numberOfFlashcardsToReview={7}
      />,
    );
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it('should inform that the session preview is loading if session preview request is not yet started', () => {
    const render = createRender({});
    const { getByText } = render(
      <BoxSessionPreview
        sessionPreviewRequestStatus={BoxeSessionPreviewRequestStatusEnum.NEVER_STARTED}
        box={{ name: 'the box', totalFlashcards: 50, archivedFlashcards: 20 }}
        numberOfFlashcardsToReview={7}
      />,
    );
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it(`
  if the session preview request has succeed, it should render:
    - the box name
    - the total number of flashcards in this box
    - the number of archived flashcards in this box
    - the number of flashcards to review for this session
    - a button "start the session"
    - a button "add a new flashcard"
  `, () => {
    const render = createRender({});
    const { getByText } = render(
      <BoxSessionPreview
        sessionPreviewRequestStatus={BoxeSessionPreviewRequestStatusEnum.SUCCEEDED}
        box={{ name: 'the box', totalFlashcards: 50, archivedFlashcards: 20 }}
        numberOfFlashcardsToReview={7}
      />,
    );
    expect(getByText(/the box/i)).toBeInTheDocument();
    expect(getByText(/50 flashcards/i)).toBeInTheDocument();
    expect(getByText(/20 archived/i)).toBeInTheDocument();
    expect(getByText(/7 flashcards to review today/i)).toBeInTheDocument();
    expect(getByText(/start the session/i)).toBeInTheDocument();
    expect(getByText(/add a new flashcard in this box/i)).toBeInTheDocument();
  });
  it('should render an error if the session preview request has failed', () => {
    const render = createRender({});
    const expectedError = 'some error message';
    const { getByRole } = render(
      <BoxSessionPreview
        sessionPreviewRequestStatus={BoxeSessionPreviewRequestStatusEnum.FAILED}
        sessionPreviewRequestError={expectedError}
        box={{ name: 'the box', totalFlashcards: 50, archivedFlashcards: 20 }}
        numberOfFlashcardsToReview={7}
      />,
    );
    expect(getByRole('sessionPreviewError')).toHaveTextContent(expectedError);
  });
});
