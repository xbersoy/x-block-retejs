import React, { Fragment } from "react";
import { Header, Sidebar } from "../components/layouts";
import { CssBaseline } from "@material-ui/core";
import { createEditor } from "../rete";

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Sidebar />
      <div style={{ textAlign: "right", width: "100vw", height: "100vh" }}>
        <div ref={ref => createEditor(ref)} />
      </div>
    </Fragment>
  );
}
