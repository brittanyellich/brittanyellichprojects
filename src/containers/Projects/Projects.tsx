import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import "./Projects.scss";

function Projects() {
  const navigate = useNavigate();
  return (
    <div className="projects">
      <Button text="Color Game" onClick={() => navigate("/color-game")} />
      <Button text="Habit Tracker" onClick={() => navigate("/habit-tracker")} />
    </div>
  );
}

export default Projects;
