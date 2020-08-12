import Notification from "../Notification";
import { Button, Typography } from "@material-ui/core";
import { Entry as Plane } from "../plane/Entry";
import { Entry as Insert } from "../insert/Entry";
import { Entry as Delete } from "../delete/Entry";
import { Entry as Detail } from "../detail/Entry";
import { useRouteMatch, Switch, Link, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Context as FreeQueueContext } from "./Context";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submenu: {
      margin: theme.spacing(2, 0),
    },
  })
);

function Content() {
  const classes = useStyles();
  const { items } = useContext(FreeQueueContext);
  const { path, url } = useRouteMatch();
  return (
    <>
      <Notification />
      <Typography variant="h5" gutterBottom>
        Free Queue
      </Typography>
      <Typography variant="body1" gutterBottom>
        {items.length} items
      </Typography>
      <div className={classes.submenu}>
        <Button color="primary" component={Link} to={`${url}/insert`}>
          INSERT
        </Button>
        <Button color="primary" component={Link} to={`${url}/delete`}>
          DELETE
        </Button>
      </div>

      <Switch>
        <Route exact path={`${url}/`} component={Plane} />
        <Route path={`${url}/insert`} component={Insert} />
        <Route path={`${url}/delete`} component={Delete} />
        <Route path={`${url}/detail:itemId`} component={Detail} />
      </Switch>
    </>
  );
}

export default Content;
