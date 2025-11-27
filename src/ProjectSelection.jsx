import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./ProjectSelection.css";

function makeId() {
  return "p-" + Math.random().toString(36).slice(2, 9);
}

export default function ProjectSelection({ user }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("projects");
    const arr = raw
      ? JSON.parse(raw)
      : [
          { id: "p1", name: "Project 1", tasks: [], notifications: [] },
          { id: "p2", name: "Project 2", tasks: [], notifications: [] },
        ];
    setProjects(arr);
  }, []);

  const saveProjects = (updated) => {
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const openProject = (proj) => {
    navigate(`/board/${proj.id}`, { state: { projectId: proj.id } });
  };

  const createProject = () => {
    const name = prompt("New project name:");
    if (!name) return;
    const id = makeId();
    const newProj = { id, name, tasks: [], notifications: [] };
    const updated = [...projects, newProj];
    saveProjects(updated);
  };

  const deleteProject = (id) => {
    if (!window.confirm("Delete this project?")) return;
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
  };

  const renameProject = (id) => {
    const newName = prompt("Edit project name:");
    if (!newName) return;
    const updated = projects.map((p) =>
      p.id === id ? { ...p, name: newName } : p
    );
    saveProjects(updated);
  };

  return (
    <div className="project-page">
      <ToastContainer />

      {/* HEADER: title centered, logout at right */}
      <div className="project-topbar">
        <div className="project-topbar-left" /> {/* empty spacer */}
        <h1 className="project-title">Smart Task Tool</h1>
        <div className="project-topbar-right">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* WELCOME and subtitle centered */}
      <div className="project-centered">
        <h2 className="welcome-text">Welcome, {user?.username || "guest"}</h2>
        <h3 className="select-text">Select a Project</h3>
      </div>

      {/* PROJECT CARDS */}
      <div className="project-grid">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h4 className="project-name">{p.name}</h4>

            <div className="project-buttons">
              <button className="btn blue" onClick={() => openProject(p)}>
                Open
              </button>

              <button className="btn orange" onClick={() => renameProject(p.id)}>
                ✏️ Edit
              </button>

              <button className="btn red" onClick={() => deleteProject(p.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {/* CREATE NEW */}
        <div className="project-card create-card">
          <h4 className="project-name">Create New Project</h4>

          <button className="btn blue" onClick={createProject}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
