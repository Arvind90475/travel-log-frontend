import { useQuery } from "@tanstack/react-query";
import { logout } from "../../api/auth";

const useLogout = () => {
  return useQuery({
    queryKey: ["logout"],
    queryFn: logout,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useLogout;
