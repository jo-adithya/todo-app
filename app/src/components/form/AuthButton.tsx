import { useStore } from '@store';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

export const AuthButton = () => {
  const { user, isAuthenticated } = useStore((state) => ({
    user: state.user,
    isAuthenticated: !!state.token,
  }));

  if (isAuthenticated)
    return (
      <>
        <LogoutButton />
        <p className="text-dark-primary">
          Logged in as <span className="font-bold">{user}</span>
        </p>
      </>
    );
  return <LoginButton />;
};
