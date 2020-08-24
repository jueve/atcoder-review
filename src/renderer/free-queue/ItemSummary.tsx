import React from "react";
import { FQItem } from "./wrapper/types";
import {
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Launch, Done } from "@material-ui/icons";

export function ItemSummary(fqi: FQItem): JSX.Element {
  const showTitle = (title: string): string => {
    if (title === undefined || title.length <= 20) {
      return title;
    } else {
      return title.slice(0, 20) + "...";
    }
  };

  return (
    <>
      <ListItemText
        primary={showTitle(fqi.problem_title)}
        secondary={fqi.contest_title}
      />
      <ListItemIcon>
        {fqi.is_done === 1 ? (
          <Tooltip title="Task done">
            <Done />
          </Tooltip>
        ) : (
          <div />
        )}
      </ListItemIcon>
      <ListItemSecondaryAction>
        <Tooltip title="Show detail">
          <IconButton
            edge="end"
            aria-label="detail"
            component={Link}
            to={`/free-queue/detail${fqi.id}`}
          >
            <Launch />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </>
  );
}
