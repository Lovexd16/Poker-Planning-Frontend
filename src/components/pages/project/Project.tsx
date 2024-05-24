import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import EditProject from "./EditProject";
import IsDone from "./IsDone";
import NewIssue from "../issue/NewIssue";
import GetIssue from "../issue/GetIssue";

import ProjectInterface from "../../interface/ProjectInterface";
import SelectedProject from "./SelectedProject";
import InviteUser from "./InviteUser";
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
    <div>
      {showProjects ? (
        <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          {projects.length > 0 ? (
            projects.map((project: ProjectInterface) => (
              <div key={project.projectId}>
                <button onClick={() => selectProject(project)}>
                  <p>{project.projectName}</p>
                </button>
              </div>
            ))
          ) : (
            <p>Du har inga aktiva projekt.</p>
          )}
        </div>
      ) : (
        <>
          <button onClick={goBack}>Gå tillbaka till alla projekt</button>
          <SelectedProject projectId={selectedProject?.projectId || ""} />
          <InviteUser projectId={selectedProject?.projectId || ""} />
          <IsDone projectId={selectedProject?.projectId || ""} />
          <EditProject projectId={selectedProject?.projectId || ""} projectName={selectedProject?.projectName || ""}
          projectDescription={selectedProject?.projectDescription || ""} />
          <NewIssue projectId={selectedProject?.projectId || ""} />
          <GetIssue projectId={selectedProject?.projectId || ""} />
        </>
      )}
    </div>
  );
}

export default Project;
