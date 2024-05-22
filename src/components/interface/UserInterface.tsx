import ProjectInterface from "./ProjectInterface";

interface UserInterface {
    userId: string;
    username: string;
    password: string;
    isDeleted: boolean;
    projects: ProjectInterface[];
}

export default UserInterface;