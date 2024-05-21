import UserInterface from "./UserInterface";
import ProjectInterface from "./ProjectInterface";

interface IssueInterface {
    issueId: string;
    issueName: string;
    issueDescription: string;
    issueCreatedByUser: UserInterface;
    issueForProject: ProjectInterface;
    issueDate: Date;
    isDone: boolean;
    actualTimeSpent: number;
    agreedTime: number;
    estimatedTime: string[];
    conversation: string[];
}

export default IssueInterface;