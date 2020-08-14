import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FetchStatus, NotificationStatus } from "./types";
import { ipcRenderer } from "electron";
import {
  UPDATE_CONTESTS,
  UPDATE_CONTESTS_FAILED,
  UPDATE_CONTESTS_SUCCEEDED,
} from "../../../main-process/database/fetch/updateContests";
import {
  UPDATE_PROBLEMS,
  UPDATE_PROBLEMS_FAILED,
  UPDATE_PROBLEMS_SUCCEEDED,
} from "../../../main-process/database/fetch/updateProblems";
import {
  UPDATE_PROBLEM_MODELS,
  UPDATE_PROBLEM_MODELS_FAILED,
  UPDATE_PROBLEM_MODELS_SUCCEEDED,
} from "../../../main-process/database/fetch/updateProblemModels";
import {
  UPDATE_USER_SUBMISSIONS,
  UPDATE_USER_SUBMISSIONS_FAILED,
  UPDATE_USER_SUBMISSIONS_SUCCEEDED,
} from "../../../main-process/database/fetch/updateUserSubmission";
import { Context as UpdateDatabaseContext } from "./Context";
import { UpdateList } from "./UpdateList";
import { Actions } from "./Actions";
import { Notification } from "./Notification";
import { BASE_WIDTH } from "../../../theme/layout";
import {
  GET_LOG_SUCCEEDED,
  GET_LOG_FAILED,
} from "../../../main-process/log/update-database/getLog";
import {
  UPDATE_LOG,
  UPDATE_LOG_SUCCEEDED,
  UPDATE_LOG_FAILED,
} from "../../../main-process/log/update-database/updateLog";
import { UpdateDatabaseLog } from "../../../main-process/log/types";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: BASE_WIDTH * 8,
    },

    content: {
      margin: theme.spacing(2, 0, 0, 0),
    },

    actions: {
      margin: theme.spacing(2, 0, 0, 0),
    },
  })
);

const getCurrentEpochSecond = (): number => moment().unix();

export function Entry(): JSX.Element {
  const classes = useStyles();
  const [contests, setContests] = useState<FetchStatus>({
    lastUpdate: 0,
    progress: "STANDS_BY",
  });
  const [problems, setProblems] = useState<FetchStatus>({
    lastUpdate: 0,
    progress: "STANDS_BY",
  });
  const [problemModels, setProblemModels] = useState<FetchStatus>({
    lastUpdate: 0,
    progress: "STANDS_BY",
  });
  const [userSubmissions, setUserSubmissions] = useState<FetchStatus>({
    lastUpdate: 0,
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
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update contests...",
    });
  }, [setContests, contests, setNotification]);

  const updateProblems = useCallback(() => {
    setProblems({ ...problems, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_PROBLEMS);
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update problems...",
    });
  }, [problems, setProblems, setNotification]);

  const updateProblemModels = useCallback(() => {
    setProblemModels({ ...problemModels, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update problem models...",
    });
  }, [setProblemModels, problemModels, setNotification]);

  const updateUserSubmissions = useCallback(() => {
    setUserSubmissions({ ...userSubmissions, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update user submissions...",
    });
  }, [setUserSubmissions, userSubmissions, setNotification]);

  const updateAll = useCallback(() => {
    setContests({ ...contests, progress: "UPDATING" });
    setProblems({ ...problems, progress: "UPDATING" });
    setProblemModels({ ...problemModels, progress: "UPDATING" });
    setUserSubmissions({ ...userSubmissions, progress: "UPDATING" });
    ipcRenderer.send(UPDATE_CONTESTS);
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    ipcRenderer.send(UPDATE_PROBLEMS);
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update the local database...",
    });
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

  const getLastUpdate = useMemo(() => {
    return {
      contests: contests.lastUpdate,
      problems: problems.lastUpdate,
      problemModels: problemModels.lastUpdate,
      userSubmissions: userSubmissions.lastUpdate,
    };
  }, [contests, problems, problemModels, userSubmissions]);

  const closetNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [setNotification, notification]);

  useEffect(() => {
    let mounted = true;
    ipcRenderer.on(GET_LOG_SUCCEEDED, (_event, fetchLog: UpdateDatabaseLog) => {
      if (mounted) {
        setContests({ ...contests, lastUpdate: fetchLog.contests });
        setProblems({ ...problems, lastUpdate: fetchLog.problems });
        setProblemModels({ ...problemModels, lastUpdate: fetchLog.problems });
        setUserSubmissions({
          ...userSubmissions,
          lastUpdate: fetchLog.userSubmissions,
        });
      }
    });

    ipcRenderer.on(GET_LOG_FAILED, (_event, fetchLog: UpdateDatabaseLog) => {
      if (mounted) {
        setContests({ ...contests, lastUpdate: fetchLog.contests });
        setProblems({ ...problems, lastUpdate: fetchLog.problems });
        setProblemModels({ ...problemModels, lastUpdate: fetchLog.problems });
        setUserSubmissions({
          ...userSubmissions,
          lastUpdate: fetchLog.userSubmissions,
        });
      }
    });

    ipcRenderer.on(UPDATE_CONTESTS_SUCCEEDED, (_event) => {
      if (mounted) {
        const current = getCurrentEpochSecond();
        ipcRenderer.send(UPDATE_LOG, {
          ...getLastUpdate,
          contests: current,
        });
        setContests({ lastUpdate: current, progress: "SUCCEEDED" });
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
        const current = getCurrentEpochSecond();
        ipcRenderer.send(UPDATE_LOG, {
          ...getLastUpdate,
          problems: current,
        });
        setProblems({ lastUpdate: current, progress: "SUCCEEDED" });
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
        const current = getCurrentEpochSecond();
        ipcRenderer.send(UPDATE_LOG, {
          ...getLastUpdate,
          problemModels: current,
        });
        setProblemModels({ lastUpdate: current, progress: "SUCCEEDED" });
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
        const current = getCurrentEpochSecond();
        ipcRenderer.send(UPDATE_LOG, {
          ...getLastUpdate,
          userSubmissions: current,
        });
        setUserSubmissions({ lastUpdate: current, progress: "SUCCEEDED" });
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
  }, [contests, problems, problemModels, userSubmissions, getLastUpdate]);

  return (
    <UpdateDatabaseContext.Provider
      value={{
        contests: contests,
        problems: problems,
        problemModels: problemModels,
        userSubmissions: userSubmissions,
        updateContests: updateContests,
        updateProblems: updateProblems,
        updateProblemModels: updateProblemModels,
        updateUserSubmissions: updateUserSubmissions,
        updateAll: updateAll,
        notification: notification,
        closeNotification: closetNotification,
      }}
    >
      <div className={classes.root}>
        <div>
          <Typography variant="h6" gutterBottom>
            Update database
          </Typography>
          <Typography variant="body1">
            Sometimes, you will need this manipulation to keep the local
            database updated.
          </Typography>
          <Typography variant="body1">
            You get contests, problems and submissions information using API of
            AtCoder Problems, then store them in local database. It may takes a
            few minutes.
          </Typography>
        </div>

        <div className={classes.content}>
          <UpdateList />
        </div>

        <div className={classes.actions}>
          <Actions />
        </div>
        <Notification />
      </div>
    </UpdateDatabaseContext.Provider>
  );
}
