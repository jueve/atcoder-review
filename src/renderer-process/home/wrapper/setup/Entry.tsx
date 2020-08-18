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
import { GET_LOG } from "../../../../main-process/log/database-update/getLog";
import { GET_USER_ID } from "../../../../main-process/config/user-id/getUserId";

/**
 *
 */
export function Entry(): JSX.Element {
  const handleLinkToDatabaseUpdateClick = (): void => {
    ipcRenderer.send(GET_LOG);
  };

  const handleLinkToUpdateUserIdClick = (): void => {
    ipcRenderer.send(GET_USER_ID);
  };

  return (
    <div>
      <div>
        <Typography variant="h6" gutterBottom>
          Set up
        </Typography>
        <List>
          <ListItem
            component={Link}
            to="/update-user-id"
            onClick={handleLinkToUpdateUserIdClick}
          >
            <ListItemText primary="Update user id" />
          </ListItem>

          <ListItem
            component={Link}
            to="/update-database"
            onClick={handleLinkToDatabaseUpdateClick}
          >
            <ListItemText primary="Update database" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
