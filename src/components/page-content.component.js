import { Component } from '../core/component.js';
import { Storage } from '../core/storage.js';
import { confirmActionModal, formCreatePostModal, formEditPostModal, todoInfoModal } from '../index.js';
import { renderTodos } from '../template/render-post.js';
import { SearchComponent } from './search.component.js';
import { ThemeComponent } from './theme.component.js';

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
        this.todoList = document.querySelector('.todos-container');
        this.search = new SearchComponent('search');
        this.welcome = document.getElementById('welcome');
        this.theme = new ThemeComponent('theme', this.component);
    }

    onShow() {
        this.todoList.innerHTML = '';
        this.component.classList.add(this.theme.value());
        const html = renderTodos(this.search.value());
        this.todoList.insertAdjacentHTML('afterbegin', html);
        this.items = this.todoList.querySelectorAll('.todos__item');
        Array.from(this.items).forEach((item) => item.addEventListener('click', onTodoHandler));
        this.welcome.innerText = Storage.getUserData().name;
    }

    onHide() {
        this.search.clear();
        this.welcome.innerText = '';
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
    if (e.target.classList.contains('todos__item')) {
        history.pushState(todoId, null, todoId);
        todoInfoModal.show(todoId);
    }
    if (e.target.classList.contains('todos__item-status')) {
        this.classList.toggle('todos__item--done');
        this.dataset.todoStatus = this.dataset.todoStatus === 'processing' ? 'done' : 'processing';
        Storage.setTodoStatus(todoId);
    }
    if (e.target.classList.contains('todos__item-remove')) {
        confirmActionModal.show(todoId);
    }
    if (e.target.classList.contains('todos__item-edit')) {
        formEditPostModal.show(todoId);
    }
}
