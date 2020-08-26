import React, { useCallback, useEffect, useState } from "react";
import { Context as FreeQueueContext } from "./Context";
import { ipcRenderer } from "electron";
import { FQItem, NotificationWithMessage } from "./types";
import { getItems } from "./getItems";
import {
  GET_ALL_ITEMS_SUCCEEDED,
  GET_ALL_ITEMS_FAILED,
} from "../../../main/database/free-queue/getAllItems";
import {
  INSERT_ITEMS_SUCCEEDED,
  INSERT_ITEMS_FAILED,
} from "../../../main/database/free-queue/insertItems";
import {
  DELETE_ITEMS_SUCCEEDED,
  DELETE_ITEMS_FAILED,
} from "../../../main/database/free-queue/deleteItems";
import { Content } from "./Content";
import { MenuBar } from "./MenuBar";
import Notification from "../Notification";
import { Typography } from "@material-ui/core";

const getPageLength = (items: Array<FQItem>, itemPerPage: number): number => {
  return Math.max(Math.ceil(items.length / itemPerPage), 1);
};

const getItemsToShow = (
  page: number,
  itemsPerPage: number,
  items: Array<FQItem>
): Array<FQItem> => {
  const arr = Array<FQItem>(0);
  const start: number = itemsPerPage * (page - 1);

  for (
    let i = start;
    i < Math.min(start + itemsPerPage, items.length);
    i += 1
  ) {
    arr.push(items[i]);
  }
  return arr;
};

export function Entry(): JSX.Element {
  const [items, setItems] = useState<Array<FQItem>>([]);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(() => getPageLength(items, 5));
  const [toShow, setToShow] = useState<Array<FQItem>>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notification, setNotification] = useState<NotificationWithMessage>({
    status: "warning",
    open: false,
    message: "",
  });

  const changeToShow = useCallback(
    (page: number, itemsPerPage: number, items: Array<FQItem>) => {
      setPage(page);
      setItemsPerPage(itemsPerPage);
      setPageLength(getPageLength(items, itemsPerPage));
      setToShow(getItemsToShow(page, itemsPerPage, items));
    },
    [setPage, setItemsPerPage, setToShow, setPageLength]
  );

  const resetPage = useCallback(() => {
    getItems();
  }, []);

  const closeNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [notification, setNotification]);

  useEffect(() => {
    let mounted = true;

    getItems();
    ipcRenderer.on(GET_ALL_ITEMS_SUCCEEDED, (_, fqis) => {
      if (mounted) {
        setItems(fqis);
        setPage(1);
        setPageLength(getPageLength(fqis, itemsPerPage));
        setToShow(getItemsToShow(1, itemsPerPage, fqis));
      }
    });

    ipcRenderer.on(GET_ALL_ITEMS_FAILED, (_, fqis) => {
      if (mounted) {
        setItems(fqis);
        setPage(1);
        setPageLength(getPageLength(fqis, itemsPerPage));
        setToShow(getItemsToShow(1, itemsPerPage, fqis));
      }
    });

    ipcRenderer.on(INSERT_ITEMS_SUCCEEDED, (_) => {
      if (mounted) {
        setNotification({
          status: "success",
          open: true,
          message: `Succeeded to insert items into Free Queue.`,
        });
      }
    });

    ipcRenderer.on(INSERT_ITEMS_FAILED, (_) => {
      if (mounted) {
        setNotification({
          status: "error",
          open: true,
          message: `Failed to insert items into Free Queue.`,
        });
      }
    });

    ipcRenderer.on(DELETE_ITEMS_SUCCEEDED, (_) => {
      if (mounted) {
        setNotification({
          status: "success",
          open: true,
          message: `Succeeded to delete items from Free Queue.`,
        });
      }
    });

    ipcRenderer.on(DELETE_ITEMS_FAILED, (_) => {
      if (mounted) {
        setNotification({
          status: "error",
          open: true,
          message: `Failed to delete items from Free Queue.`,
        });
      }
    });

    return (): void => {
      mounted = false;
    };
  }, [itemsPerPage]);

  return (
    <div>
      <FreeQueueContext.Provider
        value={{
          items: items,
          page: page,
          itemsPerPage: itemsPerPage,
          pageLength: pageLength,
          toShow: toShow,
          resetPage: resetPage,
          changeToShow: changeToShow,
          notification: notification,
          closeNotification: closeNotification,
        }}
      >
        <Notification />
        <Typography variant="h5" gutterBottom>
          Free Queue
        </Typography>
        <MenuBar />
        <Content />
      </FreeQueueContext.Provider>
    </div>
  );
}
