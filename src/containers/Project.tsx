import React from "react";
import { useParams } from "react-router-dom";
import ColorGame from "./ColorGame/ColorGame";
import ColorGameAccessible from "./ColorGameAccessible/ColorGameAccessible";
import ColorGameAccessibleDemo from "./ColorGameAccessibleDemo/ColorGameAccessibleDemo";
import HabitTracker from "./HabitTracker/HabitTracker";
import FourOhFour from "./404/404";

const PROJECTS = {
  COLOR_GAME: "color-game",
  HABIT_TRACKER: "habit-tracker",
  COLOR_GAME_ACCESSIBLE: "color-game-accessible",
  COLOR_GAME_ACCESSIBLE_DEMO: "color-game-accessible-demo",
};

const getProject = (projectName: string) => {
  switch (projectName) {
    case PROJECTS.COLOR_GAME:
      return <ColorGame />;
    case PROJECTS.COLOR_GAME_ACCESSIBLE:
      return <ColorGameAccessible />;
    case PROJECTS.COLOR_GAME_ACCESSIBLE_DEMO:
      return <ColorGameAccessibleDemo />;
    case PROJECTS.HABIT_TRACKER:
      return <HabitTracker />;
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
