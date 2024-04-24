import React from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

export const DeveloperScreen = ({tasks, isDeveloper}) => {
  return (
    <>
      <div className="containerDashboard">
        <h1 className="title left bold">Hi, these are your tasks</h1>
        <h3 className="subtitle">
          Here you can see and modify your assigned tasks.
        </h3>
      </div>
      <Filter isDeveloper={isDeveloper} />
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </>
  );
};
