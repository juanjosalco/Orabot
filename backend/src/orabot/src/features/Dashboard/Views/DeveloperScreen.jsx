import React, { useEffect, useState } from "react";

// Components
import { Task } from "../Components/Task";
import { Filter } from "../Components/Filter";

import { getTasks } from "../../../api/TasksAPI";

import { useUser } from "../../../hooks/useUser";

export const DeveloperScreen = () => {
  const { userData } = useUser();

  const [tasks, setTasks] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ priority: 0, status: "ALL", sortBy: "creationDate" })
  const [error, setError] = useState("");

  const sortTasks = (tasks) => {
    if (filterOptions.sortBy === "priority") {
      return tasks.sort((a, b) => a.priority - b.priority);
    } else if (filterOptions.sortBy === "dueDate") {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      return tasks;
    }
  };

  const getDeveloperTasks = async () => {
    const tasks = await getTasks(userData.token, filterOptions.priority, filterOptions.sortBy, filterOptions.status);
    if (tasks.error) {
      setError(tasks.error);
    } else {
     let filteredTasks = sortTasks(tasks);
      setTasks(filteredTasks);
    } 
  };

  useEffect(() => {
    getDeveloperTasks()
  },);

  return (
    <>
      <div className="containerDashboard">
        <h1 className="title left bold">Hi, these are your tasks</h1>
        <h3 className="subtitle">
          Here you can see and modify your assigned tasks.
        </h3>
      </div>
      <Filter role={userData.role} onFilterBy={setFilterOptions} />
      {error && <p className="error">{error}</p>}
      {tasks.map((task, index) => (
        <Task key={index} task={task} role={userData.role} />
      ))}
    </>
  );
};
