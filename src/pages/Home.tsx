import { useState } from "react";
import App from "src/App";
import LoginForm from "src/components/LoginForm";
import { IUser } from "src/helpers/interfaces";

const HomePage = () => {
  const [user, setUser] = useState<IUser>();

  return <>{user ? <App /> : <LoginForm setUser={setUser} />}</>;
};

export default HomePage;
