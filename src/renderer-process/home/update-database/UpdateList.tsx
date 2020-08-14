import React, { useCallback, useContext } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Done, Report, Update } from "@material-ui/icons";
import { Context as HomeContext } from "./Context";
import { FetchStatus } from "./types";

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
  } = useContext(HomeContext);

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Icon {...contests} />
        </ListItemIcon>
        <ListItemText
          primary="Contests"
          secondary={`Last updated: ${contests.lastUpdate}`}
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
          primary="Problems"
          secondary={`Last updated: ${problems.lastUpdate}`}
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
          primary="Problem Models"
          secondary={`Last updated: ${problemModels.lastUpdate}`}
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
          primary="User Submissions"
          secondary={`Last updated: ${userSubmissions.lastUpdate}`}
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
