import { Storage } from '../core/storage.js';

export const renderTodos = () => {
    const { todoList } = Storage.getUserData();

    if (todoList.length === 0) {
        return '<p>List is empty</p>';
    }
    return todoList
        .map((todo) => {
            const style = todo.status === 'done' ? 'controls-todos__item done' : 'controls-todos__item';

            return `
        <div class="${style}" data-todo-id=${todo.id} data-todo-status=${todo.status}>
            <div class="controls-todos__item-action status"></div>
            <p class="controls-todos__item_title">${todo.title}</p>
            <div class="controls-todos__item-action edit"></div>
            <div class="controls-todos__item-action remove"></div>
        </div>
        `;
        })
        .join(' ');
};
