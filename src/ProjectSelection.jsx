import React from "react";
import "../styles/ProjectSelection.css";

const ProjectSelection = ({ username }) => {
  // Mock project list (matches your screenshot)
  const projects = [
    { id: 1, name: "Project 1", actions: ["open", "edit"] },
    { id: 2, name: "Project 2", actions: ["open", "delete"] },
  ];

  return (
    <div className="project-container">
      <button className="logout-btn">Logout</button>

      <h1 className="title">Smart Task Tool</h1>

      <h2 className="welcome">Welcome, {username}</h2>
      <h3 className="select-text">Select a Project</h3>

      <div className="project-grid">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <h3>{proj.name}</h3>

            <div className="btn-row">
              <button className="btn-open">Open</button>

              {proj.actions.includes("edit") && (
                <button className="btn-edit">✏️ Edit</button>
              )}

              {proj.actions.includes("delete") && (
                <button className="btn-delete">Delete</button>
              )}
            </div>
          </div>
        ))}

        {/* Create New Project Card */}
        <div className="project-card create-card">
          <h3>Create New Project</h3>
          <button className="btn-open">Create</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelection;
