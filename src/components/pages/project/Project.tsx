import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import ProjectInterface from "../../interface/ProjectInterface";


function Project() {

  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);

  const selectProject = (project: ProjectInterface) =>{
    setSelectedProject(project)
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(`http://localhost:8080/projects/${loggedInUser}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setProjects(data));
  }, [projects]);

  return (
    <div>
      <h2>Projekt:</h2>
      {projects.map((project: ProjectInterface) =>(
          <div key={project.projectId}>
          <button onClick={() => selectProject(project)}>{project.projectName}</button>
          </div>
      ))}
    </div>
  )
}

export default Project;
