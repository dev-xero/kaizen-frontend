import React, { forwardRef } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from '@/types/task.type';
import clsx from 'clsx';
import DraggableTask from './draggablecard';

type TasksListProps = React.HTMLProps<HTMLElement>;

type DroppableColumnProps = {
    title: string;
    tasks: Task[];
    id: string;
    onNewTaskClicked: (id: string) => void;
    onDeleteClicked: (id: string) => void;
};

type NewTaskCardProps = {
    id: string;
    onClick: (id: string) => void;
};

function NewTaskCard({ id, onClick }: NewTaskCardProps) {
    return (
        <section
            className="p-2 border-2 border-dashed border-[#c9ceda] rounded-md cursor-pointer text-center hover:border-gray-500 transition text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:border-zinc-700 dark:hover:border-indigo-400"
            onClick={() => onClick(id)}
        >
            New Task
        </section>
    );
}

function TaskPlaceholder() {
    return (
        <section className="w-full h-[240px] flex items-center justify-center">
            <p className="text-gray-700 text-sm dark:text-gray-400">No tasks here yet.</p>
        </section>
    );
}

export default function DroppableColumn(props: DroppableColumnProps) {
    return (
        <section className="flex flex-col gap-2 w-[300px] flex-shrink-0 font-[family-name:var(--font-geist-sans)]">
            <header className="p-2 flex items-center justify-between text-sm bg-[#ECEDEF] rounded-sm dark:bg-zinc-900">
                <span>{props.title}</span>
                <span className="text-gray-700 text-xs dark:text-indigo-400">
                    {props.tasks.length} Items
                </span>
            </header>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => (
                    <TasksList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div
                            className={clsx(
                                snapshot.isDraggingOver ? 'bg-blue-100 dark:bg-zinc-700' : ''
                            )}
                        >
                            {props.tasks.length == 0 ? (
                                snapshot.isDraggingOver ? (
                                    <div className="w-full h-[140px]"></div>
                                ) : (
                                    <TaskPlaceholder />
                                )
                            ) : (
                                props.tasks.map((task, idx) => (
                                    <DraggableTask
                                        onClick={props.onDeleteClicked}
                                        task={task}
                                        idx={idx}
                                        key={idx}
                                    />
                                ))
                            )}
                        </div>
                        {provided.placeholder}
                        <NewTaskCard
                            id={props.id}
                            onClick={props.onNewTaskClicked}
                        />
                    </TasksList>
                )}
            </Droppable>
        </section>
    );
}

const TasksList = forwardRef<HTMLElement, TasksListProps>((props, ref) => {
    return (
        <section
            className="bg-[#ECEDEF] w-full rounded-md p-2 dark:bg-zinc-900"
            ref={ref}
            {...props}
        >
            {props.children}
        </section>
    );
});

TasksList.displayName = 'TasksList';
