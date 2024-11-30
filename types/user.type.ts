import Task from './task.type';

export type User = {
    id: number;
    username: string;
    email: string;
    isEmailVerified: boolean;
    lastActive: Date;
    joinedOn: Date;
    tasks: Task[];
};
