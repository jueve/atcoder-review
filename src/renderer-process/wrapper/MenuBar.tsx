import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 *
 */
export function MenuBar() {
  return (
    <div>
      <div>
        <Button size="large" component={Link} to={`/`}>
          HOME
        </Button>
      </div>
      <div>
        <Button size="large" component={Link} to={`/free-queue`}>
          Free Queue
        </Button>
      </div>
      <div>
        <Button size="large" component={Link} to={`/date-queue`}>
          Date Queue
        </Button>
      </div>
      <div>
        <Button size="large" component={Link} to={`/tag-queue`}>
          Tag Queue
        </Button>
      </div>
    </div>
  );
}
