import React, { useCallback, useEffect, useState, useReducer } from "react";
import { Context as FreeQueueContext } from "./Context";
import { ipcRenderer } from "electron";
import { FreeQueue as FQChannel } from "../../../main-process/database/channel-name";
import { FQItem, SnackbarAction, SortAction } from "./types";
import Content from "./Content";
import { getItems } from "./getItems";

/**
 * Calculate page length with the length of 'FQItem's and 'itemPerPage'.
 *
 * @param {Array<FQItem>} items - all 'FQItem's.
 * @param {number} itemPerPage - the number of items show per a page.
 * @returns {number} - the page length.
 */
const getPageLength = (items: Array<FQItem>, itemPerPage: number): number => {
  return Math.max(Math.ceil(items.length / itemPerPage), 1);
};

/**
 * Get visible 'FQItem's in a page.
 *
 * @param {number} page - current page to show 'FQItem's.
 * @param {number} itemsPerPage - the number of items in a page.
 * @param {Array<FQItem>} items - all 'FQItem's.
 * @returns {Array<FQItem>} - 'FQItem's visible in a page
 */
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
  const [items, setItems] = useState(() =>
    ipcRenderer.sendSync(FQChannel.GET_ITEMS)
  );
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(() => getPageLength(items, 5));
  const [toShow, setToShow] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notification, setNotification] = useState<SnackbarAction>({
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
    const newItems = getItems();
    setItems(newItems);
    setPage(1);
    setItemsPerPage(itemsPerPage);
    setPageLength(getPageLength(newItems, itemsPerPage));
    setToShow(getItemsToShow(page, itemsPerPage, newItems));
  }, [page, setPageLength, itemsPerPage, setItemsPerPage, setToShow]);

  const closeNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [notification, setNotification]);

  useEffect(() => {
    let mounted = true;

    ipcRenderer.send(FQChannel.GET_ITEMS);
    ipcRenderer.on(FQChannel.GET_ITEMS_SUCCEEDED, (_, fqis) => {
      if (mounted) {
        setItems(fqis);
        setPageLength(getPageLength(fqis, itemsPerPage));
        setToShow(getItemsToShow(1, itemsPerPage, fqis));
      }
    });

    ipcRenderer.on(FQChannel.GET_ITEMS_FAILED, (_, fqis) => {
      if (mounted) {
        setItems(fqis);
        setPageLength(getPageLength(fqis, itemsPerPage));
        setToShow(getItemsToShow(1, itemsPerPage, fqis));
      }
    });

    ipcRenderer.on(FQChannel.INSERT_ITEMS_SUCCEEDED, (_) => {
      if (mounted) {
        setNotification({
          status: "success",
          open: true,
          message: `Succeeded to insert items into Free Queue.`,
        });
      }
    });

    ipcRenderer.on(FQChannel.INSERT_ITEMS_FAILED, (_) => {
      if (mounted) {
        setNotification({
          status: "error",
          open: true,
          message: `Failed to insert items into Free Queue.`,
        });
      }
    });

    ipcRenderer.on(FQChannel.DELETE_ITEMS_SUCCEEDED, (_) => {
      if (mounted) {
        setNotification({
          status: "success",
          open: true,
          message: `Succeeded to delete items from Free Queue.`,
        });
      }
    });

    ipcRenderer.on(FQChannel.DELETE_ITEMS_FAILED, (_) => {
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
        <Content />
      </FreeQueueContext.Provider>
    </div>
  );
}
