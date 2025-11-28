import React, { useState } from "react";
import Column from "./Column";
import "../Board.css";

function Board({ user, logout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      due: newDate,
      assignee: user.username,
      status: "To Do",
      comments: [],
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewDate("");
  };

  const updateTask = (id, updated) => {
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeTaskStatus = (id, status) => {
    updateTask(id, { ...tasks.find((t) => t.id === id), status });
  };

  return (
    <div className="board-container">
      <h1>Project 1</h1>
      <p>Welcome, {user.username} ({user.role})</p>

      {/* Input Row */}
      <div className="task-input-row">
        <input
          placeholder="Task description"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          placeholder="mm / dd / yyyy"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="board-main">
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.status === "To Do")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
        />

        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "In Progress")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
        />

        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "Done")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
        />

        {/* Notifications panel placeholder EXACT like screenshot */}
        <div className="notifications-panel">
          <h3>Notifications</h3>
          <div className="notification-item">
            Task moved to In Progress
            <button className="mark-read-btn">Mark read</button>
          </div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
