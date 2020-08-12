import { createMuiTheme } from "@material-ui/core/styles";

const APPLICATION_THEME = createMuiTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
    secondary: {
      main: "#ff0266",
    },
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Roboto"',
  },
});

export { APPLICATION_THEME };
