import { Storage } from '../core/storage.js';

export const renderTodos = (filters = {}) => {
    let { todoList } = Storage.getUserData();

    if (todoList.length === 0) {
        return '<p class="todos__notice">List is empty</p>';
    }
    const filtersTodoList = todoList.filter((todo) => {
        let isFindTodo = true;
        Object.keys(filters).forEach((field) => {
            let isFind = true;
            switch (field) {
                case 'title':
                    isFind = todo.title.toLowerCase().includes(filters[field].toLowerCase());
                    if (filters[field] === '') isFind = true;
                    break;
                case 'status':
                    isFind = todo.status.includes(filters[field]);
                    if (filters[field] === 'all') isFind = true;
                    break;
            }
            isFindTodo = isFind && isFindTodo;
        });
        return isFindTodo;
    });

    if (filtersTodoList.length === 0) {
        return '<p class="todos__notice">Nothing found</p>';
    }

    return filtersTodoList
        .map((todo) => {
            const style = todo.status === 'done' ? 'todos__item todos__item--done' : 'todos__item';

            return `
        <div class="${style}" data-todo-id=${todo.id} data-todo-status=${todo.status}>
            <div class="todos__item-status"></div>
            <p class="todos__item-title">${todo.title}</p>
            <div class="todos__item-edit"></div>
            <div class="todos__item-remove"></div>
        </div>
        `;
        })
        .join(' ');
};
