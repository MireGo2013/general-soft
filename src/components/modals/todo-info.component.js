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
        this.component.innerHTML = '';
        const htmlInfo = renderPostInfo(todoId);
        console.log(htmlInfo);
        this.component.insertAdjacentHTML('afterbegin', htmlInfo);
    }

    onHide() {
        this.component.innerHTML = '';
    }
}

function onCloseModalHandler(e) {
    const target = e.target;
    const itsBg = target == this.component;
    const itsOkBtn = target == this.component.querySelector('.modal__btn');
    if (itsBg || itsOkBtn) {
        this.hide();
    }
}
