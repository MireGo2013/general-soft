import { Storage } from '../core/storage.js';

export const renderTodos = (filters = {}) => {
    let { todoList } = Storage.getUserData();

    if (todoList.length === 0) {
        return '<p class="controls-todos__notice">List is empty</p>';
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
        return '<p class="controls-todos__notice">Nothing found</p>';
    }

    return filtersTodoList
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
