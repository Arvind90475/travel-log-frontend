import { useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { LatLngExpression } from "leaflet";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import LoadingSpinner from "./LoadingSpinner";
import { uiStore } from "src/store";
import { postOne } from "src/api/logEntries";
import { ILogEntry } from "src/helpers/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      maxHeight: "500px",
      height: "380px",
    },
    root: {
      height: "fit-content",
      "& > *": {
        margin: theme.spacing(2),
      },
    },
  })
);

const InputForm = ({
  onClose,
  position,
}: {
  onClose: Function;
  position: LatLngExpression;
}) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createLogEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries("logs");
    },
  });

  const [logEntry, setLogEntry] = useState<{
    title: string;
    description: string;
    visitDate: string;
  }>({
    title: "",
    description: "",
    visitDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uiStore.toggleLoading();
    mutate();
    uiStore.toggleLoading();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogEntry({
      ...logEntry,
      [e.target.name]: e.target.value,
    });
  };

  async function createLogEntry() {
    const newLog: Partial<ILogEntry> = {
      ...logEntry,
      location: {
        type: "Point",
        coordinates: Object.values(position) as [number],
      },
    };

    await postOne<ILogEntry>(newLog);
    onClose();
  }
  return (
    <div className={classes.wrap}>
      {uiStore.isLoading ? (
        <LoadingSpinner />
      ) : (
        <form className={classes.root} onSubmit={handleSubmit}>
          <h1>Add a new entry</h1>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            onChange={handleChange}
            value={logEntry.title}
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            onChange={handleChange}
            value={logEntry.description}
          />
          <TextField
            id="visitDate"
            name="visitDate"
            label="Visited Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            value={logEntry.visitDate}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden />
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default observer(InputForm);
