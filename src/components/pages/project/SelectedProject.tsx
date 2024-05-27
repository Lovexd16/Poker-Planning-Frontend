import { useState } from "react";
import ProjectInterface from "../../interface/ProjectInterface";
import AboutProject from "./AboutProject";
import GetIssue from "../issue/GetIssue";
import InviteUser from "./InviteUser";
import IsDone from "./IsDone";
import EditProject from "./EditProject";
import NewIssue from "../issue/NewIssue";
import ProjectStatistics from "./ProjectStatistics";
import DeleteProject from "./DeleteProject";
import GetDoneIssues from "../issue/GetDoneIssues";

function SelectedProject({
  projectId,
  selectedProject,
}: {
  projectId: string;
  selectedProject: ProjectInterface | null;
}) {
  const [selectedComponent, setSelectedComponent] = useState<
    "issues" | "doneissues" | "information" | "statistics" | "settings"
  >("issues");

  function handleMenuClick(
    menu: "issues" | "doneissues" | "information" | "statistics" | "settings"
  ) {
    setSelectedComponent(menu);
  }

  if (!selectedProject) {
    return null;
  }

  return (
    <>
      <div className="selectedprojectcontainer">
        <h2>{selectedProject.projectName}</h2>
        <header>
          <button
            className={`button ${
              selectedComponent === "issues" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("issues")}
          >
            Öppna issues
          </button>
          <button
            className={`button ${
              selectedComponent === "doneissues" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("doneissues")}
          >
            Avklarade issues
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
            <GetIssue projectId={projectId} />
            <NewIssue projectId={projectId} />
          </>
        ) : selectedComponent === "doneissues" ? (
          <GetDoneIssues projectId={projectId} />
        ) : selectedComponent === "information" ? (
          <AboutProject projectId={projectId} />
        ) : selectedComponent === "statistics" ? (
          <ProjectStatistics projectId={projectId} />
        ) : (
          <>
            <InviteUser projectId={projectId} />
            <IsDone projectId={projectId} />
            <EditProject
              projectId={projectId}
              projectName={selectedProject?.projectName || ""}
              projectDescription={selectedProject?.projectDescription || ""}
            />
            <DeleteProject projectId={projectId} />
          </>
        )}
      </div>
    </>
  );
}

export default SelectedProject;
