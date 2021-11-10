import { FormCreatePostModalComponent } from './components/modals/create-form.component.js';
import { TodoInfoModalComponent } from './components/modals/todo-info.component.js';
import { PageAuthorizationComponent } from './components/page-authorization.component.js';
import { PageContentComponent } from './components/page-content.component.js';
import { ConfirmActionComponent } from './components/modals/confirm-action.component.js';
import { FormEditPostModalComponent } from './components/modals/edit-form.component.js';
import { Notification } from './components/modals/notification.component.js';

export const login = new PageAuthorizationComponent('login');
export const pageContent = new PageContentComponent('page-content', login);
export const formCreatePostModal = new FormCreatePostModalComponent('create');
export const todoInfoModal = new TodoInfoModalComponent('info');
export const confirmActionModal = new ConfirmActionComponent('confirm');
export const formEditPostModal = new FormEditPostModalComponent('edit');
export const notification = new Notification('notification');

if (JSON.parse(localStorage.getItem('selectedUserId'))) {
    login.hide();
    pageContent.show();
}

window.addEventListener('popstate', function (e) {
    if (e.state) {
        todoInfoModal.show(e.state);
    }
});
