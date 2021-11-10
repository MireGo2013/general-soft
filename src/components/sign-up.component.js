import { Component } from '../core/component.js';
import { Form } from '../core/form.js';
import { Storage } from '../core/storage.js';
import { Validator } from '../core/validator.js';
import { pageContent } from '../index.js';

export class SignUpComponent extends Component {
    constructor(id, page) {
        super(id);
        this.page = page;
    }

    init() {
        this.component.addEventListener('submit', onSubmitHandler.bind(this));
        this.form = new Form(this.component, {
            name: [Validator.required],
            email: [Validator.required, Validator.isEmailValid],
            password: [Validator.required, Validator.isPasswordValid],
        });
    }

    onHide() {
        this.form.clear();
    }
}

function onSubmitHandler(e) {
    e.preventDefault();
    if (this.form.isValid()) {
        const formData = {
            ...this.form.value(),
            id: new Date().getTime(),
            todoList: [],
            theme: 'gray',
        };
        this.form.clear();
        const userId = Storage.createNewUser(formData);
        if (!userId) return;
        localStorage.setItem('selectedUserId', userId);
        setTimeout(() => {
            this.page.classList.add('hide');
            pageContent.show();
        }, 1500);
    }
}
