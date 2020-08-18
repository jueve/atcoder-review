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
import { FetchStatus } from "./types";
import moment from "moment";

const Icon = (status: FetchStatus): JSX.Element => {
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
    contests,
    problems,
    problemModels,
    userSubmissions,
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
          <Icon {...contests} />
        </ListItemIcon>
        <ListItemText
          primary="Contests (e.g. title, start date)"
          secondary={`Last updated: ${showLocalTime(contests.lastUpdate)}`}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={contests.progress === "UPDATING"}
          onClick={updateContests}
        >
          UPDATE
        </Button>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...problems} />
        </ListItemIcon>
        <ListItemText
          primary="Problems (e.g. title, contest id)"
          secondary={`Last updated: ${showLocalTime(problems.lastUpdate)}`}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={problems.progress === "UPDATING"}
          onClick={updateProblems}
        >
          UPDATE
        </Button>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...problemModels} />
        </ListItemIcon>
        <ListItemText
          primary="Problem Models (e.g. difficulty)"
          secondary={`Last updated: ${showLocalTime(problemModels.lastUpdate)}`}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={problemModels.progress === "UPDATING"}
          onClick={updateProblemModels}
        >
          UPDATE
        </Button>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...userSubmissions} />
        </ListItemIcon>
        <ListItemText
          primary="User Submissions (e.g. submission date, problem id)"
          secondary={`Last updated: ${showLocalTime(
            userSubmissions.lastUpdate
          )}`}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={userSubmissions.progress === "UPDATING"}
          onClick={updateUserSubmissions}
        >
          UPDATE
        </Button>
      </ListItem>
    </List>
  );
}
