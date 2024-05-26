import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";
import IssueMessage from "../issue/IssueMessage";

function SelectedStatisticsIssue({ issueId }: { issueId: string }) {
  const [selectedStatisticsIssue, setSelectedStatisticsIssue] =
    useState<IssueInterface | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/issue/${issueId}`)
      .then((res) => res.json())
      .then((data) => setSelectedStatisticsIssue(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [selectedStatisticsIssue]);

  if (!selectedStatisticsIssue) {
    return <p>Laddar...</p>;
  }

  if (!selectedStatisticsIssue) {
    return <p>Laddar...</p>;
  }

  return (
    <>
      <div key={selectedStatisticsIssue.issueId}>
        <h2>{selectedStatisticsIssue.issueName}</h2>
        <p>{selectedStatisticsIssue.issueDescription}</p>
        <p>
          {"Estimerad tid av medlemmar: " +
            selectedStatisticsIssue.estimatedTime}
        </p>
        <p>
          {"Överenskommen tid för issue: " +
            selectedStatisticsIssue.agreedTime +
            "h"}
        </p>
        <p>
          {"Tid spenderad på issue: " +
            selectedStatisticsIssue.actualTimeSpent +
            "h"}
        </p>
        <p>
          {"Skapat av: " +
            selectedStatisticsIssue.issueCreatedByUserId +
            "/" +
            selectedStatisticsIssue.issueDate.toString()}
        </p>

        <IssueMessage issueId={selectedStatisticsIssue?.issueId || ""} />
      </div>
    </>
  );
}

export default SelectedStatisticsIssue;
