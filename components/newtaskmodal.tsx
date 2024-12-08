import categories, { Category } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, X } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

import { Calendar } from './ui/calendar';
import Modal from './modal';
import Task from '@/types/task.type';

type CategoryMenuProps = {
    defaultCategory: Category;
    selectedOption: Category;
    setSelectedOption: (opt: Category) => void;
};

type NewTaskModalProps = {
    active: Category;
    closeModal: () => void;
    updateTasks: (newTask: Partial<Task>) => void;
};

function CategoryMenu(props: CategoryMenuProps) {
    return (
        <Select
            defaultValue={props.defaultCategory}
            value={props.selectedOption}
            onValueChange={(value) => {
                props.setSelectedOption(value as Category);
            }}
        >
            <SelectTrigger className="w-full shadow-sm focus-visible:border-indigo-500 rounded-md focus:ring-1 focus-visible:ring-1 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-800 dark:focus-visible:ring-indigo-400">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="z-[996]">
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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>(
        props.active as Category
    );
    const [date, setDate] = useState<Date>();
    const [isCompleted, setIsCompleted] = useState(props.active == 'COMPLETED');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (name && description) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, description, date]);

    useEffect(() => {
        if (category == 'COMPLETED') {
            setIsCompleted(true);
        }
    }, [category]);

    function composeTaskSpecification() {
        const newTask: Partial<Task> = {
            name,
            description,
            category,
            isCompleted,
            createdAt: new Date().toISOString(),
            dueOn: date ? date.toISOString() : null,
        };

        props.updateTasks(newTask);

        // Reset states
        setName('');
        setDescription('');
        setDate(undefined);
        setIsCompleted(false);
    }

    return (
        <Modal>
            <div
                className="absolute right-2 top-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer transition-all"
                onClick={props.closeModal}
            >
                <X size={18} />
            </div>

            <h2 className="font-bold text-lg">Add New Task</h2>
            <p className="text-gray-700 mb-4">Add a new task to this column</p>
            <section className="mt-2 flex flex-col gap-2">
                {/* NAME */}
                <Input
                    name="kaizen-name"
                    placeholder="Name"
                    required={true}
                    className={cn(
                        'py-2 dark:border-zinc-800 dark:focus-visible:ring-indigo-400 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                    )}
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />

                {/* DESCRIPTION */}
                <Input
                    name="kaizen-description"
                    placeholder="Description"
                    required={true}
                    className={cn(
                        'dark:border-zinc-800 dark:focus-visible:ring-indigo-400 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                    )}
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                />

                {/* CATEGORY SELECTOR */}
                <CategoryMenu
                    defaultCategory={props.active}
                    selectedOption={category}
                    setSelectedOption={(option) => setCategory(option)}
                />

                {/* DATE PICKER: Due Date */}
                <Popover>
                    <PopoverTrigger asChild className="z-[996]">
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full justify-start text-left font-normal !p-2',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon size={24} className="text-primary" />
                            {date ? format(date, 'PPP') : <span>Due on</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[996]">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* IS COMPLETED SWITCH */}
                <section className="my-2 flex gap-2 items-center">
                    <Switch
                        checked={isCompleted}
                        onCheckedChange={() =>
                            setIsCompleted((prev) => {
                                if (!prev == true) {
                                    setCategory('COMPLETED');
                                }
                                return !prev;
                            })
                        }
                    />
                    <h4>Mark as completed</h4>
                </section>

                {/* ADD TASK BUTTON */}
                <Button
                    name="add-btn"
                    className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600 disabled:opacity-90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default"
                    disabled={isDisabled}
                    onClick={composeTaskSpecification}
                >
                    Add Task
                </Button>
            </section>
        </Modal>
    );
}
