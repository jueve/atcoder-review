import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Entry(): JSX.Element {
  return (
    <div>
      <div>
        <Typography variant="h3" gutterBottom>
          AtCoder Review
        </Typography>
      </div>
      <div>
        <Button component={Link} to={`/update-database`}>
          UPDATE DATABASE
        </Button>
      </div>
    </div>
  );
}
