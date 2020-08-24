import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useReducer,
} from "react";
import { DatabaseUpdate } from "./types";
import { NotificationWithMessage } from "../types";
import { ipcRenderer } from "electron";
import {
  UPDATE_CONTESTS,
  UPDATE_CONTESTS_FAILED,
  UPDATE_CONTESTS_SUCCEEDED,
} from "../../../main/database/fetch/updateContests";
import {
  UPDATE_PROBLEMS,
  UPDATE_PROBLEMS_FAILED,
  UPDATE_PROBLEMS_SUCCEEDED,
} from "../../../main/database/fetch/updateProblems";
import {
  UPDATE_PROBLEM_MODELS,
  UPDATE_PROBLEM_MODELS_FAILED,
  UPDATE_PROBLEM_MODELS_SUCCEEDED,
} from "../../../main/database/fetch/updateProblemModels";
import {
  UPDATE_USER_SUBMISSIONS,
  UPDATE_USER_SUBMISSIONS_FAILED,
  UPDATE_USER_SUBMISSIONS_SUCCEEDED,
} from "../../../main/database/fetch/updateUserSubmission";
import {
  GET_LOG_SUCCEEDED,
  GET_LOG_FAILED,
} from "../../../main/log/database-update/getLog";
import {
  UPDATE_LOG,
  UPDATE_LOG_FAILED,
} from "../../../main/log/database-update/updateLog";
import { Context as DatabaseUpdateContext } from "./Context";
import { UpdateList } from "./UpdateList";
import { Actions } from "./Actions";
import { Notification } from "./Notification";
import { BASE_WIDTH } from "../../../theme/layout";
import { DatabaseUpdateLog } from "../../../main/log/types";
import moment from "moment";
import { reducer } from "./reducer";

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

const init: DatabaseUpdate = {
  contests: { lastUpdate: null, progress: "STANDS_BY" },
  problems: { lastUpdate: null, progress: "STANDS_BY" },
  problemModels: { lastUpdate: null, progress: "STANDS_BY" },
  userSubmissions: { lastUpdate: null, progress: "STANDS_BY" },
};

/**
 *
 */
