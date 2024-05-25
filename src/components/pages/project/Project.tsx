import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProjectInterface from "../../interface/ProjectInterface";
import SelectedProject from "./SelectedProject";
import './Project.css';


function Project() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [showProjects, setShowProjects] = useState(true);

  const selectProject = (project: ProjectInterface) => {
    setSelectedProject(project);
    setShowProjects(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(`http://localhost:8080/activeprojects/${loggedInUser}`, {
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
    <>
      {showProjects ? (
        <div className="container">
          <details className="details-container" open={true}>
            <summary>Dina aktiva projekt</summary>
            <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
              {projects.length > 0 ? (
                projects.map((project: ProjectInterface) => (
                  <div key={project.projectId}>
                    <button className="button" onClick={() => selectProject(project)}>
                      <p>{project.projectCreatedByUserId + "/" + project.projectName}</p>
                    </button>
                  </div>
                ))
              ) : (
                <p>Du har inga aktiva projekt.</p>
              )}
            </div>
          </details>
        </div>
      ) : (
        <>
          <button className="button" onClick={goBack}>Gå tillbaka till alla projekt</button>
          <SelectedProject projectId={selectedProject?.projectId || ""} selectedProject={selectedProject || null} />
        </>
      )}
    </>
  );
}

export default Project;