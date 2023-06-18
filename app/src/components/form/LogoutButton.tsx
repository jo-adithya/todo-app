import { useContext } from 'react';
import { Button } from "../../shared/ui/forms/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from '../../shared/context/auth-context';

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button className="flex items-center" onClick={logout}>
      <LogoutIcon className="mr-2 text-primary" />
      Logout
    </Button>
  );
};
