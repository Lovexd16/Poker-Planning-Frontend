import { useEffect, useState } from "react";
import IssueInterface from "../../interface/IssueInterface";

function SelectedIssue({issueId}: {issueId: string}) {

    const [selectedIssue, setSelectedIssue] = useState<IssueInterface | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/issue/${issueId}`)
            .then(res => res.json())
            .then(data => setSelectedIssue(data))
            .catch(error => console.error('Error fetching project:', error));
    }, []);

   
    if (!selectedIssue) {
        return <p>Laddar...</p>;
    }

    return (
        <>
            <div key={selectedIssue.issueId}>
                <h2>{selectedIssue.issueName}</h2>
                <p>{selectedIssue.issueDescription}</p>
                <p>{"Estimerad tid av medlemmar: " + selectedIssue.estimatedTime + "h"}</p>
                <p>{"Överenskommen tid för issue: " + selectedIssue.agreedTime + "h"}</p>
                <p>{"Tid spenderad för issue: " + selectedIssue.actualTimeSpent + "h"}</p>
                <p>{"Skapat av: " + selectedIssue.issueCreatedByUser.username + "/" + selectedIssue.issueDate.toString()}</p>
            </div>
        </>
    );
}

export default SelectedIssue;