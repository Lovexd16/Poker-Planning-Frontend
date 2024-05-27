import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProjectInterface from "../../interface/ProjectInterface";
import SelectedStatisticsProject from "./SelectedStatisticsProject";

function Statistics() {
  const [inactiveProjects, setInactiveProjects] = useState<ProjectInterface[]>(
    []
  );
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

    fetch(`http://localhost:8080/inactiveprojects/${loggedInUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setInactiveProjects(data))
      .catch((error) => {
        console.error("Error fetching inactive projects:", error);
      });
  }, []);

  const goBack = () => {
    setSelectedProject(null);
    setShowProjects(true);
  };

  return (
    <>
      {showProjects ? (
        <div>
          <details  open={true}>
            <summary>Dina avklarade projekt</summary>
            <div style={{ maxHeight: "30vh", overflowY: "auto" }}>
              {inactiveProjects.length > 0 ? (
                inactiveProjects.map((project: ProjectInterface) => (
                  <div key={project.projectId}>
                    <button
                      className="button"
                      onClick={() => selectProject(project)}
                    >
                      <p>
                        {project.projectCreatedByUserId +
                          "/" +
                          project.projectName}
                      </p>
                    </button>
                  </div>
                ))
              ) : (
                <p>Du har inga inaktiva projekt.</p>
              )}
            </div>
          </details>
        </div>
      ) : (
        <>
          <button className="button" onClick={goBack}>
            Gå tillbaka till alla avklarade projekt
          </button>
          <SelectedStatisticsProject
            projectId={selectedProject?.projectId || ""}
          />
        </>
      )}
    </>
  );
}

export default Statistics;
