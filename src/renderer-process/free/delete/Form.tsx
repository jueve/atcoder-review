import React, { useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import { Context as DeleteContext } from "./Context";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { deleteItems } from "./deleteItems";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "inherit",
      height: theme.spacing(20),
      padding: theme.spacing(3, 0, 2, 2.2),
    },
    autocomplete: {
      padding: theme.spacing(0, 0.8, 2, 0),
    },
  })
);

export function Form(): JSX.Element {
  const classes = useStyles();
  const { toDelete, changeToDelete } = useContext(DeleteContext);
  const { resetPage } = useContext(FreeQueueContext);

  const handleCancelClick = (): void => {
    changeToDelete(null);
    resetPage();
  };

  const handleConfirmClick = (): void => {
    changeToDelete(null);
    deleteItems(toDelete);
    resetPage();
  };

  return (
    <div className={classes.root}>
      <Typography variant="body1">Delete items</Typography>
      <Grid container justify="space-between">
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" onClick={handleCancelClick}>
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmClick}
                disabled={toDelete.size === 0}
              >
                CONFIRM
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
