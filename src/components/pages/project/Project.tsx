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
    setIsProjectSelected(true); 
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
  
      {showProjects && (
        
        <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <h2>Aktiva projekt:</h2>
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
      )}
      <div>  
        {selectedProject && ( 
          <SelectedProject projectId={selectedProject.projectId} selectedProject={selectedProject} />
        )}
      </div>
    </>
  );
}


export default Project;