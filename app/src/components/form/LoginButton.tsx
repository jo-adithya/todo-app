import { useStore } from '@store';
import { useUser } from '@shared/hooks/useUser';
import { Button } from "../../shared/ui/forms/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useTodo } from '@shared/hooks/useTodos';

export const LoginButton = () => {
  const { signIn } = useUser();
  const { fetchTasklistId } = useTodo();

  useStore.subscribe((state) => state.token, (token) => {
    console.log(token)
    if (!token) return;
    fetchTasklistId()
  })

  return (
    <Button className="flex items-center" onClick={signIn}>
      <GoogleIcon className="mr-2 text-primary" /> Sign in with Google
    </Button>
  );
};
