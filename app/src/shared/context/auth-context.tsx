import { ReactNode, createContext, useEffect, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

interface AuthContextProps {
  isAuthenticated: boolean;
  token: null | string;
  user: string;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
  user: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState('');

  const { signIn } = useGoogleLogin({
    clientId: import.meta.env.VITE_CLIENT_ID!,
    onSuccess: (response) => {
      if ('accessToken' in response) setToken(response.accessToken);
      if ('profileObj' in response) setUser(response.profileObj.name);
    },
    onFailure: (error) => console.log('Login Failed:', error),
  });

  const { signOut } = useGoogleLogout({
    clientId: import.meta.env.VITE_CLIENT_ID!,
    onLogoutSuccess: () => {
      setToken(null);
      setUser('');
    },
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks',
        prompt: true,
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token: token,
        user: user,
        login: () => signIn(),
        logout: () => signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
