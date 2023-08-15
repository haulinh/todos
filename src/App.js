import React, { useEffect, useState } from "react";
import "./App.css";
import { TodoListContainer } from "./container/TodoListContainer";
import { Button } from "reactstrap";
import { TodoListContainerWithRedux } from "./container/TodoListContainerWithRedux";

function App() {

  return (
    <>
      {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{ width: "60%" }}>
          <TodoListContainer />
        </div>
      </div> */}

      <TodoListContainerWithRedux/>
    </>
  );
}

export default App;
