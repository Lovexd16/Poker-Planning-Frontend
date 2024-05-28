import { useState } from "react";

function DeleteIssue({ issueId }: { issueId: string }) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const deleteProject = () => {
    const confirmed = window.confirm(
      "Är du säker på att du vill radera det här issuet?"
    );

    const token = localStorage.getItem("token") || "";

    if (confirmed) {
      fetch(`http://localhost:8080/issue/${issueId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Kunde inte radera Issue!");
          }
          setSuccessMessage("Issuet har raderats");
          console.log("Radering lyckats för issue med id: " + issueId);
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          setErrorMessage("Du har redan tagit bort det här Issuet");
        });
    }
  };

  return (
    <>
      <details>
        <summary>Radera Issue</summary>
        <button className="issueButtons" onClick={deleteProject}>
          Radera Issue
        </button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </details>
    </>
  );
}

export default DeleteIssue;
