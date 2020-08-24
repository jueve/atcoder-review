import React, { useContext, useCallback } from "react";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { Context as DeleteContext } from "./Context";
import { FQItem } from "../wrapper/types";
import {
  ListItemIcon,
  Checkbox,
  List,
  ListItem,
  Theme,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ItemSummary } from "../ItemSummary";
import ItemListPagination from "../ItemListPagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export function ItemList(): JSX.Element {
  const classes = useStyles();
  const { toShow } = useContext(FreeQueueContext);

  const { toDelete, changeToDelete } = useContext(DeleteContext);

  const hasId = useCallback(
    (fqi: FQItem) => {
      return toDelete.find((i: FQItem) => i.id === fqi.id) !== undefined;
    },
    [toDelete]
  );

  const handleCheckClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, fqi: FQItem) => {
      changeToDelete(event, fqi);
    },
    [changeToDelete]
  );

  return (
    <div>
      <ItemListPagination />
      <List>
        {toShow.map((fqi: FQItem) => (
          <ListItem className={classes.listItem} key={fqi.id}>
            <ListItemIcon>
              <Checkbox
                disableRipple
                checked={hasId(fqi)}
                onChange={(event): void => handleCheckClick(event, fqi)}
              />
            </ListItemIcon>
            <ItemSummary {...fqi} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
