import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";
import IssueMessage from "./IssueMessage";
import IssueIsDone from "./IssueIsDone";

function SelectedIssue({ issueId }: { issueId: string }) {
  const [selectedIssue, setSelectedIssue] = useState<IssueInterface | null>(
    null
  );

  useEffect(() => {
    fetch(`http://localhost:8080/issue/${issueId}`)
      .then((res) => res.json())
      .then((data) => setSelectedIssue(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, []);

  if (!selectedIssue) {
    return <p>Laddar...</p>;
  }

   
    if (!selectedIssue) {
        return <p>Laddar...</p>;
    }

    return (
        <>
            <div key={selectedIssue.issueId}>
                <h2>{selectedIssue.issueName}</h2>
                <p>{selectedIssue.issueDescription}</p>
                <p>{"Estimerad tid av medlemmar: " + selectedIssue.estimatedTime}</p>
                <p>{"Överenskommen tid för issue: " + selectedIssue.agreedTime + "h"}</p>
                <p>{"Tid spenderad för issue: " + selectedIssue.actualTimeSpent + "h"}</p>
                <p>{"Skapat av: " + selectedIssue.issueCreatedByUserId + "/" + selectedIssue.issueDate.toString()}</p>
                <IssueIsDone issueId={selectedIssue?.issueId || ""} />
                <IssueMessage issueId={selectedIssue?.issueId || ""} />
            </div>
        </>
    );

}

export default SelectedIssue;
