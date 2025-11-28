function Task({ task, role, deleteTask, updateTask, changeTaskStatus }) {
  const handleEdit = () => {
    const newAssignee = prompt("Enter assignee:", task.assignee);
    const newDue = prompt("Enter due date (YYYY-MM-DD):", task.due);
    updateTask(task.id, { ...task, assignee: newAssignee, due: newDue });
  };

  return (
    <div className="task-card">
      <h4>{task.title}</h4>

      <div className="task-details">
        Deadline: {task.due || "—"} <br />
        Assigned: {task.assignee || "—"}
      </div>

      <div className="comment-box">
        <input placeholder="Add comment..." />
      </div>

      {role === "owner" && (
        <>
          <select
            className="status-select"
            value={task.status}
            onChange={(e) => changeTaskStatus(task.id, e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <div className="task-btn-row">
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
