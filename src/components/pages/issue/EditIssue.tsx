import React, { useState } from "react";

interface EditIssueInterface {
  issueName: string;
  issueDescription: string;
}

function EditIssue({
  issueId,
  issueName,
  issueDescription,
}: {
  issueId: string;
  issueName: string;
  issueDescription: string;
}) {
  const [newEditIssue, setEditIssue] = useState<EditIssueInterface>({
    issueName: issueName || "",
    issueDescription: issueDescription || "",
  });

  const editIssue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:8080/editissue/${issueId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEditIssue),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte redigera issue!");
        }
        return response.json(); // För att få det uppdaterade svaret
      })
      .then((data) => {
        console.log("Issue updated successfully:", data);
        setEditIssue({
          issueName: "",
          issueDescription: "",
        });
      })
      .catch((error) => {
        console.error("Error editing issue:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Ändra namn & beskrivning</summary>
        <form onSubmit={editIssue}>
          <label>
            Issuenamn
            <br />
            <input
              type="text"
              placeholder={issueName}
              required
              size={30}
              value={newEditIssue.issueName}
              onChange={(e) =>
                setEditIssue({ ...newEditIssue, issueName: e.target.value })
              }
            ></input>
          </label>
          <br />
          <br />
          <label>
            Issuebeskrivning
            <br />
            <textarea
              placeholder={issueDescription}
              required
              style={{ width: "100%", height: "50px" }}
              value={newEditIssue.issueDescription}
              onChange={(e) =>
                setEditIssue({
                  ...newEditIssue,
                  issueDescription: e.target.value,
                })
              }
            ></textarea>
          </label>
          <br />
          <br />
          <button className="issueButtons" type="submit">
            Redigera issue
          </button>
        </form>
      </details>
    </>
  );
}

export default EditIssue;
