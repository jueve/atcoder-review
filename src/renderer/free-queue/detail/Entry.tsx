import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_WIDTH } from "../../../theme/layout";
import { ItemDetail } from "./ItemDetail";

const useStyle = makeStyles({
  queueContent: {
    maxWidth: BASE_WIDTH * 8,
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
        <Grid item xs={12} className={classes.queueContent}>
          <ItemDetail />
        </Grid>
      </Grid>
    </div>
  );
}
