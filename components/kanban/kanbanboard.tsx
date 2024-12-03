/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useContext, useEffect, useRef, useState } from 'react';
import DroppableColumn from './droppablecolumn';
import Task from '@/types/task.type';
import NewTaskModal from '../newtaskmodal';
import { UserContext } from '@/context/user/user.context';
import keys from '@/config/keys';
import axios from 'axios';
import env from '@/config/environment';
import NetworkConfig from '@/config/network';
import { getAccessToken } from '@/util/access';
import { debounce } from '@/util/debounce';
import { useUserData } from '@/hooks/useUserData';
import { Category } from '@/constants/categories';
import { DarkSpinner } from '../spinner';

type Credential = {
    id: number;
    username: string;
};

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
    const { isLoading, user } = useUserData();

    const [activeColumn, setActiveColumn] = useState<Category>('TODO');
    const [isOrganizingTasks, setIsOrganizingTasks] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [tasks, setTasks] = useState<TasksState>(defaultTaskState);

    const debouncedUpdateDatabase = useRef(
        debounce(updateTasksInDatabase, 1000)
    ).current;

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
        setIsOrganizingTasks(false);
    }

    // Delay database I/O to improve performance.
    async function updateTasksInDatabase(updatedTasks: TasksState) {
        const credentials: Credential = { id: 0, username: '' };

        try {
            if (!user) {
                const storedUser = localStorage.getItem(keys.userKey);

                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);

                    credentials.id = parsedUser.id;
                    credentials.username = parsedUser.username;
                } else {
                    // TODO: notify the user about the error, then redirect.
                    return;
                }
            }

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

            try {
                const accessToken = await getAccessToken(
                    credentials.id,
                    credentials.username
                );

                if (!accessToken) {
                    throw new Error('Missing access token.');
                }

                const res = await axios.patch(
                    `${env.api}/tasks/personal/${credentials.username}`,
                    {
                        tasks: tasksRequestDTO,
                    },
                    {
                        headers: {
                            ...NetworkConfig.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (res.status == 200) {
                    console.log('database in sync, update successful.');
                    localStorage.setItem(keys.forceUpdateKey, 'true');
                }
            } catch (err) {
                // TODO: notify the user.
                console.error(err);
            }
        } catch (error) {
            console.error('Error updating tasks:', error);
        }
    }

    // Runs every time a drag event is recorded.
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
                movedTask.isCompleted = destination.droppableId == 'completed';

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

            movedTask.isCompleted = destination.droppableId == 'completed';

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

    // Sets the current active modal.
    function showNewTaskModalForId(id: string) {
        console.log('active column set to:', id);
        setShowTaskModal(true);
        setActiveColumn(id.toUpperCase() as Category);
    }

    useEffect(() => {
        // first try to get tasks from loggedInUser
        if (loggedInUser?.tasks && Array.isArray(loggedInUser.tasks)) {
            organizeKanbanTasks(loggedInUser.tasks);
            return;
        }

        // if loggedInUser doesn't have tasks, try to get from localStorage
        const storedUserString = localStorage.getItem(keys.userKey);

        if (storedUserString) {
            try {
                const storedUser = JSON.parse(storedUserString);
                if (storedUser.tasks && Array.isArray(storedUser.tasks)) {
                    organizeKanbanTasks(storedUser.tasks);
                }
            } catch (error) {
                window.location.href = '/auth/login';
            }
        }
    }, [loggedInUser, user, isLoading]);

    // useEffect(() => {
    //     if (showTaskModal) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // }, [showTaskModal]);

    // Show nothing while loading
    if (isLoading || isOrganizingTasks) {
        return (
            <h4 className="text-gray-700 flex gap-2 items-center justify-center">
                <DarkSpinner />
                Getting your tasks.
            </h4>
        );
    }

    return (
        <section className="my-2">
            {showTaskModal && (
                <NewTaskModal active={activeColumn as Category} />
            )}
            <DragDropContext onDragEnd={handleDragEnd}>
                <section className="p-4 w-full border border-[#cacbcb] rounded-md bg-white flex gap-2">
                    <DroppableColumn
                        title="To-Do"
                        tasks={tasks['todo']}
                        id="todo"
                        onNewTaskClicked={(id) => showNewTaskModalForId(id)}
                    />
                    <DroppableColumn
                        title="In Progress"
                        tasks={tasks['progress']}
                        id="in_progress"
                        onNewTaskClicked={(id) => showNewTaskModalForId(id)}
                    />
                    <DroppableColumn
                        title="Testing"
                        tasks={tasks['testing']}
                        id="testing"
                        onNewTaskClicked={(id) => showNewTaskModalForId(id)}
                    />
                    <DroppableColumn
                        title="Completed"
                        tasks={tasks['completed']}
                        id="completed"
                        onNewTaskClicked={(id) => showNewTaskModalForId(id)}
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
