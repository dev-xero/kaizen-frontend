import { Category } from '@/constants/categories';
import { Priority } from '@/constants/priorities';

type Task = {
    id: number | string;
    name: string;
    description: string;
    category: Category;
    isCompleted: boolean;
    createdAt: Date;
    dueOn: Date | null;
    priority?: Priority
};

export default Task;
