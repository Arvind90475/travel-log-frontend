import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../api/logEntries";
import { ILogEntry } from "../interfaces";

export const useFetchLogEntries = () =>
  useQuery<ILogEntry[]>({
    queryKey: ["logEntries"],
    queryFn: async () => {
      return getAll<ILogEntry[]>("logs");
    },
    retry: false,
    retryOnMount: false,
  });
