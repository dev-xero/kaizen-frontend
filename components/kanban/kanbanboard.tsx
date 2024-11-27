'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
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

    function handleDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;

        // Ignore moving to the same column or invalid destination
        if (!destination || source.droppableId == destination.droppableId) {
            return;
        }

        // Remove this task from its current state
        deletePreviousBoardState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [
            ...todoTasks,
            ...inProgressTasks,
            ...testingTasks,
            ...completedTasks,
        ]) as Task;

        // Update board state
        setNewBoardState(destination.droppableId, task);
    }

    // -- UTILITIES -- //

    function deletePreviousBoardState(
        sourceDroppableId: string,
        taskId: string
    ) {
        switch (sourceDroppableId) {
            case 'todo':
                setTodoTasks(removeItemById(taskId, todoTasks));
                break;

            case 'in-progress':
                setInprogressTasks(removeItemById(taskId, inProgressTasks));
                break;

            case 'testing':
                setTestingTasks(removeItemById(taskId, testingTasks));
                break;

            case 'completed':
                setCompletedTasks(removeItemById(taskId, completedTasks));
                break;
        }
    }

    function setNewBoardState(destinationDroppableId: string, task: Task) {
        switch (destinationDroppableId) {
            case 'todo':
                setTodoTasks([task, ...todoTasks]);
                break;

            case 'in-progress':
                setInprogressTasks([task, ...inProgressTasks]);
                break;

            case 'testing':
                setTestingTasks([task, ...testingTasks]);
                break;

            case 'completed':
                setCompletedTasks([task, ...completedTasks]);
                break;
        }
    }

    function findItemById(id: string, tasks: Task[]) {
        return tasks.find((item) => item.id == id);
    }

    function removeItemById(id: string, tasks: Task[]) {
        return tasks.filter((item) => item.id != id);
    }

    // -- UTILITIES -- //

    return (
        <section className="my-2">
            <DragDropContext onDragEnd={handleDragEnd}>
                <section className="p-4 w-full border border-[#D4D5D6] rounded-md bg-white flex gap-2">
                    <DroppableColumn
                        title="To-Do"
                        tasks={todoTasks}
                        id="todo"
                    />
                    <DroppableColumn
                        title="In Progress"
                        tasks={inProgressTasks}
                        id="in-progress"
                    />
                    <DroppableColumn
                        title="Testing"
                        tasks={testingTasks}
                        id="testing"
                    />
                    <DroppableColumn
                        title="Completed"
                        tasks={completedTasks}
                        id="completed"
                    />
                </section>
            </DragDropContext>
        </section>
    );
}
