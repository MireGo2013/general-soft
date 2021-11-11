import { Component } from '../../core/component.js';
import { Storage } from '../../core/storage.js';
import { pageContent } from '../../index.js';
import { renderConfirm } from '../../template/render-confirm.js';

export class ConfirmActionComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.component.addEventListener('click', onCloseModalHandler.bind(this));
    }

    onShow(todoId) {
        this.id = todoId;
        this.component.innerHTML = '';
        const htmlInfo = renderConfirm(todoId);
        this.component.insertAdjacentHTML('afterbegin', htmlInfo);
    }

    onHide() {
        this.component.innerHTML = '';
    }
}

function onCloseModalHandler(e) {
    const target = e.target;
    const isBg = target == this.component;
    const isCancelBtn = target == this.component.querySelector('.modal__btn--disagree');
    if (isBg || isCancelBtn) {
        this.hide();
    }
    if (e.target.classList.contains('modal__btn--agree')) {
        Storage.removeTodo(this.id);
        this.hide();
        pageContent.show();
    }
}
