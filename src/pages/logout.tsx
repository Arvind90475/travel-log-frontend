import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { logout as logoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const logout = () => {
  const navigate = useNavigate();

  const { isLoading, isError, refetch, isSuccess } = useQuery({
    queryKey: ["logout"],
    queryFn: logoutApi,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg mb-4">
          Something went wrong. Please try again.
        </p>
        <button className="btn btn-primary" onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
};

export default logout;
