import React, { useCallback, useReducer } from "react";
import { List } from "immutable";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_WIDTH } from "../../../theme/layout";
import { Context as DeleteContext } from "./Context";
import { FQItem } from "../wrapper/types";
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

  const changeToDelete = useCallback(
    (
      event: null | React.ChangeEvent<HTMLInputElement>,
      fqi: FQItem | undefined
    ) => {
      if (event === null) {
        dispatchDeleteAction({ type: "CLEAR", item: fqi as FQItem });
      } else if (event.target.checked) {
        dispatchDeleteAction({ type: "ADD", item: fqi as FQItem });
      } else {
        dispatchDeleteAction({ type: "REMOVE", item: fqi as FQItem });
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
