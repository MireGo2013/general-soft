export class Component {
    constructor(id) {
        this.component = document.getElementById(id);
        this.init();
    }

    init() {}

    onHide() {}

    onShow() {}

    hide() {
        this.component.classList.add('hide');
        this.onHide();
    }

    show(e) {
        this.component.classList.remove('hide');
        this.onShow(e);
    }
}
