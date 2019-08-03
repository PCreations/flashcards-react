import { Record } from 'immutable';
import uuid from 'uuid';

export enum RequestStatusEnum {
  NEVER_STARTED,
  STARTED,
  SUCCEEDED,
  FAILED,
}

type RequestStatusProps = {
  status: RequestStatusEnum;
  error?: string;
};

export const RequestStatus = Record<RequestStatusProps>({
  status: RequestStatusEnum.NEVER_STARTED,
  error: undefined,
});

export type RequestStatus = ReturnType<typeof RequestStatus>;

export type RequestId = ReturnType<typeof uuid>;
