import React, { useEffect, useReducer, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { APPLICATION_THEME } from "../../theme/theme";
import { BASE_WIDTH, TOP } from "../../theme/layout";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { MenuBar } from "./MenuBar";
import { Content } from "./Content";
import { reducer } from "./reducer";
import { Initialization } from "./types";
import { Context as InitializationContext } from "./Context";
import { ipcRenderer } from "electron";
import {
  CREATE_BASE_DIRECTORY_SUCCEEDED,
  CREATE_BASE_DIRECTORY_FAILED,
} from "../../main-process/initialization/createBaseDirectory";
import {
  CREATE_CONFIG_FILE_SUCCEEDED,
  CREATE_CONFIG_FILE_FAILED,
} from "../../main-process/initialization/createConfigFile";
import {
  CREATE_LOG_FILE_SUCCEEDED,
  CREATE_LOG_FILE_FAILED,
} from "../../main-process/initialization/createLogFile";
import {
  CREATE_DATABASE_UPDATE_LOG_FILE_SUCCEEDED,
  CREATE_DATABASE_UPDATE_LOG_FILE_FAILED,
} from "../../main-process/initialization/createDatabaseUpdateLogFile";
import {
  CREATE_DATABASE_TABLES_FAILED,
  CREATE_DATABASE_TABLES_SUCCEEDED,
} from "../../main-process/initialization/createDatabaseTables";

const init: Initialization = {
  baseDirectory: {
    status: "STANDS_BY",
    message: "",
  },
  configFile: {
    status: "STANDS_BY",
    message: "",
  },
  logFile: {
    status: "STANDS_BY",
    message: "",
  },
  databaseUpdateLogFile: {
    status: "STANDS_BY",
    message: "",
  },
  databaseTables: {
    status: "STANDS_BY",
    message: "",
  },
};

const useStyles = makeStyles({
  root: {
    width: BASE_WIDTH * 12,
  },
  menu: {
    paddingTop: TOP,
    paddingLeft: BASE_WIDTH * 0.2,
    maxWidth: BASE_WIDTH * 2,
    flexGrow: 1,
    borderRight: "1px solid #e0e0e0",
  },
  inner: {
    paddingTop: TOP,
    paddingLeft: BASE_WIDTH * 0.4,
    maxWidth: BASE_WIDTH * 12,
    flexGrow: 1,
  },
});

/**
 *
 */
export function Entry(): JSX.Element {
  const classes = useStyles();
  const [height, setHeight] = useState(1000);
  const [initialization, dispatchActionToInitialization] = useReducer(
    reducer,
    init
  );

  useEffect(() => {
    let mounted = true;

    window.addEventListener("resize", (event) => {
      if (mounted) {
        const target = event.target as Window;
        setHeight(target.innerHeight);
      }
    });

    ipcRenderer.on(
      CREATE_BASE_DIRECTORY_SUCCEEDED,
      (_event, message: string) => {
        if (mounted) {
          dispatchActionToInitialization({
            destination: "BASE_DIRECTORY",
            status: "SUCCEEDED",
            message: message,
          });
        }
      }
    );

    ipcRenderer.on(CREATE_BASE_DIRECTORY_FAILED, (_event, message: string) => {
      if (mounted) {
        console.log(message);
        dispatchActionToInitialization({
          destination: "BASE_DIRECTORY",
          status: "FAILED",
          message: message,
        });
      }
    });

    ipcRenderer.on(CREATE_CONFIG_FILE_SUCCEEDED, (_event, message: string) => {
      if (mounted) {
        dispatchActionToInitialization({
          destination: "CONFIG_FILE",
          status: "SUCCEEDED",
          message: message,
        });
      }
    });

    ipcRenderer.on(CREATE_CONFIG_FILE_FAILED, (_event, message: string) => {
      if (mounted) {
        dispatchActionToInitialization({
          destination: "CONFIG_FILE",
          status: "FAILED",
          message: message,
        });
      }
    });

    ipcRenderer.on(CREATE_LOG_FILE_SUCCEEDED, (_event, message: string) => {
      if (mounted) {
        dispatchActionToInitialization({
          destination: "LOG_FILE",
          status: "SUCCEEDED",
          message: message,
        });
      }
    });

    ipcRenderer.on(CREATE_LOG_FILE_FAILED, (_event, message: string) => {
      if (mounted) {
        dispatchActionToInitialization({
          destination: "LOG_FILE",
          status: "FAILED",
          message: message,
        });
      }
    });

    ipcRenderer.on(
      CREATE_DATABASE_UPDATE_LOG_FILE_SUCCEEDED,
      (_event, message: string) => {
        if (mounted) {
          dispatchActionToInitialization({
            destination: "DATABASE_UPDATE_LOG_FILE",
            status: "SUCCEEDED",
            message: message,
          });
        }
      }
    );

    ipcRenderer.on(
      CREATE_DATABASE_UPDATE_LOG_FILE_FAILED,
      (_event, message: string) => {
        if (mounted) {
          dispatchActionToInitialization({
            destination: "DATABASE_UPDATE_LOG_FILE",
            status: "FAILED",
            message: message,
          });
        }
      }
    );

    ipcRenderer.on(
      CREATE_DATABASE_TABLES_SUCCEEDED,
      (_event, message: string) => {
        if (mounted) {
          dispatchActionToInitialization({
            destination: "DATABASE_TABLES",
            status: "SUCCEEDED",
            message: message,
          });
        }
      }
    );

    ipcRenderer.on(CREATE_DATABASE_TABLES_FAILED, (_event, message: string) => {
      if (mounted) {
        dispatchActionToInitialization({
          destination: "DATABASE_TABLES",
          status: "FAILED",
          message: message,
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={APPLICATION_THEME}>
      <InitializationContext.Provider
        value={{
          initialization: initialization,
        }}
      >
        <Router>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid
                item
                xs={3}
                className={classes.menu}
                style={{ minHeight: height }}
              >
                <MenuBar />
              </Grid>
              <Grid item xs={9} className={classes.inner}>
                <Content />
              </Grid>
            </Grid>
          </div>
        </Router>
      </InitializationContext.Provider>
    </ThemeProvider>
  );
}
