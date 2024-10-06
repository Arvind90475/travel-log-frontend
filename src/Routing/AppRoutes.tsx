import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../context/authProvider";
import Home from "../pages/home";
import Logout from "../pages/logout";
import Register from "../pages/register";
import Login from "../pages/login";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/logout"
          element={
            isAuthenticated ? <Logout /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
