import React, { useContext } from "react";
import { StatusWithMessage } from "../../../wrapper/types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Done, Report, Update } from "@material-ui/icons";
import { Context as InitializationContext } from "../../../wrapper/Context";

const Icon = (st: StatusWithMessage): JSX.Element => {
  switch (st.status) {
    case "STANDS_BY":
      return (
        <Tooltip title="stands by">
          <Update />
        </Tooltip>
      );
    case "CHECKING":
      return (
        <Tooltip title="Checking...">
          <Update />
        </Tooltip>
      );
    case "SUCCEEDED":
      return (
        <Tooltip title="Succeeded">
          <Done />
        </Tooltip>
      );
    case "FAILED":
      return (
        <Tooltip title="Failed">
          <Report />
        </Tooltip>
      );
  }
};

/**
 *
 */
export function InitializeList(): JSX.Element {
  const { initialization } = useContext(InitializationContext);
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Icon {...initialization.baseDirectory} />
        </ListItemIcon>
        <ListItemText
          primary="Base directory..."
          secondary={initialization.baseDirectory.message}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...initialization.configFile} />
        </ListItemIcon>
        <ListItemText
          primary="Config..."
          secondary={initialization.configFile.message}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...initialization.logFile} />
        </ListItemIcon>
        <ListItemText
          primary="Log..."
          secondary={initialization.logFile.message}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...initialization.databaseUpdateLogFile} />
        </ListItemIcon>
        <ListItemText
          primary="Database update log..."
          secondary={initialization.databaseUpdateLogFile.message}
        />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <Icon {...initialization.databaseTables} />
        </ListItemIcon>
        <ListItemText
          primary="Database tables..."
          secondary={initialization.databaseTables.message}
        />
      </ListItem>
    </List>
  );
}
