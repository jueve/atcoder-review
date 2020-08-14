import React from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ipcRenderer } from "electron";
import { GET_LOG } from "../../main-process/log/update-database/getLog";

export function Entry(): JSX.Element {
  const handleLinkToUpdateDatabaseClick = (): void => {
    ipcRenderer.send(GET_LOG);
  };

  return (
    <div>
      <div>
        <Typography variant="h3" gutterBottom>
          AtCoder Review
        </Typography>
      </div>
      <div>
        <Typography variant="body1" gutterBottom>
          Before starting application...
        </Typography>
        <List>
          <ListItem
            component={Link}
            to="/update-database"
            onClick={handleLinkToUpdateDatabaseClick}
          >
            <ListItemText primary="Update database" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
