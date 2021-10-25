import { Storage } from '../core/storage.js';

export const renderConfirm = (todoId) => {
    const todo = Storage.getTodoInfo(todoId);
    return `
    <div class='modal-container modal-confirm'>
        <p class='modal-confirm__notice'>
            Are you sure you want to delete "<span>${todo.title}</span>" item from the list
        </p>
        <div class='modal-confirm__action'>
            <button class='modal-confirm__action_agree btn' type='submit'>
                Yes
            </button>
            <button class='modal-confirm__action_disagree btn' type='submit'>
                No
            </button>
        </div>
    </div>
    `;
};
