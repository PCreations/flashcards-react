import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSessionPreview,
  shouldSessionPreviewRequestBeStarted,
  isSessionPreviewRequestPending,
  getSessionPreviewRequestError,
} from './core/store/boxes';
import { fetchSessionPreview } from './core/store/boxes/actions';
import { BoxSessionPreview } from './BoxSessionPreview';

type BoxSessionScreenProps = {
  boxName: string;
};

export const BoxSessionScreen: React.FC<BoxSessionScreenProps> = ({ boxName }) => {
  const getSessionPreviewSelector = useMemo(() => getSessionPreview.bind(null, boxName), [boxName]);
  const shouldSessionPreviewRequestBeStartedSelector = useMemo(
    () => shouldSessionPreviewRequestBeStarted.bind(null, boxName),
    [boxName],
  );
  const isSessionPreviewRequestPendingSelector = useMemo(
    () => isSessionPreviewRequestPending.bind(null, boxName),
    [boxName],
  );
  const sessionPreviewRequestErrorSelector = useMemo(
    () => getSessionPreviewRequestError.bind(null, boxName),
    [boxName],
  );
  const shouldSessionPreviewBeStarted = useSelector(shouldSessionPreviewRequestBeStartedSelector);
  const sessionPreview = useSelector(getSessionPreviewSelector);
  const sessionPreviewRequestIsPending = useSelector(isSessionPreviewRequestPendingSelector);
  const sessionPreviewRequestError = useSelector(sessionPreviewRequestErrorSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    if (shouldSessionPreviewBeStarted) {
      dispatch(fetchSessionPreview({ boxName }));
    }
  }, [boxName, dispatch, shouldSessionPreviewBeStarted]);
  return (
    <>
      {sessionPreviewRequestIsPending ? (
        <p>loading...</p>
      ) : (
        <BoxSessionPreview
          isSessionPreviewLoading={sessionPreviewRequestIsPending}
          sessionPreviewRequestError={sessionPreviewRequestError}
          box={{
            totalFlashcards: sessionPreview.totalFlashcards,
            archivedFlashcards: sessionPreview.archivedFlashcards,
            name: sessionPreview.boxName,
          }}
          numberOfFlashcardsToReview={sessionPreview.flashcardsToReview}
        />
      )}
    </>
  );
};
