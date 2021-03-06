import { TextField, Typography } from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import { Context as UpdateUserIdContext } from "./Context";

/**
 *
 */
export function UserIdInput(): JSX.Element {
  const { userId, inputUserId } = useContext(UpdateUserIdContext);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const input: string = event.target.value as string;
      inputUserId(input);
    },
    [inputUserId]
  );

  return (
    <div>
      <Typography variant="body1">
        Current user name is &quot;{userId}&quot;.
      </Typography>
      <TextField
        defaultValue=""
        id="update-user-id-form"
        label="Input user id of AtCoder."
        onChange={handleInputChange}
      />
    </div>
  );
}
