import React, { useContext } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Done, Report, Update } from "@material-ui/icons";
import { Context as DatabaseUpdateContext } from "./Context";
import { UpdateStatus } from "./types";
import moment from "moment";

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
  const {
    databaseUpdate,
    updateContests,
    updateProblems,
    updateUserSubmissions,
    updateProblemModels,
  } = useContext(DatabaseUpdateContext);

  const showLocalTime = (updateEpochSecond: number): string => {
    if (updateEpochSecond === Number.MIN_SAFE_INTEGER) {
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
        <Button
          variant="outlined"
          color="primary"
          disabled={databaseUpdate.contests.progress === "UPDATING"}
          onClick={updateContests}
        >
          UPDATE
        </Button>
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
        <Button
          variant="outlined"
          color="primary"
          disabled={databaseUpdate.problems.progress === "UPDATING"}
          onClick={updateProblems}
        >
          UPDATE
        </Button>
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
        <Button
          variant="outlined"
          color="primary"
          disabled={databaseUpdate.problemModels.progress === "UPDATING"}
          onClick={updateProblemModels}
        >
          UPDATE
        </Button>
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
        <Button
          variant="outlined"
          color="primary"
          disabled={databaseUpdate.userSubmissions.progress === "UPDATING"}
          onClick={updateUserSubmissions}
        >
          UPDATE
        </Button>
      </ListItem>
    </List>
  );
}
