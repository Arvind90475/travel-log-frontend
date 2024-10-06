import { IUser } from "../helpers/interfaces";
import http from "./http-common";

export async function login<T>(user: Partial<IUser>): Promise<T | string> {
  const { data } = await http.post("/auth/login", user, {
    withCredentials: true,
  });
  return data;
}

export async function register<T>(user: Partial<IUser>): Promise<T | string> {
  const { data } = await http.post("/auth/signup", user, {
    withCredentials: true,
  });
  return data;
}

export async function logout<T extends string>(): Promise<T> {
  const { data } = await http.post("/auth/logout", {}, {
    withCredentials: true,
  });
  return data;
}