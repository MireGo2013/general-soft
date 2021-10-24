import { FormCreatePostModalComponent } from './components/modals/create-form.component.js';
import { TodoInfoModalComponent } from './components/modals/todo-info.component.js';
import { PageAuthorizationComponent } from './components/page-authorization.component.js';
import { PageContentComponent } from './components/page-content.component.js';

export const login = new PageAuthorizationComponent('login');
export const pageContent = new PageContentComponent('page-content', login);
export const formCreatePostModal = new FormCreatePostModalComponent('create');
export const todoInfoModal = new TodoInfoModalComponent('info');

if (JSON.parse(localStorage.getItem('selectedUserId'))) {
    login.hide();
    pageContent.show();
}
