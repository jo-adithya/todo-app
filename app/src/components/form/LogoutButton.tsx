import { useUser } from '@shared/hooks/useUser';
import { Button } from '../../shared/ui/forms/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutButton = () => {
  const { signOut } = useUser();

  return (
    <Button className="flex items-center" onClick={signOut}>
      <LogoutIcon className="mr-2 text-primary" />
      Logout
    </Button>
  );
};
