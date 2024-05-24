import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import ProjectInterface from "../../interface/ProjectInterface";

function Statistics() {
  const [inactiveProjects, setInactiveProjects] = useState<ProjectInterface[]>(
    []
  );

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
      .then((data) => {
        setInactiveProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching inactive projects:", error);
      });
  }, []);

  return (
    <div>
      <h2>Inactive Projects</h2>
      {inactiveProjects.length > 0 ? (
        <ul>
          {inactiveProjects.map((project: ProjectInterface) => (
            <li key={project.projectId}>{project.projectName}</li>
          ))}
        </ul>
      ) : (
        <p>You have no inactive projects.</p>
      )}
    </div>
  );
}

export default Statistics;
