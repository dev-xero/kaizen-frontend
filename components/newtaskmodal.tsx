import { cn } from '@/lib/utils';
import Modal from './modal';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import categories, { Category } from '@/constants/categories';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

type CategoryMenuProps = {
    defaultCategory: Category;
};

type NewTaskModalProps = {
    active: Category;
};

function CategoryMenu({ defaultCategory }: CategoryMenuProps) {
    return (
        <Select defaultValue={defaultCategory}>
            <SelectTrigger className="w-full shadow-sm focus-visible:border-indigo-500 rounded-md focus:ring-1 focus-visible:ring-1 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((category, idx) => (
                    <SelectItem key={idx} value={category.category}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function NewTaskModal(props: NewTaskModalProps) {
    return (
        <Modal>
            <h2 className="font-bold text-lg">Add New Task</h2>
            <p className="text-gray-700 mb-4">Add a new task to this column</p>
            <section className="mt-2 flex flex-col gap-2">
                {/* NAME */}
                <Input
                    name="kaizen-name"
                    placeholder="Name"
                    required={true}
                    className={cn(
                        'py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                    )}
                />

                {/* DESCRIPTION */}
                <Input
                    name="kaizen-description"
                    placeholder="Description"
                    required={true}
                    className={cn(
                        'py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                    )}
                />

                {/* CATEGORY SELECTOR */}
                <CategoryMenu defaultCategory={props.active} />

                {/* IS COMPLETED SWITCH */}
                <section className="my-2 flex gap-2 items-center">
                    <Switch />
                    <h4>Mark as completed</h4>
                </section>

                {/* ADD TASK BUTTON */}
                <Button
                    name="add-btn"
                    className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600 disabled:opacity-90 disabled:cursor-default"
                >Add Task</Button>
            </section>
        </Modal>
    );
}
