import { Category } from '@/constants/categories';

type Task = {
    id: number | string;
    name: string;
    description: string;
    category: Category;
    isCompleted: boolean;
    createdAt: Date;
    dueOn: Date;
};

export default Task;
