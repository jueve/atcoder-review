import { Context as UpdateUserIdContext } from "./Context";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      "& > *": {
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
  })
);

/**
 *
 */
export function Actions() {
  const classes = useStyles();
  const { userId, updateUserId } = useContext(UpdateUserIdContext);
  const history = useHistory();

  return (
    <Grid container justify="space-between">
      <Grid item xs={1} />
      <Grid item xs={7} className={classes.action}>
        <Button variant="outlined" onClick={history.goBack}>
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={userId === null}
          onClick={updateUserId}
        >
          UPDATE
        </Button>
      </Grid>
    </Grid>
  );
}
