import { createContext, PropsWithChildren, useContext } from "react";
import { useFetchLogEntries } from "../helpers/hooks/use_fetch_log_entries";
import LoadingSpinner from "../components/LoadingSpinner";

interface IAuthContext {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { error, isLoading } = useFetchLogEntries();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !error,
        login: () => {},
        logout: () => {},
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
