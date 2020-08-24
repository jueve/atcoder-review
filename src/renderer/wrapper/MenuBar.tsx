import React, { useReducer } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { menuBarReducer } from "./menuBarReducer";
import { Page } from "./types";

/**
 *
 */
export function MenuBar() {
  const [menuBarDisable, dispatchToMenuBarDisable] = useReducer(
    menuBarReducer,
    {
      home: true,
      freeQueue: false,
      dateQueue: false,
      tagQueue: false,
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
    <div>
      <div>
        <Button
          size="large"
          component={Link}
          to={`/`}
          disabled={menuBarDisable.home}
          onClick={(event: React.MouseEvent<unknown>) =>
            handleMenuClick(event, "HOME")
          }
        >
          HOME
        </Button>
      </div>
      <div>
        <Button
          size="large"
          component={Link}
          to={`/free-queue`}
          disabled={menuBarDisable.freeQueue}
          onClick={(event: React.MouseEvent<unknown>) =>
            handleMenuClick(event, "FREE_QUEUE")
          }
          disableRipple
        >
          Free Queue
        </Button>
      </div>
    </div>
  );
}
