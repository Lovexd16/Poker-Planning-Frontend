import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";
import IssueMessage from "./IssueMessage";
import AddActualTimeSpent from "./AddActualTime";

function SelectedIssue({ issueId }: { issueId: string }) {
  const [selectedIssue, setSelectedIssue] = useState<IssueInterface | null>(
    null
  );

  useEffect(() => {
    fetch(`http://localhost:8080/issue/${issueId}`)
      .then((res) => res.json())
      .then((data) => setSelectedIssue(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [issueId, selectedIssue]);

  if (!selectedIssue) {
    return <p>Laddar...</p>;
  }

  if (!selectedIssue) {
    return <p>Laddar...</p>;
  }

  const differens = selectedIssue.agreedTime - selectedIssue.actualTimeSpent;
  const differensClass = differens < 0 ? "red" : "green";

  return (
    <>
      <div key={selectedIssue.issueId}>
        <h3>
          <u>Namn på issue: </u>
        </h3>
        <h3>{selectedIssue.issueName}</h3>
        <p>
          <strong>
            <u>Beskrivning av issue: </u>
          </strong>{" "}
          <br />
          {selectedIssue.issueDescription}
        </p>
        <p>
          <strong>
            <u>Issue skapat av: </u>
          </strong>{" "}
          <br />
          {selectedIssue.issueCreatedByUserId +
            "/" +
            selectedIssue.issueDate.toString()}
        </p>
        <p>
          <strong>
            <u>{"Estimerad tid av medlemmar: "}</u>
          </strong>{" "}
          <br />
          {selectedIssue.estimatedTime && selectedIssue.estimatedTime.length > 0
            ? selectedIssue.estimatedTime.map((estimate, index) => (
                <span key={index}>
                  {index > 0 && <br />} {estimate}
                </span>
              ))
            : "Inga estimeringar gjordes"}
        </p>
        <p>
          <strong>
            <u>{"Överenskommen tid för issue: "}</u>
          </strong>{" "}
          <br />
          {selectedIssue.agreedTime === 0
            ? "Ingen överenskommen tid bestämdes"
            : selectedIssue.agreedTime + "h"}
        </p>
        <p>
          <strong>
            <u>{"Tid spenderad på issue: "}</u>
          </strong>{" "}
          <br />
          {selectedIssue.actualTimeSpent === 0
            ? "Ingen spenderad tid är satt"
            : selectedIssue.actualTimeSpent + "h"}
        </p>

        <IssueMessage issueId={selectedIssue?.issueId || ""} />
        <AddActualTimeSpent issueId={selectedIssue?.issueId || ""} />
      </div>
      <div className="differenscontainer">
        <p>
          Differens mellan estimerad tid och spenderad tid för det här issuet:
        </p>
        <p className={`differens ${differensClass}`}>{differens + "h"}</p>
      </div>
    </>
  );
}

export default SelectedIssue;
