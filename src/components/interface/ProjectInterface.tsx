interface ProjectInterface {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectCreatedByUserId: string;
    usernameInProject: string[];
    projectDate: Date;
    isDone: boolean;
    totalAgreedTime: number;
    totalActualTimeSpent: number;
}

export default ProjectInterface;