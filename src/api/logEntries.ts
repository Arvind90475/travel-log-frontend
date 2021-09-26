import { ILogEntry } from "src/helpers/interfaces";
import http from "./http-common";

export async function getAll<T>(endPoint: string): Promise<T> {
  const { data } = await http.get(`/${endPoint}`, { withCredentials: true });
  return data;
}

export async function postOne<T>(
  logEntry: Partial<ILogEntry>
): Promise<T | string> {
  const { data } = await http.post("/logs", logEntry, {
    withCredentials: true,
  });
  return data;
}
