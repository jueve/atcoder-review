import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ipcRenderer } from "electron";
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import {
  UPDATE_PROBLEMS,
  UPDATE_PROBLEMS_SUCCEEDED,
  UPDATE_PROBLEMS_FAILED,
} from "../../main-process/database/fetch/updateProblems";
import {
  UPDATE_PROBLEM_MODELS,
  UPDATE_PROBLEM_MODELS_SUCCEEDED,
  UPDATE_PROBLEM_MODELS_FAILED,
} from "../../main-process/database/fetch/updateProblemModels";
import {
  UPDATE_CONTESTS,
  UPDATE_CONTESTS_SUCCEEDED,
  UPDATE_CONTESTS_FAILED,
} from "../../main-process/database/fetch/updateContests";
import {
  UPDATE_USER_SUBMISSIONS,
  UPDATE_USER_SUBMISSIONS_SUCCEEDED,
  UPDATE_USER_SUBMISSIONS_FAILED,
} from "../../main-process/database/fetch/updateUserSubmission";
import { FetchStatus, NotificationStatus } from "./types";
import { BASE_WIDTH } from "../../theme/layout";
import { Context as HomeContext } from "./Context";
import { UpdateList } from "./UpdateList";
import { Notification } from "./Notification";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: BASE_WIDTH * 8,
    },

    description: {
      margin: theme.spacing(4, 0, 0, 0),
    },

    content: {
      margin: theme.spacing(2, 0, 0, 0),
    },

    actions: {
      margin: theme.spacing(2, 0, 0, 0),
    },

    button: {
      width: theme.spacing(14.2),
    },
  })
);

const text =
  "Get contests, problems and submissions information using API of AtCoder Problems, then store them in local database.";

export function Entry(): JSX.Element {
  const classes = useStyles();
  const [contests, setContests] = useState<FetchStatus>({
    lastUpdate: "",
    progress: "STANDS_BY",
  });
  const [problems, setProblems] = useState<FetchStatus>({
    lastUpdate: "",
    progress: "STANDS_BY",
  });
  const [problemModels, setProblemModels] = useState<FetchStatus>({
    lastUpdate: "",
    progress: "STANDS_BY",
  });
  const [userSubmissions, setUserSubmissions] = useState<FetchStatus>({
    lastUpdate: "",
    progress: "STANDS_BY",
  });
  const [notification, setNotification] = useState<NotificationStatus>({
    open: false,
    status: "success",
    message: "",
  });

  const updateContests = useCallback(() => {
    setContests({ ...contests, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_CONTESTS);
  }, [setContests, contests]);

  const updateProblems = useCallback(() => {
    setProblems({ ...problems, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_PROBLEMS);
  }, [problems, setProblems]);

  const updateProblemModels = useCallback(() => {
    setProblemModels({ ...problemModels, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
  }, [setProblemModels, problemModels]);

  const updateUserSubmissions = useCallback(() => {
    setUserSubmissions({ ...userSubmissions, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
  }, [setUserSubmissions, userSubmissions]);

  const updateAll = useCallback(() => {
    setContests({ ...contests, progress: "UPDATING" });
    setProblems({ ...problems, progress: "UPDATING" });
    setProblemModels({ ...problemModels, progress: "UPDATING" });
    setUserSubmissions({ ...userSubmissions, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_CONTESTS);
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    ipcRenderer.send(UPDATE_PROBLEMS);
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
  }, [
    contests,
    problems,
    problemModels,
    userSubmissions,
    setContests,
    setProblems,
    setProblemModels,
    setUserSubmissions,
  ]);

  const anyButtonPressed = useMemo(() => {
    return (
      contests.progress === "UPDATING" ||
      problems.progress === "UPDATING" ||
      problemModels.progress === "UPDATING" ||
      userSubmissions.progress === "UPDATING"
    );
  }, [contests, problems, problemModels, userSubmissions]);

  const closetNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [setNotification, notification]);

  useEffect(() => {
    let mounted = true;
    ipcRenderer.on(UPDATE_CONTESTS_SUCCEEDED, (_event) => {
      if (mounted) {
        setContests({ ...contests, progress: "SUCCEEDED" });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update contests.",
        });
      }
    });

    ipcRenderer.on(UPDATE_CONTESTS_FAILED, (_event) => {
      if (mounted) {
        setContests({ ...contests, progress: "FAILED" });
        setNotification({
          open: true,
          status: "error",
          message: "Failed to update contests.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEMS_SUCCEEDED, (_event) => {
      if (mounted) {
        setProblems({ ...problems, progress: "SUCCEEDED" });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update problems.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEMS_FAILED, (_event) => {
      if (mounted) {
        setProblems({ ...problems, progress: "FAILED" });
        setNotification({
          open: true,
          status: "error",
          message: "Failed to update problems.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEM_MODELS_SUCCEEDED, (_event) => {
      if (mounted) {
        setProblemModels({ ...problemModels, progress: "SUCCEEDED" });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update problem models.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEM_MODELS_FAILED, (_event) => {
      if (mounted) {
        setProblemModels({ ...problemModels, progress: "FAILED" });
        setNotification({
          open: true,
          status: "error",
          message: "Failed to update problem models.",
        });
      }
    });

    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_SUCCEEDED, (_event) => {
      if (mounted) {
        setUserSubmissions({ ...userSubmissions, progress: "SUCCEEDED" });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update user submission.",
        });
      }
    });

    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_FAILED, (_event) => {
      if (mounted) {
        setUserSubmissions({ ...userSubmissions, progress: "FAILED" });
        setNotification({
          open: true,
          status: "error",
          message: "Failed to update user submission.",
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, [contests, problems, problemModels, userSubmissions]);

  return (
    <HomeContext.Provider
      value={{
        contests: contests,
        problems: problems,
        problemModels: problemModels,
        userSubmissions: userSubmissions,
        updateContests: updateContests,
        updateProblems: updateProblems,
        updateProblemModels: updateProblemModels,
        updateUserSubmissions: updateUserSubmissions,
        notification: notification,
        closeNotification: closetNotification,
      }}
    >
      <div className={classes.root}>
        <Notification />
        <div>
          <Typography variant="h3" gutterBottom>
            AtCoder Review
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography variant="h6" gutterBottom>
            Update information?
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {text}
          </Typography>
        </div>

        <div className={classes.content}></div>

        <div className={classes.content}>
          <UpdateList />
        </div>

        <div className={classes.actions}>
          <Grid container justify="space-between">
            <Grid item xs={1} />
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={updateAll}
                disabled={anyButtonPressed}
                className={classes.button}
              >
                UPDATE ALL
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </HomeContext.Provider>
  );
}
