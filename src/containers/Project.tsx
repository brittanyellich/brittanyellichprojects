import React from "react";
import { useParams } from "react-router-dom";
import ColorGame from "./ColorGame/ColorGame";
import FourOhFour from "./404/404";

const PROJECTS = {
  COLOR_GAME: "color-game",
};

const getProject = (projectName: string) => {
  switch (projectName) {
    case PROJECTS.COLOR_GAME:
      return <ColorGame />;
    default:
      return <FourOhFour />;
  }
};

function Project() {
  const params = useParams();
  const projectName = params.projectName
    ? params.projectName
    : "nothing to see here";
  return <div className="Project">{getProject(projectName)}</div>;
}

export default Project;
