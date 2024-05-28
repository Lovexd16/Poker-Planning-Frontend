import { useEffect, useState } from "react";
import ProjectInterface from "../../interface/ProjectInterface";

function ProjectStatistics({ projectId }: { projectId: string }) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/project/${projectId}`)
      .then((res) => res.json())
      .then((data) => setSelectedProject(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [projectId]);

  if (!selectedProject) {
    return <p>Laddar...</p>;
  }

  const differens =
    selectedProject.totalAgreedTime - selectedProject.totalActualTimeSpent;
  const differensClass = differens < 0 ? "red" : "green";

  return (
    <>
      <div key={selectedProject.projectId}>
        <p>
          {"Total estimerad tid för projekt: " +
            selectedProject.totalAgreedTime +
            "h"}
        </p>
        <p>
          {"Total spenderad tid för projekt: " +
            selectedProject.totalActualTimeSpent +
            "h"}
        </p>

        <div className="differenscontainer">
          <p>Differens mellan estimerad tid och spenderad tid för projektet:</p>
          <p className={`differens ${differensClass}`}>{differens + "h"}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectStatistics;
