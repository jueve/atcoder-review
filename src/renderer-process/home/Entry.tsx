import React from "react";
import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { BASE_WIDTH } from "../../theme/layout";
import { Notification } from "./update-database/Notification";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: BASE_WIDTH * 8,
    },
  })
);

export function Entry(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Notification />
      <div>
        <Typography variant="h3" gutterBottom>
          AtCoder Review
        </Typography>
      </div>
    </div>
  );
}
