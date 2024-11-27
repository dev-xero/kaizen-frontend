'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { useState } from 'react';
import DroppableColumn from './droppablecolumn';
import Task from '@/types/task.type';

export default function KanbanBoard() {
    const [todoTasks, setTodoTasks] = useState<Task[]>([
        {
            title: 'Finish the DnD component.',
            summary: 'Finish implementing DnD component.',
            id: '1',
        },
        {
            title: 'Connect this to the backend.',
            summary: 'Implement the get tasks endpoint.',
            id: '2',
        },
    ]);
    const [inProgressTasks, setInprogressTasks] = useState<Task[]>([]);
    const [testingTasks, setTestingTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    return (
        <section className="my-2">
            <DragDropContext onDragEnd={() => {}}>
                <section className="p-4 w-full border border-[#D4D5D6] rounded-md bg-white flex gap-2">
                    <DroppableColumn
                        title="To-Do"
                        tasks={todoTasks}
                        id={'todo'}
                    />
                    <DroppableColumn
                        title="In Progress"
                        tasks={inProgressTasks}
                        id={'in-progress'}
                    />
                    <DroppableColumn
                        title="Testing"
                        tasks={testingTasks}
                        id={'testing'}
                    />
                    <DroppableColumn
                        title="Completed"
                        tasks={completedTasks}
                        id={'completed'}
                    />
                </section>
            </DragDropContext>
        </section>
    );
}
