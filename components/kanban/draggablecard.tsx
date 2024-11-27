import React, { forwardRef } from 'react';
import Task from '@/types/task.type';
import { Draggable } from '@hello-pangea/dnd';
import clsx from 'clsx';

type TaskCardProps = {
    task: Task;
    idx: number;
    isDragging?: boolean;
} & React.HTMLProps<HTMLElement>;

type DraggableTaskProps = {
    task: Task;
    idx: number;
};

const TaskCard = forwardRef<HTMLElement, TaskCardProps>((props, ref) => {
    const { task, isDragging, ...rest } = props; // Extract props to avoid passing unwanted ones
    return (
        <section
            ref={ref}
            className={clsx(
                'p-4 mb-2 border border-[#cbd1dd] bg-white rounded-md font-[family-name:var(--font-geist-sans)]',
                isDragging && 'bg-slate-300'
            )}
            {...rest} // Pass draggableProps and dragHandleProps
        >
            <h4 className="mb-4 text-sm text-gray-700">{props.idx+1}</h4>
            <h3 className="text font-bold text-[#12111A] mb-2">
                {task.title}
            </h3>
            <p className="text-gray-700 text-sm">{task.summary}</p>
        </section>
    );
});

TaskCard.displayName = 'TaskCard';

export default function DraggableTask(props: DraggableTaskProps) {
    return (
        <Draggable
            draggableId={props.task.id}
            key={props.task.id}
            index={props.idx}
        >
            {(provided, snapshot) => (
                <TaskCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    task={props.task}
                    idx={props.idx}
                />
            )}
        </Draggable>
    );
}
