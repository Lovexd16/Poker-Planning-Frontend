import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProjectInterface from "../../interface/ProjectInterface";
import SelectedProject from "./SelectedProject";
import './Project.css';


interface Props {
  setPage: (page: string) => void;
  setIsProjectSelected: (value: boolean) => void;
}


function Project({ setPage, setIsProjectSelected }: Props) {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [showProjects, setShowProjects] = useState(true);

  const selectProject = (project: ProjectInterface) => {
    setSelectedProject(project);
    setShowProjects(false);
    setIsProjectSelected(true); // <-- Moved setIsProjectSelected here
    setPage('selectedproject');
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


  
  return (
    <>
      <div className="container">
        <details className="details-container" open={true}>
          <summary>Dina aktiva projekt</summary>
          <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
            {projects.length > 0 ? (
              projects.map((project: ProjectInterface) => (
                <div key={project.projectId}>
                  <button className="button" onClick={() => {
                    selectProject(project);
                  }}>
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
      {selectedProject && ( 
        <SelectedProject projectId={selectedProject.projectId} selectedProject={selectedProject} />
      )}
    </>
  );
}

export default Project;