import { useState } from "react";
import AboutProject from "../project/AboutProject";
import GetStatisticsIssue from "./GetStatisticsIssue";
import ProjectStatistics from "../project/ProjectStatistics";
import DeleteProject from "../project/DeleteProject";

function SelectedStatisticsProject({ projectId }: { projectId: string }) {
  const [selectedComponent, setSelectedComponent] = useState<
    "issues" | "information" | "statistics" | "settings"
  >("issues");

  function handleMenuClick(menu: "issues" | "information" | "statistics" | "settings") {
    setSelectedComponent(menu);
  }

  return (
    <>
      <div className="selectedprojectcontainer">
        <header>
          <button
            className={`button ${
              selectedComponent === "issues" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("issues")}
          >
            Issues
          </button>
          <button
            className={`button ${
              selectedComponent === "information" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("information")}
          >
            Information
          </button>
          <button
            className={`button ${
              selectedComponent === "statistics" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("statistics")}
          >
            Statistik
          </button>
          <button
            className={`button ${
              selectedComponent === "settings" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("settings")}
          >
            Inställningar
          </button>
        </header>
        {selectedComponent === "issues" ? (
          <>
            <GetStatisticsIssue projectId={projectId} />
          </>
        ) : selectedComponent === "information" ? (
          <AboutProject projectId={projectId} />

        ) : selectedComponent === "statistics" ? (
          <ProjectStatistics projectId={projectId} />

      ) : (
        <>
            <DeleteProject projectId={projectId} 
            />
        </>
    )}
</div>
</>
  );
}

export default SelectedStatisticsProject;
