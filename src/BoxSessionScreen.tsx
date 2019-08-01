import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSessionPreview,
  getBoxSessionPreviewRequestStatus,
  BoxSessionPreviewRequestStatusEnum,
} from './core/store/boxes';
import { fetchSessionPreview } from './core/store/boxes/actions';
import { BoxSessionPreview } from './BoxSessionPreview';

type BoxSessionScreenProps = {
  boxName: string;
};

export const BoxSessionScreen: React.FC<BoxSessionScreenProps> = ({ boxName }) => {
  const getSessionPreviewSelector = useMemo(() => getSessionPreview.bind(null, boxName), [boxName]);
  const getBoxSessionPreviewRequestStatusSelector = useMemo(
    () => getBoxSessionPreviewRequestStatus.bind(null, boxName),
    [boxName],
  );
  const sessionPreview = useSelector(getSessionPreviewSelector);
  const sessionPreviewRequestStatus = useSelector(getBoxSessionPreviewRequestStatusSelector).status;
  const sessionPreviewRequestError = useSelector(getBoxSessionPreviewRequestStatusSelector).error;
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionPreviewRequestStatus === BoxSessionPreviewRequestStatusEnum.NEVER_STARTED) {
      dispatch(fetchSessionPreview({ boxName }));
    }
  }, [boxName, dispatch, sessionPreviewRequestStatus]);
  return (
    <>
      {sessionPreviewRequestStatus === BoxSessionPreviewRequestStatusEnum.PENDING ? (
        <p>loading...</p>
      ) : (
        <BoxSessionPreview
          sessionPreviewRequestError={sessionPreviewRequestError}
          sessionPreviewRequestStatus={sessionPreviewRequestStatus}
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
