import { useState } from "react";
import NewIssueInterface from "../../interface/NewIssueInterface";
import { jwtDecode } from "jwt-decode";

function Issue({ projectId }: { projectId: string }) {
  const [newIssue, setNewIssue] = useState<NewIssueInterface>({
    issueName: "",
    issueDescription: "",
  });

  const saveIssue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(`http://localhost:8080/issue/${loggedInUser}/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newIssue,
        issueCreatedByUser: { userId: loggedInUser },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte spara issue!");
        }

        console.log(projectId);
        setNewIssue({
          issueName: "",
          issueDescription: "",
        });
      })
      .catch((error) => {
        console.error("Error saving issue:", error);
      });
  };

  return (
    <div>
      <details>
        <summary>Lägg till issue</summary>
        <form onSubmit={saveIssue}>
          <label>
            Issuenamn
            <br />
            <input
              className="inputForm"
              type="text"
              required
              size={30}
              value={newIssue.issueName}
              onChange={(e) =>
                setNewIssue({ ...newIssue, issueName: e.target.value })
              }
            ></input>
          </label>
          <br />
          <br />
          <label>
            Issuebeskrivning
            <br />
            <textarea
              className="inputForm textarea"
              maxLength={124}
              required
              style={{ width: "212px", height: "70px" }}
              value={newIssue.issueDescription}
              onChange={(e) =>
                setNewIssue({ ...newIssue, issueDescription: e.target.value })
              }
            ></textarea>
          </label>
          <br />
          <br />
          <button className="issueButtons" type="submit">
            Skapa issue
          </button>
        </form>
      </details>
    </div>
  );
}

export default Issue;
