import React from "react";
import "./ProjectSelection.css";

export default function ProjectSelection({
  user,
  onLogout,
  projects,
  openProject,
  deleteProject,
  createProject
}) {
  return (
    <div className="project-page">
      <div className="project-topbar">
        <div className="project-topbar-left"></div>

        <h1 className="project-title">Projects</h1>

        <div className="project-topbar-right">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="project-centered">
        <div className="welcome-text">Welcome, {user?.username}</div>
        <div className="select-text">Select or create a project</div>
      </div>

      <div className="project-grid">
        {projects?.map((proj) => (
          <div className="project-card" key={proj.id}>
            <div className="project-name">{proj.name}</div>

            <div className="project-buttons">
              <button className="btn blue" onClick={() => openProject(proj.id)}>
                Open
              </button>
              <button
                className="btn orange"
                onClick={() => deleteProject(proj.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="project-card create-card">
          <div className="project-name">Create New Project</div>
          <div className="project-buttons">
            <button className="btn red" onClick={createProject}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
