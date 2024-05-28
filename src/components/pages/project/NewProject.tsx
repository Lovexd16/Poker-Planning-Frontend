import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import NewProjectInterface from "../../interface/NewProjectInterface";
import "./Project.css";

interface Props {
  setPage: (page: string) => void;
}

function NewProject({ setPage }: Props) {
  const [newProject, setNewProject] = useState<NewProjectInterface>({
    projectName: "",
    projectDescription: "",
  });

  const saveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(
      `https://seahorse-app-f89t8.ondigitalocean.app/project/${loggedInUser}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProject,
          projectCreatedByUser: { userId: loggedInUser },
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte spara projekt!");
        }
        setPage("project");
        console.log(loggedInUser);
        setNewProject({
          projectName: "",
          projectDescription: "",
        });
      })
      .catch((error) => {
        console.error("Error saving project:", error);
      });
  };

  return (
    <div>
      <h3>Nytt Projekt</h3>
      <form onSubmit={saveProject}>
        <label>
          Projektnamn
          <br />
          <input
            className="inputForm"
            type="text"
            required
            size={30}
            value={newProject.projectName}
            onChange={(e) =>
              setNewProject({ ...newProject, projectName: e.target.value })
            }
          ></input>
        </label>
        <br />
        <br />
        <label>
          Projektbeskrivning
          <br />
          <textarea
            className="inputForm textarea"
            maxLength={124}
            required
            style={{ width: "212px", height: "70px" }}
            value={newProject.projectDescription}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                projectDescription: e.target.value,
              })
            }
          ></textarea>
        </label>
        <br />
        <br />
        <button className="button" type="submit">
          Skapa projekt
        </button>
      </form>
    </div>
  );
}

export default NewProject;
