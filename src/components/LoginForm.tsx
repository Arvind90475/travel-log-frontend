import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const LoginForm = () => {
  const { login, isLoggingIn, loginError } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password = formData.get("password") as string;

    login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>
      <div className="mb-4">
        <Link
          to="/register"
          className="link link-primary text-center block text-white"
        >
          Already have an account? Sign Up
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full bg-gray-700 text-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input input-bordered w-full bg-gray-700 text-white"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            disabled={isLoggingIn}
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </div>
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="link link-primary text-white">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
