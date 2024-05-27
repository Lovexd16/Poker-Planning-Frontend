import { useEffect, useState } from "react";
import ProjectInterface from "../../interface/ProjectInterface";

function AboutProject({ projectId }: { projectId: string }) {
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

  return (
    <>
      <div key={selectedProject.projectId}>
        <h2>{selectedProject.projectName}</h2>
        <p>{selectedProject.projectDescription}</p>
        <p>Medlemmar:</p>
        {selectedProject.usernameInProject.map((username) => (
          <p key={username}>{username}</p>
        ))}

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
        <p>
          {"Skapat av: " +
            selectedProject.projectCreatedByUserId +
            "/" +
            selectedProject.projectDate.toString()}
        </p>
      </div>
    </>
  );
}

export default AboutProject;
