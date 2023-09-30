import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useStore } from '@store';

export const useUser = () => {
  const { setToken, setUser, clearUserData } = useStore((state) => ({
    setToken: state.setToken,
    setUser: state.setUser,
    clearUserData: state.logout,
  }));

  const signIn = useGoogleLogin({
    scope: 'profile email https://www.googleapis.com/auth/tasks',
    prompt: 'consent',
    // auto_select: true,
    onSuccess: (response) => {
      console.log(response);
      setToken(response.access_token);
    },
    onError: (error) => console.log('Login Failed:', error),
    onNonOAuthError: (error) =>
      console.log('Login Failed due to NonOAuth', error),
  });

  const signOut = () => {
    clearUserData();
    googleLogout();
  }

  return { signIn, signOut };
};