export function Entry(): JSX.Element {
  const classes = useStyles();
  const [databaseUpdate, dispatchToDatabaseUpdate] = useReducer(reducer, init);
  const [notification, setNotification] = useState<NotificationWithMessage>({
    open: false,
    status: "success",
    message: "",
  });

  const updateContests = useCallback(() => {
    ipcRenderer.send(UPDATE_CONTESTS);
    dispatchToDatabaseUpdate({
      destination: "CONTESTS",
      progress: "UPDATING",
      lastUpdate: databaseUpdate.contests.lastUpdate,
    });
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update contests...",
    });
  }, [dispatchToDatabaseUpdate, databaseUpdate, setNotification]);

  const updateProblems = useCallback(() => {
    ipcRenderer.send(UPDATE_PROBLEMS);
    dispatchToDatabaseUpdate({
      destination: "PROBLEMS",
      progress: "UPDATING",
      lastUpdate: databaseUpdate.problems.lastUpdate,
    });
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update problems...",
    });
  }, [dispatchToDatabaseUpdate, databaseUpdate, setNotification]);

  const updateProblemModels = useCallback(() => {
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    dispatchToDatabaseUpdate({
      destination: "PROBLEM_MODELS",
      progress: "UPDATING",
      lastUpdate: databaseUpdate.problemModels.lastUpdate,
    });
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update problem models...",
    });
  }, [dispatchToDatabaseUpdate, databaseUpdate, setNotification]);

  const updateUserSubmissions = useCallback(() => {
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
    dispatchToDatabaseUpdate({
      destination: "USER_SUBMISSIONS",
      progress: "UPDATING",
      lastUpdate: databaseUpdate.userSubmissions.lastUpdate,
    });
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update user submissions...",
    });
  }, [dispatchToDatabaseUpdate, databaseUpdate, setNotification]);

  const updateAll = useCallback(() => {
    dispatchToDatabaseUpdate({
      destination: "ALL",
      progress: "UPDATING",
      lastUpdate: getCurrentEpochSecond(),
    });
    ipcRenderer.send(UPDATE_CONTESTS);
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    ipcRenderer.send(UPDATE_PROBLEMS);
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
    setNotification({
      open: true,
      status: "info",
      message: "Trying to update the local database...",
    });
  }, [dispatchToDatabaseUpdate]);

  const getLastUpdate = useMemo(() => {
    return {
      contests: databaseUpdate.contests.lastUpdate,
      problems: databaseUpdate.problems.lastUpdate,
      problemModels: databaseUpdate.problemModels.lastUpdate,
      userSubmissions: databaseUpdate.userSubmissions.lastUpdate,
    };
  }, [databaseUpdate]);

  const closetNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [setNotification, notification]);

  useEffect(() => {
    let mounted = true;
    ipcRenderer.on(
      GET_LOG_SUCCEEDED,
      (_event, updateLog: DatabaseUpdateLog) => {
        if (mounted) {
          dispatchToDatabaseUpdate({
            destination: "CONTESTS",
            lastUpdate: updateLog.contests,
            progress: "STANDS_BY",
          });
          dispatchToDatabaseUpdate({
            destination: "PROBLEMS",
            lastUpdate: updateLog.problems,
            progress: "STANDS_BY",
          });
          dispatchToDatabaseUpdate({
            destination: "PROBLEM_MODELS",
            lastUpdate: updateLog.problemModels,
            progress: "STANDS_BY",
          });
          dispatchToDatabaseUpdate({
            destination: "USER_SUBMISSIONS",
            lastUpdate: updateLog.userSubmissions,
            progress: "STANDS_BY",
          });
        }
      }
    );

    ipcRenderer.on(GET_LOG_FAILED, (_event, fetchLog: DatabaseUpdateLog) => {
      if (mounted) {
        setNotification({
          open: true,
          status: "error",
          message: "Failed to get database update log.",
        });
      }
    });

    ipcRenderer.on(UPDATE_CONTESTS_SUCCEEDED, (_event) => {
      if (mounted) {
        const current = getCurrentEpochSecond();
        const newLog: DatabaseUpdateLog = {
          contests: current,
          problems: databaseUpdate.problems.lastUpdate,
          problemModels: databaseUpdate.problemModels.lastUpdate,
          userSubmissions: databaseUpdate.userSubmissions.lastUpdate,
        };
        ipcRenderer.send(UPDATE_LOG, newLog);
        dispatchToDatabaseUpdate({
          destination: "CONTESTS",
          lastUpdate: current,
          progress: "SUCCEEDED",
        });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update contests.",
        });
      }
    });

    ipcRenderer.on(UPDATE_CONTESTS_FAILED, (_event) => {
      if (mounted) {
        dispatchToDatabaseUpdate({
          destination: "CONTESTS",
          lastUpdate: null,
          progress: "FAILED",
        });
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
        const newLog: DatabaseUpdateLog = {
          contests: databaseUpdate.contests.lastUpdate,
          problems: current,
          problemModels: databaseUpdate.problemModels.lastUpdate,
          userSubmissions: databaseUpdate.userSubmissions.lastUpdate,
        };
        ipcRenderer.send(UPDATE_LOG, newLog);
        dispatchToDatabaseUpdate({
          destination: "PROBLEMS",
          lastUpdate: current,
          progress: "SUCCEEDED",
        });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update problems.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEMS_FAILED, (_event) => {
      if (mounted) {
        dispatchToDatabaseUpdate({
          destination: "PROBLEMS",
          lastUpdate: null,
          progress: "FAILED",
        });
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
        const newLog: DatabaseUpdateLog = {
          contests: databaseUpdate.contests.lastUpdate,
          problems: databaseUpdate.problems.lastUpdate,
          problemModels: current,
          userSubmissions: databaseUpdate.userSubmissions.lastUpdate,
        };
        ipcRenderer.send(UPDATE_LOG, newLog);
        dispatchToDatabaseUpdate({
          destination: "PROBLEM_MODELS",
          lastUpdate: current,
          progress: "SUCCEEDED",
        });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update problem models.",
        });
      }
    });

    ipcRenderer.on(UPDATE_PROBLEM_MODELS_FAILED, (_event) => {
      if (mounted) {
        dispatchToDatabaseUpdate({
          destination: "PROBLEM_MODELS",
          lastUpdate: null,
          progress: "FAILED",
        });
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
        const newLog: DatabaseUpdateLog = {
          contests: databaseUpdate.contests.lastUpdate,
          problems: databaseUpdate.problems.lastUpdate,
          problemModels: databaseUpdate.problemModels.lastUpdate,
          userSubmissions: current,
        };
        ipcRenderer.send(UPDATE_LOG, newLog);
        dispatchToDatabaseUpdate({
          destination: "USER_SUBMISSIONS",
          lastUpdate: current,
          progress: "SUCCEEDED",
        });
        setNotification({
          open: true,
          status: "success",
          message: "Succeeded to update user submissions.",
        });
      }
    });

    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_FAILED, (_event) => {
      if (mounted) {
        dispatchToDatabaseUpdate({
          destination: "USER_SUBMISSIONS",
          lastUpdate: null,
          progress: "FAILED",
        });
        setNotification({
          open: true,
          status: "error",
          message: "Failed to update user submissions.",
        });
      }
    });

    ipcRenderer.on(UPDATE_LOG_FAILED, (_event) => {
      setNotification({
        open: true,
        status: "error",
        message: "Failed to update log.",
      });
    });

    return () => {
      mounted = false;
    };
  }, [databaseUpdate, dispatchToDatabaseUpdate, getLastUpdate]);

  return (
    <DatabaseUpdateContext.Provider
      value={{
        databaseUpdate: databaseUpdate,
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
    </DatabaseUpdateContext.Provider>
  );
}
