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
        <strong>
          <p>
            <u>Medlemmar:</u>
          </p>
        </strong>
        {selectedProject.usernameInProject.map((username) => (
          <p key={username}>{username}</p>
        ))}

        <strong>
          <p>
            {"Skapat av: " +
              selectedProject.projectCreatedByUserId +
              "/" +
              selectedProject.projectDate.toString()}
          </p>
        </strong>
      </div>
    </>
  );
}

export default AboutProject;
