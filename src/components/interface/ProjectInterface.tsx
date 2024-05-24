interface ProjectInterface {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectCreatedByUserId: string;
    projectDate: Date;
    isDone: boolean;
    userIdInProject: string[];
    issueIdInProject: string[];
    totalAgreedTime: number;
    totalActualTimeSpent: number;
}

export default ProjectInterface;