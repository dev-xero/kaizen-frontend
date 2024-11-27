import { FolderOpen } from '@phosphor-icons/react';
import KanbanBoard from './kanban/kanbanboard';

function MyTasksKanbanBoardView() {
    return (
        <section className="my-4">
            <KanbanBoard />
        </section>
    );
}

export default function MyTasks() {
    return (
        <section className="my-4 font-[family-name:var(--font-geist-sans)]">
            <h2 className="font-bold text-2xl my-2 flex items-center gap-2 text-[#12111A]">
                <FolderOpen size={32} />
                <span>My Tasks</span>
            </h2>
            <p className="text-gray-700 text-lg mt-2">
                These are tasks you&apos;ve set to complete for yourself.
            </p>
            <MyTasksKanbanBoardView />
        </section>
    );
}
