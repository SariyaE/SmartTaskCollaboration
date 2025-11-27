/* ProjectSelection.css - dark purplish gradient theme, centered title and cards */

/* Full-page background */
.project-page {
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(circle at top right, #392042 10%, #0f1113 70%);
  color: #fff;
  font-family: "Inter", sans-serif;
  padding: 28px 36px 60px;
  box-sizing: border-box;
}

/* Topbar: keep title visually centered but allow logout on right */
.project-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

/* Title centered visually; topbar-left used as spacer */
.project-topbar-left { width: 120px; }
.project-topbar-right { width: 120px; display: flex; justify-content: flex-end; }

.project-title {
  margin: 0 auto;
  font-size: 44px;
  font-weight: 700;
  background: linear-gradient(90deg, #3ca2ff, #a066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

/* Logout button */
.logout-btn {
  padding: 10px 16px;
  background: #2f9cff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(50, 120, 200, 0.15);
}

/* Centered welcome + subtitle */
.project-centered {
  text-align: center;
  margin-top: 18px;
}

.welcome-text {
  font-size: 36px;
  font-weight: 700;
  margin: 28px 0 6px;
  color: #fff;
  letter-spacing: -0.5px;
}

.select-text {
  font-size: 26px;
  font-weight: 600;
  margin: 6px 0 26px;
  opacity: 0.9;
}

/* Grid layout: stretch horizontally, centered, with large gaps */
.project-grid {
  display: flex;
  gap: 36px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  margin-top: 8px;
  overflow-x: auto;
  padding: 18px 8px;
}

/* make horizontal scrolling smooth on small screens */
.project-grid::-webkit-scrollbar { height: 8px; }
.project-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 8px; }

/* Project card styling */
.project-card {
  background: rgba(255, 255, 255, 0.04);
  padding: 28px 28px;
  width: 320px;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.02);
  backdrop-filter: blur(8px);
  text-align: left;
  min-width: 320px;
}

/* create-card slightly taller to match screenshot feel */
.create-card { display: flex; flex-direction: column; justify-content: space-between; }

/* Project name */
.project-name {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 18px;
  color: #fff;
}

/* Buttons area */
.project-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Buttons base */
.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  min-width: 88px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}

/* colors */
.blue { background: linear-gradient(90deg,#3ca2ff,#4e74ff); }
.orange { background: linear-gradient(90deg,#ff9f45,#ffb86b); color:#111; }
.red { background: linear-gradient(90deg,#e04b4b,#d9534f); }

/* hover */
.btn:hover { transform: translateY(-2px); transition: transform .12s ease; opacity:0.98; }

/* responsiveness: stack on narrow screens */
@media (max-width: 920px) {
  .project-grid { flex-wrap: wrap; justify-content: center; }
  .project-card { min-width: 280px; width: 280px; }
  .project-title { font-size: 36px; }
  .welcome-text { font-size: 28px; }
  .select-text { font-size: 20px; }
}
