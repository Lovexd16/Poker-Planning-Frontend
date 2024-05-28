import IssueInterface from "../../interface/IssueInterface";
import { useEffect, useState } from "react";
import SelectedStatisticsIssue from "./SelectedStatisticsIssue";

function GetIssue({ projectId }: { projectId: string }) {
  const [issues, setIssues] = useState<IssueInterface[]>([]);
  const [selectedStatisticsIssue, setSelectedStatisticsIssue] =
    useState<IssueInterface | null>(null);
  const [showIssues, setShowIssues] = useState(true);

  const selectIssue = (issue: IssueInterface) => {
    setSelectedStatisticsIssue(issue);
    setShowIssues(false);
  };

  const goBack = () => {
    setSelectedStatisticsIssue(null);
    setShowIssues(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    fetch(
      `https://seahorse-app-f89t8.ondigitalocean.app/issues/${projectId}/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, [issues]);

  return (
    <div>
      <h2>Oavklarade issues som fanns i det här projektet</h2>
      {showIssues ? (
        <div style={{ maxHeight: "30vh", overflowY: "auto" }}>
          {issues.length > 0 ? (
            issues.map((issue: IssueInterface) => (
              <div key={issue.issueId}>
                <button className="button" onClick={() => selectIssue(issue)}>
                  {issue.issueName}
                </button>
              </div>
            ))
          ) : (
            <p>Du hade inga oavklarade issues för detta projektet.</p>
          )}
        </div>
      ) : (
        <>
          <button className="issueButtons" onClick={goBack}>
            Gå tillbaka till alla issues
          </button>
          <SelectedStatisticsIssue
            issueId={selectedStatisticsIssue?.issueId || ""}
          />
        </>
      )}
    </div>
  );
}

export default GetIssue;
