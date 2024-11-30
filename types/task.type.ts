type Task = {
    id: number | string;
    name: string;
    description: string;
    category: "TODO" | "IN_PROGRESS" | "TESTING" | "COMPLETED";
    isCompleted: boolean;
    createdAt: Date;
    dueOn: Date;
};

export default Task;
