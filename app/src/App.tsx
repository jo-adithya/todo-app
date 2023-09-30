import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Custom Components
import { AuthProvider } from './shared/context/auth-context';
import { Todos } from './pages/Todos';
import { AuthButton } from './components/form/AuthButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="w-screen h-screen overflow-auto flex flex-col gap-10 bg-bg py-12">
          <div className="flex-auto">
            <Todos />
          </div>
          <div className="flex flex-col items-center mb-10 gap-6">
            <AuthButton />
          </div>
        </div>
      ),
    },
    {
      path: '/testing',
      element: <h1 className="">Testing</h1>,
    },
  ]);

  // if (isLoading) return <div className="w-screen h-screen bg-bg"></div>;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        {/* <AuthProvider> */}
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
