import { useQuery } from "react-query";
import { getAll } from "../../api/logEntries";
import { ILogEntry } from "../interfaces";

export const useFetchLogEntries = () =>
  useQuery<ILogEntry[]>("logEntries", async () => {
    const entries = await getAll<ILogEntry[]>("logs");
    return entries;
  });
