import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/authProvider";

const Login = () => {
  const navigate = useNavigate();
  return (
    <LoginForm
      onComplete={() => {
        navigate("/");
      }}
    />
  );
};

export default Login;
