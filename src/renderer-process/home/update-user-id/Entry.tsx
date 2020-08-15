import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ipcRenderer } from "electron";
import {
  GET_USER_ID_SUCCEEDED,
  GET_USER_ID_FAILED,
} from "../../../main-process/config/user-id/getUserId";
import {
  UPDATE_USER_ID,
  UPDATE_USER_ID_SUCCEEDED,
  UPDATE_USER_ID_FAILED,
} from "../../../main-process/config/user-id/updateUserId";
import { BASE_WIDTH } from "../../../theme/layout";
import { UserId } from "./types";
import { Context as UpdateUserIdContext } from "./Context";
import { UserIdInput } from "./UserIdInput";
import { Actions } from "./Actions";
import { NotificationWithMessage } from "../wrapper/types";
import { Notification } from "./Notification";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: BASE_WIDTH * 6,
    },

    content: {
      margin: theme.spacing(4, 0, 0, 0),
    },

    actions: {
      margin: theme.spacing(2, 0, 0, 0),
    },
  })
);

/**
 *
 */
export function Entry(): JSX.Element {
  const classes = useStyles();
  const [userId, setUserId] = useState<UserId>(null);
  const [notification, setNotification] = useState<NotificationWithMessage>({
    open: false,
    status: "info",
    message: "",
  });

  const inputUserId = useCallback(
    (input: UserId) => {
      setUserId(input);
    },
    [setUserId]
  );

  const updateUserId = useCallback(() => {
    ipcRenderer.send(UPDATE_USER_ID, userId);
  }, [userId]);

  const closeNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [setNotification, notification]);

  useEffect(() => {
    let mounted = true;
    ipcRenderer.on(GET_USER_ID_SUCCEEDED, (_event, id) => {
      if (mounted) {
        setUserId(id);
      }
    });
    ipcRenderer.on(GET_USER_ID_FAILED, (_event, id) => {
      if (mounted) {
        setUserId(id);
      }
    });
    ipcRenderer.on(UPDATE_USER_ID_SUCCEEDED, (_event) => {
      if (mounted) {
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to change user id.",
        });
      }
    });

    ipcRenderer.on(UPDATE_USER_ID_FAILED, (_event) => {
      if (mounted) {
        setNotification({
          open: true,
          status: "error",
          message: "Failed to change user id.",
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <UpdateUserIdContext.Provider
      value={{
        userId: userId,
        inputUserId: inputUserId,
        updateUserId: updateUserId,
        notification: notification,
        closeNotification: closeNotification,
      }}
    >
      <div className={classes.root}>
        <div>
          <Typography variant="h6" gutterBottom>
            Update user id
          </Typography>
          <Typography variant="body1">Update user id of AtCoder.</Typography>
          <Typography variant="body1">
            You use this when you get submissions from the API of AtCoder
            Problems.
          </Typography>
        </div>
        <div className={classes.content}>
          <UserIdInput />
        </div>
        <div className={classes.actions}>
          <Actions />
        </div>
        <Notification />
      </div>
    </UpdateUserIdContext.Provider>
  );
}
