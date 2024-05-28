import React, { useState } from "react";

interface EditProject {
  projectName: string;
  projectDescription: string;
}

function EditProject({
  projectId,
  projectName,
  projectDescription,
}: {
  projectId: string;
  projectName: string;
  projectDescription: string;
}) {
  const [newEditProject, setEditProject] = useState<EditProject>({
    projectName: "",
    projectDescription: "",
  });

  const editProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";

    fetch(
      `http://localhost:8080/project/changenameanddescription/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newEditProject }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte redigera projekt!");
        }
        setEditProject({
          projectName: "",
          projectDescription: "",
        });
      })
      .catch((error) => {
        console.error("Error editing project:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Ändra namn & beskrivning</summary>
        <form onSubmit={editProject}>
          <label>
            Projektnamn
            <br />
            <input
              placeholder={projectName}
              className="inputForm"
              type="text"
              required
              size={30}
              value={newEditProject.projectName}
              onChange={(e) =>
                setEditProject({
                  ...newEditProject,
                  projectName: e.target.value,
                })
              }
            ></input>
          </label>
          <br />
          <br />
          <label>
            Projektbeskrivning
            <br />
            <textarea
              placeholder={projectDescription}
              className="inputForm textarea"
              maxLength={124}
              required
              style={{ width: "212px", height: "70px" }}
              value={newEditProject.projectDescription}
              onChange={(e) =>
                setEditProject({
                  ...newEditProject,
                  projectDescription: e.target.value,
                })
              }
            ></textarea>
          </label>
          <br />
          <br />
          <button className="issueButtons" type="submit">
            Redigera projekt
          </button>
        </form>
      </details>
    </>
  );
}

export default EditProject;
