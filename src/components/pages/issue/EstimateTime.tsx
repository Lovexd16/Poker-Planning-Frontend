import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";

interface EstimateTimeInterface {
  estimatedTime: number;
}

function EstimateTime({ issueId }: { issueId: string }) {
  const [newEstimation, setNewEstimation] = useState<EstimateTimeInterface>({
    estimatedTime: 0,
  });

  const estimateTime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(
      `https://seahorse-app-f89t8.ondigitalocean.app/issue/${issueId}/${loggedInUser}/estimatedTime`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEstimation.estimatedTime),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte estimera!");
        }

        setNewEstimation({
          estimatedTime: 0,
        });
      })
      .catch((error) => {
        console.error("Error estimate:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Planning Poker för issue</summary>
        <form onSubmit={estimateTime}>
          <select
            value={newEstimation.estimatedTime}
            onChange={(e) =>
              setNewEstimation({
                ...newEstimation,
                estimatedTime: Number(e.target.value),
              })
            }
          >
            <option value={0}>Välj tid</option>
            <option value={1}>1h</option>
            <option value={2}>2h</option>
            <option value={4}>4h</option>
            <option value={8}>8h</option>
          </select>
          <button className="issueButtons" type="submit">
            Estimera!
          </button>
        </form>
      </details>
    </>
  );
}

export default EstimateTime;
