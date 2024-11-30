/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useContext, useEffect, useState } from 'react';
import DroppableColumn from './droppablecolumn';
import Task from '@/types/task.type';
import NewTaskModal from '../newtaskmodal';
import { UserContext } from '@/context/user/user.context';

type TasksState = {
    todo: Task[];
    progress: Task[];
    testing: Task[];
    completed: Task[];
};

export default function KanbanBoard() {
    const { loggedInUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [tasks, setTasks] = useState<TasksState>({
        todo: [],
        progress: [],
        testing: [],
        completed: [],
    });

    // Sort and organize these tasks into their arrays.
    function organizeKanbanTasks(tasks: Task[]) {
        const todo = [];
        const progress = [];
        const testing = [];
        const completed = [];

        for (const task of tasks) {
            // DnD requires id do be a string
            const kanbanTask = {
                ...task,
                id: task.id.toString(),
            };

            switch (task.category) {
                case 'TODO':
                    todo.push(kanbanTask);
                    break;

                case 'IN_PROGRESS':
                    progress.push(kanbanTask);
                    break;

                case 'TESTING':
                    testing.push(kanbanTask);
                    break;

                case 'COMPLETED':
                    completed.push(kanbanTask);
                    break;
            }
        }

        setTasks({ todo, progress, testing, completed });
        setIsLoading(false);
    }

    useEffect(() => {
        if (loggedInUser?.tasks && Array.isArray(loggedInUser.tasks)) {
            organizeKanbanTasks(loggedInUser.tasks);
            setIsLoading(false);
        }
    }, [loggedInUser]);

    function handleDragEnd(result: DropResult) {
        const { source, destination } = result;

        if (!destination || source.droppableId === destination.droppableId) {
            return;
        }

        console.log('Source:', source);
        console.log('Destination:', destination);
        console.log('Tasks State:', tasks);

        setTasks((prevTasks) => {
            const sourceKey = mapDroppableIdToStateKey(source.droppableId);
            const destinationKey = mapDroppableIdToStateKey(
                destination.droppableId
            );

            const sourceTasks = Array.from(prevTasks[sourceKey]);
            const destinationTasks = Array.from(prevTasks[destinationKey]);

            // Find and remove the task from the source
            const [movedTask] = sourceTasks.splice(source.index, 1);

            const updatedTask = {
                ...movedTask,
                category:
                    destination.droppableId.toUpperCase() as Task['category'],
            };

            // Add the task to the destination
            destinationTasks.splice(destination.index, 0, updatedTask);

            return {
                ...prevTasks,
                [sourceKey]: sourceTasks,
                [destinationKey]: destinationTasks,
            };
        });
    }

    // Show nothing while loading
    if (isLoading) {
        return <></>;
    }

    return (
        <section className="my-2">
            {showTaskModal && <NewTaskModal />}
            <DragDropContext onDragEnd={handleDragEnd}>
                <section className="p-4 w-full border border-[#cacbcb] rounded-md bg-white flex gap-2">
                    <DroppableColumn
                        title="To-Do"
                        tasks={tasks['todo']}
                        id="todo"
                    />
                    <DroppableColumn
                        title="In Progress"
                        tasks={tasks['progress']}
                        id="in_progress"
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

// -- UTILITIES -- //

// Ensure proper format especially for "in_progress"
function mapDroppableIdToStateKey(droppableId: string): keyof TasksState {
    switch (droppableId) {
        case 'todo':
            return 'todo';
        case 'in_progress':
            return 'progress';
        case 'testing':
            return 'testing';
        case 'completed':
            return 'completed';

        default:
            return 'todo'; // might consider handling this better.
    }
}
