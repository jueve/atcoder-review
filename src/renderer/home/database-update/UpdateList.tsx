import React, { useContext } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Done, Report, Update } from "@material-ui/icons";
import { Context as DatabaseUpdateContext } from "./Context";
import { LastUpdate, UpdateStatus } from "./types";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      marginRight: theme.spacing(3),
    },
  })
);

const Icon = (status: UpdateStatus): JSX.Element => {
  switch (status.progress) {
    case "STANDS_BY":
      return (
        <Tooltip title="Waiting update">
          <Update />
        </Tooltip>
      );
    case "UPDATING":
      return (
        <Tooltip title="Updating...">
          <Update />
        </Tooltip>
      );
    case "SUCCEEDED":
      return (
        <Tooltip title="Update succeeded">
          <Done />
        </Tooltip>
      );
    case "FAILED":
      return (
        <Tooltip title="Update failed">
          <Report />
        </Tooltip>
      );
  }
};

/**
 *
 */
export function UpdateList(): JSX.Element {
  const classes = useStyles();
  const {
    databaseUpdate,
    updateContests,
    updateProblems,
    updateUserSubmissions,
    updateProblemModels,
  } = useContext(DatabaseUpdateContext);

  const showLocalTime = (updateEpochSecond: LastUpdate): string => {
    if (updateEpochSecond === null) {
      return "?";
    } else {
      return moment(updateEpochSecond * 1000)
        .local()
        .format("YYYY-MM-DD HH:mm");
    }
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Icon {...databaseUpdate.contests} />
        </ListItemIcon>
        <ListItemText
          primary="Contests (e.g. title, start date)"
          secondary={`Last updated: ${showLocalTime(
            databaseUpdate.contests.lastUpdate
          )}`}
        />
        {databaseUpdate.contests.progress === "UPDATING" ? (
          <div className={classes.progress}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Button variant="outlined" color="primary" onClick={updateContests}>
            UPDATE
          </Button>
        )}
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...databaseUpdate.problems} />
        </ListItemIcon>
        <ListItemText
          primary="Problems (e.g. title, contest id)"
          secondary={`Last updated: ${showLocalTime(
            databaseUpdate.problems.lastUpdate
          )}`}
        />
        {databaseUpdate.problems.progress === "UPDATING" ? (
          <div className={classes.progress}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Button variant="outlined" color="primary" onClick={updateProblems}>
            UPDATE
          </Button>
        )}
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...databaseUpdate.problemModels} />
        </ListItemIcon>
        <ListItemText
          primary="Problem Models (e.g. difficulty)"
          secondary={`Last updated: ${showLocalTime(
            databaseUpdate.problemModels.lastUpdate
          )}`}
        />
        {databaseUpdate.problemModels.progress === "UPDATING" ? (
          <div className={classes.progress}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={updateProblemModels}
          >
            UPDATE
          </Button>
        )}
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...databaseUpdate.userSubmissions} />
        </ListItemIcon>
        <ListItemText
          primary="User Submissions (e.g. submission date, problem id)"
          secondary={`Last updated: ${showLocalTime(
            databaseUpdate.userSubmissions.lastUpdate
          )}`}
        />
        {databaseUpdate.userSubmissions.progress === "UPDATING" ? (
          <div className={classes.progress}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={updateUserSubmissions}
          >
            UPDATE
          </Button>
        )}
      </ListItem>
    </List>
  );
}
