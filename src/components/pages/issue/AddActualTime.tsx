import React, { useState } from "react";

interface ActualTimeSpentInterface {
  actualTimeSpent: number;
}

function AddActualTimeSpent({ issueId }: { issueId: string }) {
  const [newActualTimeSpent, setNewActualTimeSpent] =
    useState<ActualTimeSpentInterface>({
      actualTimeSpent: 0,
    });

  const actualTimeSpentForIssue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:8080/issue/${issueId}/actualTimeSpent`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newActualTimeSpent.actualTimeSpent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte spara den egentliga tiden!");
        }

        setNewActualTimeSpent({
          actualTimeSpent: 0,
        });
      })
      .catch((error) => {
        console.error("Error saving actual time:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Hur långt tid tog issuet egentligen?</summary>
        <form onSubmit={actualTimeSpentForIssue}>
          <select
            value={newActualTimeSpent.actualTimeSpent}
            onChange={(e) =>
              setNewActualTimeSpent({
                ...newActualTimeSpent,
                actualTimeSpent: Number(e.target.value),
              })
            }
          >
            <option value={0}>Sätt egentlig tid tid</option>
            <option value={1}>1h</option>
            <option value={2}>2h</option>
            <option value={4}>4h</option>
            <option value={8}>8h</option>
          </select>
          <button className="issueButtons" type="submit">
            Sätt tid!
          </button>
        </form>
      </details>
    </>
  );
}

export default AddActualTimeSpent;
