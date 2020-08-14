import React, { useCallback, useContext } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Context as HomeContext } from "./Context";

export function UpdateList() {
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
        <ListItemIcon></ListItemIcon>
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
        <ListItemIcon></ListItemIcon>
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
        <ListItemIcon></ListItemIcon>
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
        <ListItemIcon></ListItemIcon>
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
