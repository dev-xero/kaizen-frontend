import { FolderOpen } from '@phosphor-icons/react';
import KanbanBoard from './kanban/kanbanboard';

function MyTasksKanbanBoardView() {
    return (
        <section className="my-4 flex gap-4 overflow-x-auto">
            <KanbanBoard />
        </section>
    );
}

export default function MyTasks() {
    return (
        <section className="my-4 font-[family-name:var(--font-geist-sans)]">
            <h2 className="font-bold text-xl sm:text-2xl my-2 flex items-center gap-2 text-[#12111A]">
                <FolderOpen size={32} className="sm:w-8 w-6" />
                <span>My Tasks</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg sm:mt-2">
                Welcome back! These are tasks
                you&apos;ve set to complete for yourself.
            </p>
            <MyTasksKanbanBoardView />
        </section>
    );
}
