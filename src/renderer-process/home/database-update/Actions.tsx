import { Context as DatabaseUpdateContext } from "./Context";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const { databaseUpdate, updateAll } = useContext(DatabaseUpdateContext);
  const history = useHistory();

  const anyButtonPressed = useMemo(() => {
    return (
      databaseUpdate.contests.progress === "UPDATING" ||
      databaseUpdate.problems.progress === "UPDATING" ||
      databaseUpdate.problemModels.progress === "UPDATING" ||
      databaseUpdate.userSubmissions.progress === "UPDATING"
    );
  }, [databaseUpdate]);

  return (
    <Grid container justify="space-between">
      <Grid item xs={1} />
      <Grid item xs={4} className={classes.action}>
        <Button
          variant="outlined"
          onClick={history.goBack}
          disabled={anyButtonPressed}
        >
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={updateAll}
          disabled={anyButtonPressed}
        >
          UPDATE ALL
        </Button>
      </Grid>
    </Grid>
  );
}
