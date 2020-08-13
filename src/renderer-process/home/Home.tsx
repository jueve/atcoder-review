import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ipcRenderer } from "electron";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  updateProblemModels,
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
import { FetchStatus, Compose } from "./types";
import { Help, Done, Report } from "@material-ui/icons";
import { BASE_WIDTH } from "../../theme/layout";

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

function StatusItem(compose: Compose) {
  return (
    <ListItem>
      <ListItemText
        primary={compose.label}
        secondary={`Last updated: ${compose.last_update}`}
      />
      {(() => {
        switch (compose.progress) {
          case "UPDATING":
            return (
              <Typography
                variant="body2"
                color="textSecondary"
              >Updating...</Typography>
            );

          default:
            return (
              <Button
                variant="outlined"
                color="primary"
                onClick={compose.onClick}
              >
                UPDATE
              </Button>
            );
        }
      })()}
    </ListItem>
  );
}

function Home(): JSX.Element {
  const classes = useStyles();
  const [contests, setContests] = useState<FetchStatus>("STANDS_BY");
  const [problems, setProblems] = useState<FetchStatus>("STANDS_BY");
  const [problemModels, setProblemModels] = useState<FetchStatus>("STANDS_BY");
  const [userSubmissions, setUserSubmissions] = useState<FetchStatus>(
    "STANDS_BY"
  );

  const updateContestsInDatabase = useCallback(() => {
    setContests("UPDATING");
    ipcRenderer.send(UPDATE_CONTESTS);
  }, [setContests]);

  const updateProblemsInDatabase = useCallback(() => {
    setProblems("UPDATING");
    ipcRenderer.send(UPDATE_PROBLEMS);
  }, [setProblems]);

  const updateProblemModelsInDatabase = useCallback(() => {
    setProblemModels("UPDATING");
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
  }, [setProblemModels]);

  const updateUserSubmissionsInDatabase = useCallback(() => {
    setUserSubmissions("UPDATING");
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
  }, [setUserSubmissions]);

  const updateAll = useCallback(() => {
    setContests("UPDATING");
    setProblems("UPDATING");
    setProblemModels("UPDATING");
    setUserSubmissions("UPDATING");
    ipcRenderer.send(UPDATE_CONTESTS);
    ipcRenderer.send(UPDATE_PROBLEM_MODELS);
    ipcRenderer.send(UPDATE_PROBLEMS);
    ipcRenderer.send(UPDATE_USER_SUBMISSIONS);
  }, [setContests, setProblems, setProblemModels, setUserSubmissions]);

  const anyButtonPressed = useMemo(() => {
    return (
      contests === "UPDATING" ||
      problems === "UPDATING" ||
      problemModels === "UPDATING" ||
      userSubmissions === "UPDATING"
    );
  }, [contests, problems, problemModels, userSubmissions]);

  useEffect(() => {
    let mounted = true;
    ipcRenderer.on(
      UPDATE_CONTESTS_SUCCEEDED,
      (_event, current: number, total: number) => {
        if (mounted && current === total) {
          setContests("SUCCEEDED");
        }
      }
    );

    ipcRenderer.on(UPDATE_CONTESTS_FAILED, (_event) => {
      if (mounted) {
        setContests("FAILED");
      }
    });

    ipcRenderer.on(
      UPDATE_PROBLEMS_SUCCEEDED,
      (_event, current: number, total: number) => {
        if (mounted && current === total) {
          setProblems("SUCCEEDED");
        }
      }
    );

    ipcRenderer.on(UPDATE_PROBLEMS_FAILED, (_event) => {
      if (mounted) {
        setProblems("FAILED");
      }
    });

    ipcRenderer.on(
      UPDATE_PROBLEM_MODELS_SUCCEEDED,
      (_event, current: number, total: number) => {
        if (mounted && current === total) {
          setProblemModels("SUCCEEDED");
        }
      }
    );

    ipcRenderer.on(UPDATE_PROBLEM_MODELS_FAILED, (_event) => {
      if (mounted) {
        setProblemModels("FAILED");
      }
    });

    ipcRenderer.on(
      UPDATE_USER_SUBMISSIONS_SUCCEEDED,
      (_event, current: number, total: number) => {
        if (mounted && current === total) {
          setUserSubmissions("SUCCEEDED");
        }
      }
    );

    ipcRenderer.on(UPDATE_USER_SUBMISSIONS_FAILED, (_event) => {
      if (mounted) {
        setUserSubmissions("FAILED");
      }
    });

    return () => {
      mounted = false;
    };
  }, [contests, problems, problemModels, userSubmissions]);

  return (
    <div className={classes.root}>
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
        <List>
          <StatusItem
            {...{
              label: "Contests",
              last_update: "???",
              progress: contests,
              onClick: updateContestsInDatabase,
            }}
          />
          <StatusItem
            {...{
              label: "Problems",
              last_update: "???",
              progress: problems,
              onClick: updateProblemsInDatabase,
            }}
          />
          <StatusItem
            {...{
              label: "Problem Models",
              last_update: "???",
              progress: problemModels,
              onClick: updateProblemModelsInDatabase,
            }}
          />
          <StatusItem
            {...{
              label: "User Submissions",
              last_update: "???",
              progress: userSubmissions,
              onClick: updateUserSubmissionsInDatabase,
            }}
          />
        </List>
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
  );
}

export default Home;
