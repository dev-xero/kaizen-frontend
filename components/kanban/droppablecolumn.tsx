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
};

function TaskPlaceholder() {
    return (
        <section className="w-full h-[240px] flex items-center justify-center">
            <p className="text-gray-700 text-sm">No tasks here yet.</p>
        </section>
    );
}

export default function DroppableColumn(props: DroppableColumnProps) {
    return (
        <section className="flex flex-col gap-2 w-[300px] flex-shrink-0 font-[family-name:var(--font-geist-sans)]">
            <header className="p-2 flex items-center justify-between text-sm bg-[#ECEDEF] rounded-sm">
                <span>{props.title}</span>
                <span className="text-gray-700 text-xs">
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
                                snapshot.isDraggingOver ? 'bg-blue-100' : ''
                            )}
                        >
                            {props.tasks.length == 0 ? (
                                snapshot.isDraggingOver ? (
                                    <div></div>
                                ) : (
                                    <TaskPlaceholder />
                                )
                            ) : (
                                props.tasks.map((task, idx) => (
                                    <DraggableTask
                                        task={task}
                                        idx={idx}
                                        key={idx}
                                    />
                                ))
                            )}
                        </div>
                        {provided.placeholder}
                    </TasksList>
                )}
            </Droppable>
        </section>
    );
}

const TasksList = forwardRef<HTMLElement, TasksListProps>((props, ref) => {
    return (
        <section
            className="bg-[#ECEDEF] w-full rounded-md p-2"
            ref={ref}
            {...props}
        >
            {props.children}
        </section>
    );
});

TasksList.displayName = 'TasksList';
