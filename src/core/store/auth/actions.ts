import { FlashcardsThunkAction } from '..';

export enum AuthActionTypes {
  USER_AUTHENTICATED = '[auth] - the user has been authenticated',
}

export const userAuthenticated = ({ userId }: { userId: string }) => ({
  type: AuthActionTypes.USER_AUTHENTICATED as AuthActionTypes.USER_AUTHENTICATED,
  payload: { userId },
});

export const authenticateUser = (): FlashcardsThunkAction => async (dispatch, _, deps) => {
  const { userId } = await deps.signIn();
  dispatch(userAuthenticated({ userId }));
};
