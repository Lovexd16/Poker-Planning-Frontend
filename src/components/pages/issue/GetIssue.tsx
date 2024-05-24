import IssueInterface from '../../interface/IssueInterface';
import React, { useEffect, useState } from 'react'
import SelectedIssue from './SelectedIssue';
import EstimateTime from './EstimateTime';

function GetIssue({projectId}: {projectId: string}) {

    const [issues, setIssues] = useState<IssueInterface[]>([])
    const [selectedIssue, setSelectedIssue] = useState<IssueInterface | null>(null);
    const [showIssues, setShowIssues] = useState(true);

    const selectIssue = (issue: IssueInterface) => {
        setSelectedIssue(issue);
        setShowIssues(false);
      };

    const goBack = () => {
        setSelectedIssue(null);
        setShowIssues(true);
    };
    


    useEffect(() =>{

        const token = localStorage.getItem('token') || '';

        fetch(`http://localhost:8080/issues/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setIssues(data));
    },[]);

    return (
        <div>
          <h2>Issues:</h2>
          {showIssues ? (
            <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
              {issues.length > 0 ? (
                issues.map((issue: IssueInterface) =>(
                    <div key={issue.issueId}>
                    <button onClick={() => selectIssue(issue)}>{issue.issueName}</button>
                
                </div>
    
                ))
              ) : (
                <p>Du har inga aktiva issues.</p>
              )}
            </div>
            
          ) : (
            <>
              <button onClick={goBack}>Gå tillbaka till alla issues</button>
              <SelectedIssue issueId={selectedIssue?.issueId || ""} />
              <EstimateTime issueId={selectedIssue?.issueId || ""} />
            </>
          )}
        </div>
      );
}

export default GetIssue