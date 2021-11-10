import { Component } from '../../core/component.js';
import { renderPostInfo } from '../../template/render-post-info.js';

export class TodoInfoModalComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.component.addEventListener('click', onCloseModalHandler.bind(this));
    }

    onShow(todoId) {
        if (location.href.includes(todoId)) {
            this.component.innerHTML = '';
            const htmlInfo = renderPostInfo(todoId);
            this.component.insertAdjacentHTML('afterbegin', htmlInfo);
        }
    }

    onHide() {
        this.component.innerHTML = '';
    }
}

function onCloseModalHandler(e) {
    const target = e.target;
    const isBg = target == this.component;
    const isOkBtn = target == this.component.querySelector('.modal__btn');
    if (isBg || isOkBtn) {
        this.hide();
    }
}
