import React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./renderer-process/home/Home";
import { APPLICATION_THEME } from "./theme/theme";
import { BASE_WIDTH, TOP } from "./theme/layout";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { Entry as FreeQueueEntry } from "./renderer-process/free/wrapper/Entry";
import "./root.css";

const useStyles = makeStyles({
  root: {
    width: BASE_WIDTH * 15,
    marginLeft: BASE_WIDTH * 0.2,
  },
  menu: {
    paddingTop: TOP,
    maxWidth: BASE_WIDTH * 2,
    flexGrow: 1,
  },
  inner: {
    paddingTop: TOP,
    maxWidth: BASE_WIDTH * 12,
    flexGrow: 1,
  },
});

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <ThemeProvider theme={APPLICATION_THEME}>
      <Router>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={3} className={classes.menu}>
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
            </Grid>
            <Grid item xs={9} className={classes.inner}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/free-queue" component={FreeQueueEntry} />
                <Route path="/date-queue">
                  <div />
                </Route>
                <Route path="/tag-queue">
                  <div />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
