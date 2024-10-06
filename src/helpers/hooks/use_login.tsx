import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { IUser } from "../interfaces";

export const useLogin = () => {
  return useMutation<string, Error, IUser>({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
