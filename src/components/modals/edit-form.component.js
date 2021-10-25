import { Component } from '../../core/component.js';
import { Form } from '../../core/form.js';
import { Storage } from '../../core/storage.js';
import { Validator } from '../../core/validator.js';
import { pageContent } from '../../index.js';

export class FormEditPostModalComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.component.addEventListener('click', onCloseModalHandler.bind(this));
        this.formWrapper = this.component.firstElementChild;
        this.formWrapper.addEventListener('submit', onSubmitPostHandler.bind(this));
        this.form = new Form(this.formWrapper, {
            title: [Validator.required],
            description: [Validator.required],
        });
    }

    onShow(todoId) {
        this.id = todoId;
        this.todoData = Storage.getTodoInfo(todoId);
        this.formWrapper.title.value = this.todoData.title;
        this.formWrapper.description.value = this.todoData.description;
    }

    onHide() {
        this.form.clear();
    }
}

function onSubmitPostHandler(e) {
    e.preventDefault();
    if (this.form.isValid()) {
        const formData = {
            ...this.todoData,
            ...this.form.value(),
        };
        Storage.editPost(this.id, formData);
        pageContent.show();
        this.hide();
    }
}

function onCloseModalHandler(e) {
    const target = e.target;
    const isBg = target == this.component;
    if (isBg) {
        this.hide();
    }
}
