export type AuthUser = {
  userId: string;
};

export const AuthenticationGateway = ({ signIn }: { signIn: () => Promise<AuthUser> }) => ({
  signIn,
});

export type AuthenticationGateway = ReturnType<typeof AuthenticationGateway>;
