import { Component } from '../core/component.js';
import { formCreatePostModal, todoInfoModal } from '../index.js';
import { renderTodos } from '../template/render-post.js';

export class PageContentComponent extends Component {
    constructor(id, pageAuthorization) {
        super(id);
        this.pageAuthorization = pageAuthorization;
    }

    init() {
        this.logoutBtn = document.getElementById('header-btn');
        this.logoutBtn.addEventListener('click', onLogoutHandler.bind(this));
        this.createBtn = document.getElementById('create-btn');
        this.createBtn.addEventListener('click', onShowFormCreatePosttHandler.bind(this));
        this.todoList = document.querySelector('.controls-todos');
        this.todoList.addEventListener('click', onTodoHandler.bind(this));
    }

    onShow() {
        this.todoList.innerHTML = '';
        const html = renderTodos();
        this.todoList.insertAdjacentHTML('afterbegin', html);
    }
}

function onLogoutHandler() {
    this.hide();
    localStorage.setItem('selectedUserId', null);
    this.pageAuthorization.show();
}

function onShowFormCreatePosttHandler() {
    formCreatePostModal.show();
}

function onTodoHandler(e) {
    const todo = e.target.classList.contains('controls-todos__item');
    if (todo) {
        const todoId = e.target.dataset.todoId;
        todoInfoModal.show(todoId);
    }
}
