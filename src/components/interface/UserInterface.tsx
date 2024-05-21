interface User {
    userId: string;
    username: string;
    password: string;
    isDeleted: boolean;
    projects: [];
}

export default User;