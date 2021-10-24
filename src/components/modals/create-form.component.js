import { Component } from '../../core/component.js';
import { Form } from '../../core/form.js';
import { Storage } from '../../core/storage.js';
import { Validator } from '../../core/validator.js';
import { pageContent } from '../../index.js';

export class FormCreatePostModalComponent extends Component {
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
}

function onSubmitPostHandler(e) {
    e.preventDefault();
    if (this.form.isValid()) {
        const formData = {
            id: new Date().getTime(),
            ...this.form.value(),
            status: 'processing',
        };
        Storage.createPost(formData);
        this.form.clear();
        this.hide();
        pageContent.show();
    }
}

function onCloseModalHandler(e) {
    const target = e.target;
    let itsBg = target == this.component;
    if (itsBg) {
        this.hide();
        this.form.clear();
    }
}
