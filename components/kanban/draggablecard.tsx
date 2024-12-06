import React, { forwardRef } from 'react';
import Task from '@/types/task.type';
import { Draggable } from '@hello-pangea/dnd';
import clsx from 'clsx';
import { transformISOToPlain } from '@/util/date';

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
                'p-2 mb-2 border border-[#cbd1dd] bg-white rounded-md font-[family-name:var(--font-geist-sans)]',
                isDragging && 'bg-slate-300'
            )}
            {...rest} // Pass draggableProps and dragHandleProps
        >
            <section
                className={clsx(
                    'border-l-[3px] p-2 pl-4',
                    task.category == 'TODO'
                        ? 'border-blue-400'
                        : task.category == 'IN_PROGRESS'
                        ? 'border-orange-400'
                        : task.category == 'TESTING'
                        ? 'border-slate-500'
                        : 'border-green-500'
                )}
            >
                <h4 className="mb-4 text-sm text-gray-700">{props.idx + 1}</h4>
                <h3
                    className={clsx(
                        'text font-bold text-[#12111A] mb-2',
                        task.isCompleted && 'line-through'
                    )}
                >
                    {task.name}
                </h3>
                <p
                    className={clsx(
                        'text-gray-700 text-sm',
                        task.isCompleted && 'line-through'
                    )}
                >
                    {task.description}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                    {task.dueOn && !task.dueOn?.startsWith('9999')
                        ? `Due On: ${transformISOToPlain(task.dueOn)}`
                        : 'No Due Date'}
                </p>
            </section>
        </section>
    );
});

TaskCard.displayName = 'TaskCard';

export default function DraggableTask(props: DraggableTaskProps) {
    return (
        <Draggable
            draggableId={props.task.id as string}
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
