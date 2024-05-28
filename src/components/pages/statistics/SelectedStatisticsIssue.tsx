import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";
import IssueMessage from "../issue/IssueMessage";
import AddActualTimeSpent from "../issue/AddActualTime";

function SelectedStatisticsIssue({ issueId }: { issueId: string }) {
  const [selectedStatisticsIssue, setSelectedStatisticsIssue] =
    useState<IssueInterface | null>(null);

  useEffect(() => {
    fetch(`https://seahorse-app-f89t8.ondigitalocean.app/issue/${issueId}`)
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

  const differens =
    selectedStatisticsIssue.agreedTime -
    selectedStatisticsIssue.actualTimeSpent;
  const differensClass = differens < 0 ? "red" : "green";

  return (
    <>
      <div key={selectedStatisticsIssue.issueId}>
        <h3>
          <u>Namn på issue: </u>
        </h3>
        <h3>{selectedStatisticsIssue.issueName}</h3>
        <p>
          <strong>
            <u>Beskrivning av issue: </u>
          </strong>{" "}
          <br />
          {selectedStatisticsIssue.issueDescription}
        </p>
        <p>
          <strong>
            <u>Issue skapat av: </u>
          </strong>{" "}
          <br />
          {selectedStatisticsIssue.issueCreatedByUserId +
            "/" +
            selectedStatisticsIssue.issueDate.toString()}
        </p>
        <p>
          <strong>
            <u>{"Estimerad tid av medlemmar: "}</u>
          </strong>{" "}
          <br />
          {selectedStatisticsIssue.estimatedTime &&
          selectedStatisticsIssue.estimatedTime.length > 0
            ? selectedStatisticsIssue.estimatedTime.map((estimate, index) => (
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
          {selectedStatisticsIssue.agreedTime === 0
            ? "Ingen överenskommen tid bestämdes"
            : selectedStatisticsIssue.agreedTime + "h"}
        </p>
        <p>
          <strong>
            <u>{"Tid spenderad på issue: "}</u>
          </strong>{" "}
          <br />
          {selectedStatisticsIssue.actualTimeSpent === 0
            ? "Ingen spenderad tid är satt"
            : selectedStatisticsIssue.actualTimeSpent + "h"}
        </p>

        <IssueMessage issueId={selectedStatisticsIssue?.issueId || ""} />
        <AddActualTimeSpent issueId={selectedStatisticsIssue?.issueId || ""} />
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

export default SelectedStatisticsIssue;
