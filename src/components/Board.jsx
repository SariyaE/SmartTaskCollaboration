import React, { useState } from "react";
import Column from "./Column";
import "../Board.css";

function Board({ user, logout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Edit task
const handleEditTask = (id, title, deadline, assignedTo) => {
  setTasks(prev =>
    prev.map(t =>
      t.id === id ? { ...t, title, deadline, assignedTo } : t
    )
  );
};

// Delete task
const handleDeleteTask = (id) => {
  setTasks(prev => prev.filter(t => t.id !== id));
};

// Add comment
const handleAddComment = (id, comment) => {
  setTasks(prev =>
    prev.map(t =>
      t.id === id
        ? { ...t, comments: [...(t.comments || []), comment] }
        : t
    )
  );
};
  
  // ADD A NEW TASK
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
    addNotification(`Task "${newTask}" added to To Do`);

    setNewTask("");
    setNewDate("");
  };

  // UPDATE TASK
  const updateTask = (id, updated) => {
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  // DELETE TASK
  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    addNotification(`Task "${task.title}" deleted`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // CHANGE STATUS (manual or drag)
  const changeTaskStatus = (id, status) => {
    const task = tasks.find((t) => t.id === id);
    updateTask(id, { ...task, status });
    addNotification(`Task "${task.title}" moved to ${status}`);
  };

  // NOTIFICATIONS
  const addNotification = (text) => {
    setNotifications([
      { id: Date.now(), text },
      ...notifications,
    ]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // DRAG START
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id.toString());
  };

  // DRAG OVER (allow dropping)
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // DROP INTO COLUMN
  const onDrop = (e, newStatus) => {
    const id = parseInt(e.dataTransfer.getData("taskId"));
    changeTaskStatus(id, newStatus);
  };

  return (
    <div className="board-container">
      <h1>Project 1</h1>
      <p>
        Welcome, {user.username} ({user.role})
      </p>

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
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="board-main">
        {/* TO DO */}
        <Column
          title="To Do"
          tasks={tasks.filter((t) => t.status === "To Do")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />

        {/* IN PROGRESS */}
        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "In Progress")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />

        {/* DONE */}
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "Done")}
          role={user.role}
          updateTask={updateTask}
          deleteTask={deleteTask}
          changeTaskStatus={changeTaskStatus}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />

        {/* NOTIFICATIONS */}
        <div className="notifications-panel">
          <h3>Notifications</h3>

          {notifications.length === 0 && (
            <p>No new notifications</p>
          )}

          {notifications.map((n) => (
            <div key={n.id} className="notification-item">
              {n.text}
              <button
                className="mark-read-btn"
                onClick={() => markNotificationRead(n.id)}
              >
                Mark read
              </button>
            </div>
          ))}

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Board;

