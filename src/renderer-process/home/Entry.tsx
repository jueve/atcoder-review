import React from "react";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Entry(): JSX.Element {
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
          <ListItem component={Link} to="/update-database">
            <ListItemText primary="Update database" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
