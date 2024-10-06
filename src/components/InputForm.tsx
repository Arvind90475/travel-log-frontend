import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LatLngExpression } from "leaflet";
import { postOne } from "../api/logEntries";
import { ILogEntry } from "../helpers/interfaces";
import LoadingSpinner from "./LoadingSpinner";

interface LogEntryState {
  title: string;
  description: string;
  visitDate: string;
}

const InputForm = ({
  onClose,
  position,
}: {
  onClose: Function;
  position: LatLngExpression;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["createLogEntry"],
    mutationFn: (logEntry: LogEntryState) => createLogEntry(logEntry),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["logEntries"] });
    },
    retry: false,
  });

  const [logEntry, setLogEntry] = useState<LogEntryState>({
    title: "",
    description: "",
    visitDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(logEntry);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogEntry((prevLogEntry) => {
      return {
        ...prevLogEntry,
        [e.target.name]: e.target.value,
      };
    });
  };

  function createLogEntry(logEntry: LogEntryState) {
    return postOne<ILogEntry>({
      ...logEntry,
      location: {
        type: "Point",
        coordinates: Object.values(position) as [number, number],
      },
    });
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Add a new entry</h1>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              name="title"
              type="text"
              className="input input-bordered w-full bg-gray-700 text-white"
              onChange={handleChange}
              value={logEntry.title}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              name="description"
              type="text"
              className="input input-bordered w-full bg-gray-700 text-white"
              onChange={handleChange}
              value={logEntry.description}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="visitDate"
            >
              Visited Date
            </label>
            <input
              id="visitDate"
              name="visitDate"
              type="date"
              className="input input-bordered w-full bg-gray-700 text-white"
              onChange={handleChange}
              value={logEntry.visitDate}
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InputForm;
