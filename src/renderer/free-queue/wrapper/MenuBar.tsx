import { Button, ButtonGroup, Typography, Grid } from "@material-ui/core";
import { useRouteMatch, Link } from "react-router-dom";
import React, { useContext, useReducer } from "react";
import { Context as FreeQueueContext } from "./Context";
import { menuBarReducer } from "./menuBarReducer";
import { Page } from "./types";

export function MenuBar() {
  const { items } = useContext(FreeQueueContext);
  const { url } = useRouteMatch();
  const [menuBarDisable, dispatchToMenuBarDisable] = useReducer(
    menuBarReducer,
    {
      insert: false,
      delete: false,
    }
  );

  const handleMenuClick = (
    event: React.MouseEvent<unknown>,
    page: Page
  ): void => {
    event.stopPropagation();
    dispatchToMenuBarDisable({ page: page });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>
            {items.length} items
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup
            color="primary"
            variant="outlined"
            aria-label="free-queue-manager"
            disableRipple
          >
            <Button
              color="primary"
              component={Link}
              to={`${url}/insert`}
              onClick={(event: React.MouseEvent<unknown>) =>
                handleMenuClick(event, "INSERT")
              }
              disabled={menuBarDisable.insert}
              disableRipple
            >
              INSERT
            </Button>
            <Button
              color="primary"
              component={Link}
              to={`${url}/delete`}
              onClick={(event: React.MouseEvent<unknown>) =>
                handleMenuClick(event, "DELETE")
              }
              disabled={menuBarDisable.delete}
              disableRipple
            >
              DELETE
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
}
