// import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";

// Custom Components
import { AuthProvider } from "./shared/context/auth-context";
import { Todos } from "./pages/Todos";
import { AuthButton } from "./components/form/AuthButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  // if (isLoading) return <div className="w-screen h-screen bg-bg"></div>;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <div className="w-screen h-screen overflow-auto flex flex-col gap-10 bg-bg py-12">
          <div className="flex-auto">
            <Todos />
          </div>
          <div className="flex flex-col items-center mb-10 gap-6">
            <AuthButton />
          </div>
        </div>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
