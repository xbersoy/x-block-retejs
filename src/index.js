import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createEditor } from "./rete";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import { deepPurple, teal } from "@material-ui/core/colors";
import { Header } from "./components/layouts";
import { CssBaseline } from "@material-ui/core";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
      light: deepPurple[200],
      dark: deepPurple[700],
    },
    secondary: {
      main: teal.A400,
      light: teal[200],
      dark: teal[700],
    },
    type: "dark",
  },
});

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <div className="App">
        <div className="editor">
          <div className="container">
            <div
              className="node-editor"
              style={{ width: "100vw", height: "100vh" }}
              ref={(ref) => ref && createEditor(ref)}
            />
          </div>
          <div id="dock" className="dock"></div>
        </div>
      </div>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
);
