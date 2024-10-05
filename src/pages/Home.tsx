import { useState } from "react";
import App from "../App";
import LoginForm from "../components/LoginForm";
import { IUser } from "../helpers/interfaces";

const HomePage = () => {
  const [user, setUser] = useState<IUser>();

  return <>{user ? <App /> : <LoginForm setUser={setUser} />}</>;
};

export default HomePage;
