import { useState } from "react";

interface IsDone {
  isDone: boolean;
}

function IssueIsDone({ issueId }: { issueId: string }) {
  const [newIsDone, setNewIsDone] = useState<IsDone>({
    isDone: false,
  });

  const markAsDone = () => {
    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:8080/issue/${issueId}/isdone`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newIsDone }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte markera klart issue!");
        }
        setNewIsDone({
          isDone: false,
        });
      })
      .catch((error) => {
        console.error("Error mark as issue done:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Markera issue som klar</summary>
        <button className="issueButtons" onClick={markAsDone}>
          Markera som klar
        </button>
      </details>
    </>
  );
}

export default IssueIsDone;
