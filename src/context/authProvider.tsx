import { createContext, PropsWithChildren, useContext } from "react";
import { useFetchLogEntries } from "../helpers/hooks/use_fetch_log_entries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogin } from "../helpers/hooks/use_login";
import { useQueryClient } from "@tanstack/react-query";

interface IAuthContext {
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggingIn: boolean;
  loginError: Error | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { error, isLoading } = useFetchLogEntries();
  const {
    mutate: performLogin,
    isPending: isLoggingIn,
    error: loginError,
  } = useLogin();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const login = (email: string, password: string) => {
    performLogin(
      { email, password },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["logEntries"] });
        },
      }
    );
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !error,
        logout: () => {},
        isLoggingIn,
        loginError,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
