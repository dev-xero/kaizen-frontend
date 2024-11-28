import Modal from './modal';

export default function NewTaskModal() {
    return (
        <Modal>
            <h2 className="font-bold text-lg">Add task</h2>
            <p className="text-gray-700">Add a new task to this column</p>
        </Modal>
    );
}
