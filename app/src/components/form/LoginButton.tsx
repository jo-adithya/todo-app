import { useContext } from "react";
import { Button } from "../../shared/ui/forms/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../../shared/context/auth-context";

export const LoginButton = () => {
  const { login } = useContext(AuthContext);

  return (
    <Button className="flex items-center" onClick={login}>
      <GoogleIcon className="mr-2 text-primary" /> Sign in with Google
    </Button>
  );
};
