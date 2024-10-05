import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField } from "@material-ui/core";
import { IUser } from "../helpers/interfaces";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0",
  },

  flexChildren: {
    margin: "15px 0",
  },
}));

export default function LoginForm({ onComplete }: { onComplete: () => void }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userCredentials),
    });
    const authenticatedUser: IUser = await response.json();
    onComplete();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                name="email"
                className={classes.flexChildren}
                id="outlined-textarea"
                label="Email"
                multiline
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="password"
                className={classes.flexChildren}
                id="outlined-textarea"
                label="Password"
                multiline
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                className={classes.flexChildren}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
