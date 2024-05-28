import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";
import IssueMessage from "./IssueMessage";
import IssueIsDone from "./IssueIsDone";
import AddAgreedTime from "./AddAgreedTime";
import AddActualTimeSpent from "./AddActualTime";
import EstimateTime from "./EstimateTime";
import DeleteIssue from "./DeleteIssue";
import { jwtDecode } from "jwt-decode";

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

  const token = localStorage.getItem("token") || "";
  const loggedInUser = jwtDecode(token)?.sub || "";
  const userHasEstimated =
    selectedIssue.estimatedTime &&
    selectedIssue.estimatedTime.some((estimate) => {
      const estimateUser = estimate.split(" - ")[1];
      return estimateUser === loggedInUser;
    });
  return (
    <>
      <div className="totalcontainer" key={selectedIssue.issueId}>
        <div className="informationcontainer">
          <h3>
            <u>Namn på issue </u>
          </h3>
          <h3>{selectedIssue.issueName}</h3>
          <p>
            <strong>
              <u>Beskrivning av issue </u>
            </strong>{" "}
            <br />
            {selectedIssue.issueDescription}
          </p>
          <p>
            <strong>
              <u>Issue skapat av </u>
            </strong>{" "}
            <br />
            {selectedIssue.issueCreatedByUserId +
              "/" +
              selectedIssue.issueDate.toString()}
          </p>
          <p>
            <strong>
              <u>Estimerad tid av medlemmar</u>
            </strong>{" "}
            <br />
            {selectedIssue.estimatedTime &&
            selectedIssue.estimatedTime.length > 0
              ? selectedIssue.estimatedTime.map((estimate, index) => (
                  <span key={index}>
                    {index > 0 && <br />}
                    {userHasEstimated || estimate === loggedInUser
                      ? estimate
                      : "Anonym"}
                  </span>
                ))
              : "Inga estimeringar gjorda ännu"}
          </p>
          <p>
            <strong>
              <u>{"Överenskommen tid för issue "}</u>
            </strong>{" "}
            <br />
            {selectedIssue.agreedTime === 0
              ? "Ingen överenskommen tid satt"
              : selectedIssue.agreedTime + "h"}
          </p>
          <p>
            <strong>
              <u>{"Tid spenderad på issue "}</u>
            </strong>{" "}
            <br />
            {selectedIssue.actualTimeSpent === 0
              ? "Ingen spenderad tid är satt"
              : selectedIssue.actualTimeSpent + "h"}
          </p>
        </div>
        <IssueMessage issueId={selectedIssue?.issueId || ""} />
        <div className="choicecontainer">
          <EstimateTime issueId={selectedIssue?.issueId || ""} />
          <br />
          <AddAgreedTime issueId={selectedIssue?.issueId || ""} />
          <br />
          <AddActualTimeSpent issueId={selectedIssue?.issueId || ""} />
          <br />
          <IssueIsDone issueId={selectedIssue?.issueId || ""} />
          <br />
          <DeleteIssue issueId={selectedIssue?.issueId || ""} />
          <br />
        </div>
      </div>
    </>
  );
}

export default SelectedIssue;
