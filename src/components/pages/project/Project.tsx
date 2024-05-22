import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import ProjectInterface from "../../interface/ProjectInterface";
import NewProject from "./NewProject";
import SelectedProject from "./SelectedProject";

function Project() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);
  const [showProjects, setShowProjects] = useState(true);

  const selectProject = (project: ProjectInterface) => {
    setSelectedProject(project);
    setShowProjects(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(`http://localhost:8080/projects/${loggedInUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [projects]);

  const goBack = () => {
    setSelectedProject(null);
    setShowProjects(true); 
};

  return (
    <div>
      {showProjects ? (
        projects.length > 0 ? (
          projects.map((project: ProjectInterface) => (
            <div key={project.projectId}>
              <button onClick={() => selectProject(project)}>
                {project.projectCreatedByUser.username +
                  "/" +
                  project.projectName}
              </button>
            </div>
          ))
        ) : (
          <p>Du har inga aktiva projekt.</p>
        )
      ) : (
        <>
        <button onClick={goBack}>Gå tillbaka till alla projekt</button>
        <SelectedProject projectId={selectedProject?.projectId || ''} />
        </>
        
      )}
    </div>
  );
}

export default Project;
