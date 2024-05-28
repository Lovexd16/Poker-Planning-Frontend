import React, { useState } from "react";

interface AgreedTimeInterface {
  agreedTime: number;
}

function AddAgreedTime({ issueId }: { issueId: string }) {
  const [newAgreedTime, setNewAgreedTime] = useState<AgreedTimeInterface>({
    agreedTime: 0,
  });

  const agreedTimeForIssue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";

    fetch(`http://localhost:8080/issue/${issueId}/agreedtime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAgreedTime.agreedTime),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte spara överenskommen tid!");
        }

        setNewAgreedTime({
          agreedTime: 0,
        });
      })
      .catch((error) => {
        console.error("Error saving agreed time:", error);
      });
  };

  return (
    <>
      <details>
        <summary>Sätt överenskommen tid</summary>
        <form onSubmit={agreedTimeForIssue}>
          <select
            value={newAgreedTime.agreedTime}
            onChange={(e) =>
              setNewAgreedTime({
                ...newAgreedTime,
                agreedTime: Number(e.target.value),
              })
            }
          >
            <option value={0}>Sätt överenskommen tid</option>
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

export default AddAgreedTime;
