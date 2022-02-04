import React from "react";
import { useParams } from "react-router-dom";

const PROJECTS = {
  COLOR_GAME: "color-game",
};

function Project() {
  const params = useParams();
  return <div className="Project">{params.projectName}</div>;
}

export default Project;
