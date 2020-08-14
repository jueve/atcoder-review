import React from "react";
import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { BASE_WIDTH } from "../../theme/layout";

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
      <div>
        <Typography variant="h3" gutterBottom>
          AtCoder Review
        </Typography>
      </div>
      <div>
        <Button component={Link} to={`/update-database`}>
          UPDATE DATABASE
        </Button>
      </div>
    </div>
  );
}
