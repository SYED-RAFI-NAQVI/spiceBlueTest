import React from "react";
import { useSelector } from "react-redux";

import TaskHeader from "./components/TaskHeader";
import TaskBody from "./components/TaskBody";
import Tasks from "./components/Tasks";

import { getTaskState } from "./features/DataSlice/DataSclice";

import "./App.css";

function App() {
  const isHidden = useSelector(getTaskState);

  return (
    <div className="App">
      <TaskHeader />
      {isHidden.taskIsHidden === false ? <TaskBody /> : null}
      <Tasks />
    </div>
  );
}

export default App;
