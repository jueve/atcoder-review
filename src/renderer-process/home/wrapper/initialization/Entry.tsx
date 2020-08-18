import React from "react";
import { Typography } from "@material-ui/core";
import { InitializeList } from "./InitializeList";

/**
 *
 */
export function Entry(): JSX.Element {
  return (
    <div>
      <div>
        <Typography variant="h6" gutterBottom>
          Initialization
        </Typography>
      </div>
      <div>
        <InitializeList />
      </div>
    </div>
  );
}
