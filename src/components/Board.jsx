import { useState } from "react";

const initialColumns = {
  todo: {
    title: "To Do",
    tasks: []
  },
  inProgress: {
    title: "In Progress",
    tasks: []
  },
  done: {
    title: "Done",
    tasks: []
  }
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  // ----------------------------
  // ADD TASK
  // ----------------------------
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      comments: []
    };

    setColumns(prev => ({
      ...prev,
      todo: {
        ...prev.todo,
        tasks: [...prev.todo.tasks, newTaskObj]
      }
    }));

    setNewTask("");
  };

  // ----------------------------
  // DELETE TASK
  // ----------------------------
  const handleDeleteTask = (colKey, taskId) => {
    setColumns(prev => ({
      ...prev,
      [colKey]: {
        ...prev[colKey],
        tasks: prev[colKey].tasks.filter(task => task.id !== taskId)
      }
    }));
  };

  // ----------------------------
  // EDIT TASK
  // ----------------------------
  const handleEditTask = (colKey, taskId, newTitle) => {
    setColumns(prev => ({
      ...prev,
      [colKey]: {
        ...prev[colKey],
        tasks: prev[colKey].tasks.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      }
    }));
    setEditingTask(null);
  };

  // ----------------------------
  // ADD COMMENT
  // ----------------------------
  const handleAddComment = (colKey, taskId) => {
    if (!commentInput.trim()) return;

    setColumns(prev => ({
      ...prev,
      [colKey]: {
        ...prev[colKey],
        tasks: prev[colKey].tasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                comments: [...task.comments, commentInput]
              }
            : task
        )
      }
    }));

    setCommentInput("");
  };

  // ----------------------------
  // DRAG AND DROP
  // ----------------------------
  const handleDragStart = (e, task, fromColumn) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, fromColumn }));
  };

  const handleDrop = (e, toColumn) => {
    const { task, fromColumn } = JSON.parse(e.dataTransfer.getData("task"));

    if (fromColumn === toColumn) return;

    setColumns(prev => {
      const newColumns = { ...prev };

      // Remove from old column
      newColumns[fromColumn].tasks = newColumns[fromColumn].tasks.filter(
        t => t.id !== task.id
      );

      // Add to new column
      newColumns[toColumn].tasks = [...newColumns[toColumn].tasks, task];

      return newColumns;
    });
  };

  const allowDrop = e => e.preventDefault();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Task Collaboration Board</h1>

      {/* Add Task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Columns */}
      <div style={{ display: "flex", gap: "20px" }}>
        {Object.entries(columns).map(([key, column]) => (
          <div
            key={key}
            onDrop={e => handleDrop(e, key)}
            onDragOver={allowDrop}
            style={{
              width: "30%",
              padding: "15px",
              background: "#f5f5f5",
              borderRadius: "8px"
            }}
          >
            <h2>{column.title}</h2>

            {/* Task Cards */}
            {column.tasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={e => handleDragStart(e, task, key)}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  background: "white",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >
                {/* Editing Task */}
                {editingTask === task.id ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={task.title}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          handleEditTask(key, task.id, e.target.value);
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        handleEditTask(key, task.id, task.title)
                      }
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <strong>{task.title}</strong>
                    <div style={{ marginTop: "5px" }}>
                      <button onClick={() => setEditingTask(task.id)}>
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "10px", color: "red" }}
                        onClick={() => handleDeleteTask(key, task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}

                {/* Comments */}
                <div style={{ marginTop: "10px" }}>
                  <h4>Comments</h4>
                  {task.comments.map((c, i) => (
                    <p
                      key={i}
                      style={{
                        background: "#eee",
                        padding: "5px",
                        borderRadius: "4px"
                      }}
                    >
                      {c}
                    </p>
                  ))}

                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(key, task.id)}>
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
