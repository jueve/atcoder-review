import React from "react";
import { Entry as Plane } from "../plane/Entry";
import { Entry as Insert } from "../insert/Entry";
import { Entry as Delete } from "../delete/Entry";
import { Entry as Detail } from "../detail/Entry";
import { useRouteMatch, Switch, Route } from "react-router-dom";

export function Content() {
  const { url } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${url}/`} component={Plane} />
        <Route path={`${url}/insert`} component={Insert} />
        <Route path={`${url}/delete`} component={Delete} />
        <Route path={`${url}/detail:itemId`} component={Detail} />
      </Switch>
    </>
  );
}
