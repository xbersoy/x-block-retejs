import React from "react";
import { render } from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepPurple, teal } from "@material-ui/core/colors";
import App from "./components/app";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[400],
      light: deepPurple[200],
      dark: deepPurple[700]
    },
    secondary: {
      main: teal.A400,
      light: teal[200],
      dark: teal[700]
    },
    type: "dark"
  },
  spacing: {
    unit: 10
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
