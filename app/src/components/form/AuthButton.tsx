import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export const AuthButton = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

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
