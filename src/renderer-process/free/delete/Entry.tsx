import React, { useCallback, useReducer, useContext } from "react";
import { List } from "immutable";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_WIDTH } from "../../../theme/layout";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { Context as DeleteContext } from "./Context";
import { FQCandidate, FQItem } from "../wrapper/types";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";
import { reducer } from "./reducer";
import { Form } from "./Form";
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
  const [toDelete, dispatchDeleteAction] = useReducer(reducer, List<FQItem>());

  const deleteFromDatabase = useCallback(
    (toDelete: List<FQItem>) => {
      ipcRenderer.send(FQChannel.DELETE_ITEMS, toDelete.toArray());
      dispatchDeleteAction({ type: "CLEAR", item: undefined });
    },
    [dispatchDeleteAction]
  );

  const changeToDelete = useCallback(
    (event: null | React.ChangeEvent<HTMLInputElement>, fqi: FQItem) => {
      if (event === null) {
        dispatchDeleteAction({ type: "CLEAR", item: undefined });
      } else if (event.target.checked) {
        dispatchDeleteAction({ type: "ADD", item: fqi });
      } else {
        dispatchDeleteAction({ type: "REMOVE", item: fqi });
      }
    },
    [dispatchDeleteAction]
  );

  return (
    <div>
      <DeleteContext.Provider
        value={{
          toDelete: toDelete,
          changeToDelete: changeToDelete,
          deleteFromDatabase: deleteFromDatabase,
        }}
      >
        <Grid container alignItems="stretch" spacing={4}>
          <Grid item xs={6} className={classes.queueContent}>
            <ItemList />
          </Grid>
          <Grid item xs={6} className={classes.manager}>
            <Form />
          </Grid>
        </Grid>
      </DeleteContext.Provider>
    </div>
  );
}
