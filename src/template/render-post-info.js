import { Storage } from '../core/storage.js';

export const renderPostInfo = (todoId) => {
    const todo = Storage.getTodoInfo(todoId);
    console.log(todo);
    return `<div class="modal-container modal-info">
    <h2 class="modal__title">${todo.title}</h2>
    <p class="modal__description">${todo.description}</p>
    <button class="modal__btn btn" type="submit">Okey</button>
</div>`;
};
