import React from "react";
import ReactDOM from "react-dom";
import { createEditor } from "./rete";

import "./styles.css";

function App() {
  const functionName = () => {
    // console.log(createEditor);
  };

  return (
    <div className="App">
      <button onClick={functionName}>Add a new block.</button>
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
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
