/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useContext, useEffect, useRef, useState } from 'react';
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
    const defaultTaskState = {
        todo: [],
        progress: [],
        testing: [],
        completed: [],
    };

    const { loggedInUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [tasks, setTasks] = useState<TasksState>(defaultTaskState);

    const debouncedUpdateDatabase = useRef(
        debounce(updateTasksInDatabase, 1000)
    ).current;

    // Delays function calls by some milliseconds.
    function debounce(func: Function, delay: number) {
        let timer: NodeJS.Timeout;
        return (...args: unknown[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }

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
                    kanbanTask.isCompleted = false;
                    todo.push(kanbanTask);
                    break;

                case 'IN_PROGRESS':
                    kanbanTask.isCompleted = false;
                    progress.push(kanbanTask);
                    break;

                case 'TESTING':
                    kanbanTask.isCompleted = false;
                    testing.push(kanbanTask);
                    break;

                case 'COMPLETED':
                    kanbanTask.isCompleted = true;
                    completed.push(kanbanTask);
                    break;
            }
        }

        setTasks({ todo, progress, testing, completed });
        setIsLoading(false);
    }

    // Delay database I/O to improve performance.
    async function updateTasksInDatabase(updatedTasks: TasksState) {
        try {
            // Map-reduce task ids into numbers
            const convertedTasks = Object.entries(updatedTasks).reduce(
                (acc, [key, tasks]) => {
                    acc[key as keyof TasksState] = tasks.map((task) => ({
                        ...task,
                        id: parseInt(task.id as string, 10),
                    }));
                    return acc;
                },
                {} as TasksState
            );

            // Spread everything into a singular array
            const tasksRequestDTO: Task[] = [
                ...convertedTasks.todo,
                ...convertedTasks.progress,
                ...convertedTasks.testing,
                ...convertedTasks.completed,
            ];

            console.log('current tasks state after debounce:', tasksRequestDTO);
            // await fetch('/api/tasks/update', {
            //     method: 'POST',
            //     body: JSON.stringify(updatedTasks),
            //     headers: { 'Content-Type': 'application/json' },
            // });
        } catch (error) {
            console.error('Error updating tasks:', error);
        }
    }

    function handleDragEnd(result: DropResult) {
        const { source, destination } = result;

        // If no destination, do nothing
        if (!destination) {
            return;
        }

        setTasks((prevTasks) => {
            const sourceKey = mapDroppableIdToStateKey(source.droppableId);
            const destinationKey = mapDroppableIdToStateKey(
                destination.droppableId
            );

            const sourceTasks = Array.from(prevTasks[sourceKey]);

            // Dragging within the same column
            if (sourceKey == destinationKey) {
                const [movedTask] = sourceTasks.splice(source.index, 1);

                // Check if dragged to completed and update accordingly
                movedTask.isCompleted = destination.droppableId == "completed"

                sourceTasks.splice(destination.index, 0, movedTask);

                const updatedTasks = {
                    ...prevTasks,
                    [sourceKey]: sourceTasks,
                };

                debouncedUpdateDatabase(updatedTasks);
                return updatedTasks;
            }

            // Dragging to a different column
            const destinationTasks = Array.from(prevTasks[destinationKey]);
            const [movedTask] = sourceTasks.splice(source.index, 1);

            movedTask.isCompleted = destination.droppableId == "completed"

            const updatedTask = {
                ...movedTask,
                category:
                    destination.droppableId.toUpperCase() as Task['category'],
            };

            destinationTasks.splice(destination.index, 0, updatedTask);

            const newTasks = {
                ...prevTasks,
                [sourceKey]: sourceTasks,
                [destinationKey]: destinationTasks,
            };

            debouncedUpdateDatabase(newTasks);

            return newTasks;
        });
    }

    useEffect(() => {
        if (loggedInUser?.tasks && Array.isArray(loggedInUser.tasks)) {
            organizeKanbanTasks(loggedInUser.tasks);
            setIsLoading(false);
        }
    }, [loggedInUser]);

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
