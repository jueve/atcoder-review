import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Entry as Initialization } from "./initialization/Entry";
import { Entry as Setup } from "./setup/Entry";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      margin: theme.spacing(5, 0, 0, 0),
    },
  })
);

/**
 *
 */
export function Entry(): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Typography variant="h4" gutterBottom>
          AtCoder Review
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          version 0.0.1
        </Typography>
      </div>
      <div className={classes.content}>
        <Grid container>
          <Grid item xs={6}>
            <Initialization />
          </Grid>
          <Grid item xs={6}>
            <Setup />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
