import { Category } from '@/constants/categories';
// import { Priority } from '@/constants/priorities';

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
