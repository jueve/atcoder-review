import React, { useContext, useState, useCallback, useEffect } from "react";
import { Context as FreeQueueContext } from "../wrapper/Context";
import { FQItem } from "../wrapper/types";
import { List, ListItem, Theme } from "@material-ui/core";
import { ItemSummary } from "../ItemSummary";
import { makeStyles, createStyles } from "@material-ui/styles";
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

  return (
    <div>
      <ItemListPagination />
      <List>
        {toShow.map((fqi: FQItem) => (
          <ListItem className={classes.listItem} key={fqi.id}>
            <ItemSummary {...fqi} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
