import React, { useState, useContext } from "react";
import { Snackbar } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";
import { BASE_WIDTH } from "../../theme/layout";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "./wrapper/Context";

function Notification(): JSX.Element {
  const { notification, closeNotification } = useContext(Context);

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === "clickaway") {
      return;
    }
    closeNotification();
  };

  return (
    <div>
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={notification.status as Color} onClose={handleClose}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notification;
