import { Component } from '../core/component.js';
import { Storage } from '../core/storage.js';
import { confirmActionModal, formCreatePostModal, formEditPostModal, todoInfoModal } from '../index.js';
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
    }

    onShow() {
        this.todoList.innerHTML = '';
        const html = renderTodos();
        this.todoList.insertAdjacentHTML('afterbegin', html);
        this.items = this.todoList.querySelectorAll('.controls-todos__item');
        Array.from(this.items).forEach((item) => item.addEventListener('click', onTodoHandler));
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
    const todoId = this.dataset.todoId;
    if (e.target.classList.contains('controls-todos__item')) {
        todoInfoModal.show(todoId);
    }
    if (e.target.classList.contains('status')) {
        this.classList.toggle('done');
        this.dataset.todoStatus = this.dataset.todoStatus === 'processing' ? 'done' : 'processing';
        Storage.setTodoStatus(todoId);
    }
    if (e.target.classList.contains('remove')) {
        confirmActionModal.show(todoId);
    }
    if (e.target.classList.contains('edit')) {
        formEditPostModal.show(todoId);
    }
}
