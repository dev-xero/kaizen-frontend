import { Category } from '@/constants/categories';

type Task = {
    id: number | string;
    name: string;
    description: string;
    category: Category;
    isCompleted: boolean;
    createdAt: string; // date string
    dueOn: string | null; // date string
};

export default Task;
