import { useState } from "react";
import AboutProject from "../project/AboutProject";
import GetStatisticsIssue from "./GetStatisticsIssue";

function SelectedStatisticsProject({ projectId }: { projectId: string }) {
  const [selectedComponent, setSelectedComponent] = useState<
    "issues" | "information" | "settings"
  >("issues");

  function handleMenuClick(menu: "issues" | "information" | "settings") {
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default SelectedStatisticsProject;
