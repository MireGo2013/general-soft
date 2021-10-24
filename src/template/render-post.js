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
        <div class="${style}" data-todo-id=${todo.id}>
            <div class="controls-todos__item-action status"></div>
            <p class="controls-todos__item_title">${todo.title}</p>
            <div class="controls-todos__item-action edit"></div>
            <div class="controls-todos__item-action remove"></div>
        </div>
        `;
        })
        .join(' ');
};

{
    /* <div class="controls-todos__item done">
<div class="controls-todos__item-action status"></div>
<p class="controls-todos__item_title">Learn JavaScript</p>
<div class="controls-todos__item-action edit"></div>
<div class="controls-todos__item-action remove"></div>
</div>

<div class="controls-todos__item">
<div class="controls-todos__item-action status"></div>
<p class="controls-todos__item_title">Learn JavaScript</p>
<div class="controls-todos__item-action edit"></div>
<div class="controls-todos__item-action remove"></div>
</div> */
}
