import IssueInterface from "../../interface/IssueInterface";
import { useEffect, useState } from "react";
import SelectedDoneIssue from "./SelectedDoneIssue";

function GetDoneIssues({ projectId }: { projectId: string }) {
  const [issues, setIssues] = useState<IssueInterface[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<IssueInterface | null>(
    null
  );
  const [showIssues, setShowIssues] = useState(true);

  const selectIssue = (issue: IssueInterface) => {
    setSelectedIssue(issue);
    setShowIssues(false);
  };

  const goBack = () => {
    setSelectedIssue(null);
    setShowIssues(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    fetch(
      `https://seahorse-app-f89t8.ondigitalocean.app/issues/${projectId}/inactive`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, [issues, projectId]);

  return (
    <div>
      {showIssues ? (
        <div style={{ maxHeight: "30vh", overflowY: "auto" }}>
          {issues.length > 0 ? (
            issues.map((issue: IssueInterface) => (
              <div key={issue.issueId}>
                <button
                  className="issueButtonss"
                  onClick={() => selectIssue(issue)}
                >
                  {issue.issueName}
                </button>
              </div>
            ))
          ) : (
            <p>Du har inga avklarade issues.</p>
          )}
        </div>
      ) : (
        <>
          <button className="button" onClick={goBack}>
            Gå tillbaka till alla avklarade issues
          </button>
          <SelectedDoneIssue issueId={selectedIssue?.issueId || ""} />
        </>
      )}
    </div>
  );
}

export default GetDoneIssues;
