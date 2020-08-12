import React, { useContext } from "react";
import { Context as FreeQueueContext } from "./wrapper/Context";
import { FormControl, MenuItem, Select, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

function ItemListPagination(): JSX.Element {
  const { items, itemsPerPage, page, pageLength, changeToShow } = useContext(
    FreeQueueContext
  );

  const handleSelectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    changeToShow(1, event.target.value as number, items);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ): void => {
    changeToShow(newPage, itemsPerPage, items);
  };

  const arr = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item xs={11}>
          <Pagination
            count={pageLength}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <Select
              labelId="items-per-page-label"
              id="items-per-page-label"
              value={itemsPerPage}
              onChange={handleSelectChange}
            >
              {arr.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default ItemListPagination;
