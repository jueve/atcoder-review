import React from "react";
import { Route, Switch } from "react-router-dom";
import { Entry as HomeEntry } from "../home/wrapper/Entry";
import { Entry as DatabaseUpdate } from "../home/database-update/Entry";
import { Entry as UpdateUserId } from "../home/user-id-update/Entry";
import { Entry as FreeQueue } from "../free-queue/wrapper/Entry";

export function Content(): JSX.Element {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeEntry} />
        <Route path="/update-database" component={DatabaseUpdate} />
        <Route path="/update-user-id" component={UpdateUserId} />
        <Route path="/free-queue" component={FreeQueue} />
        <Route path="/date-queue">
          <div />
        </Route>
        <Route path="/tag-queue">
          <div />
        </Route>
      </Switch>
    </div>
  );
}
