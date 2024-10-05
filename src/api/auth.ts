import { IUser } from "../helpers/interfaces";
import http from "./http-common";

export async function login<T>(user: Partial<IUser>): Promise<T | string> {
  const { data } = await http.post("/auth/login", user, {
    withCredentials: true,
  });
  return data;
}
