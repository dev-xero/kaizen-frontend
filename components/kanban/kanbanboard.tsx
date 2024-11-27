'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import DroppableColumn from './droppablecolumn';
import Task from '@/types/task.type';

type TasksState = {
    todo: Task[];
    progress: Task[];
    testing: Task[];
    completed: Task[];
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<TasksState>({
        todo: [
            {
                title: 'Finish the DnD component.',
                summary: 'Complete drag and drop implementation.',
                id: '1',
            },
            {
                title: 'Connect this to the backend.',
                summary: 'Implement an api endpoint for updating tasks.',
                id: '2',
            },
        ],
        progress: [],
        testing: [],
        completed: [],
    });

    function handleDragEnd(result: DropResult) {
        const { source, destination } = result;

        if (!destination || source.droppableId === destination.droppableId) {
            return;
        }

        setTasks((prevTasks) => {
            const sourceKey = source.droppableId as keyof TasksState;
            const destinationKey = destination.droppableId as keyof TasksState;

            const sourceTasks = Array.from(prevTasks[sourceKey]);
            const destinationTasks = Array.from(prevTasks[destinationKey]);

            // Find and remove the task from the source
            const [movedTask] = sourceTasks.splice(source.index, 1);

            // Add the task to the destination
            destinationTasks.splice(destination.index, 0, movedTask);

            return {
                ...prevTasks,
                [source.droppableId]: sourceTasks,
                [destination.droppableId]: destinationTasks,
            };
        });
    }

    return (
        <section className="my-2">
            <DragDropContext onDragEnd={handleDragEnd}>
                <section className="p-4 w-full border border-[#D4D5D6] rounded-md bg-white flex gap-2">
                    <DroppableColumn
                        title="To-Do"
                        tasks={tasks['todo']}
                        id="todo"
                    />
                    <DroppableColumn
                        title="In Progress"
                        tasks={tasks['progress']}
                        id="progress"
                    />
                    <DroppableColumn
                        title="Testing"
                        tasks={tasks['testing']}
                        id="testing"
                    />
                    <DroppableColumn
                        title="Completed"
                        tasks={tasks['completed']}
                        id="completed"
                    />
                </section>
            </DragDropContext>
        </section>
    );
}
