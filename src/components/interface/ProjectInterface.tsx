import UserInterface from "./UserInterface";
import IssueInterface from "./IssueInterface";

interface ProjectInterface {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectCreatedByUser: UserInterface;
    projectDate: Date;
    isDone: boolean;
    usersInProject: UserInterface[];
    issuesInProject: IssueInterface[];
    totalAgreedTime: number;
    totalActualTimeSpent: number;
}

export default ProjectInterface;