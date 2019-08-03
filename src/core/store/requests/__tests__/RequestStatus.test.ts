import { RequestStatus, RequestStatusEnum } from '..';

describe('RequestStatus', () => {
  it('should have a state initialized at NEVER_STARTED and an empty error property', () => {
    const requestStatus = RequestStatus();
    expect(requestStatus.status).toBe(RequestStatusEnum.NEVER_STARTED);
    expect(requestStatus.error).toBeUndefined();
  });
});
