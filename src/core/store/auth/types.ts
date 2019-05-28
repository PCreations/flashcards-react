const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

interface Visitor {
  status: typeof NOT_AUTHENTICATED;
}

export interface AuthUser {
  status: typeof AUTHENTICATED;
  userId: string;
}

type MaybeAuthUser = Visitor | AuthUser;

export interface AuthState {
  currentUser: MaybeAuthUser;
}

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

interface UserAuthenticatedEvent {
  type: typeof USER_AUTHENTICATED;
  payload: AuthUser;
}

interface AuthenticateUserCommand {
  type: typeof AUTHENTICATE_USER;
}

export type AuthEventTypes = UserAuthenticatedEvent;
export type AuthCommandTypes = AuthenticateUserCommand;
