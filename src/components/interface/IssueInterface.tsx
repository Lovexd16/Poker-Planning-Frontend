interface IssueInterface {
    issueId: string;
    issueName: string;
    issueDescription: string;
    issueCreatedByUserId: string;
    issueForProjectId: string;
    issueDate: Date;
    isDone: boolean;
    actualTimeSpent: number;
    agreedTime: number;
    estimatedTime: string[];
    conversation: string[];
}

export default IssueInterface;