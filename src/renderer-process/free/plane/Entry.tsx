import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_WIDTH } from "../../../theme/layout";
import { ItemList } from "./ItemList";

const useStyle = makeStyles({
  queueContent: {
    maxWidth: BASE_WIDTH * 6,
    flexGrow: 1,
  },
  manager: {
    maxWidth: BASE_WIDTH * 6,
    flexGrow: 1,
  },
});

export function Entry(): JSX.Element {
  const classes = useStyle();

  return (
    <div>
      <Grid container alignItems="stretch" spacing={4}>
        <Grid item xs={6} className={classes.queueContent}>
          <ItemList />
        </Grid>
        <Grid item xs={6} className={classes.manager}></Grid>
      </Grid>
    </div>
  );
}
