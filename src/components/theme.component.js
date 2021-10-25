import { Component } from '../core/component.js';
import { Storage } from '../core/storage.js';

export class ThemeComponent extends Component {
    constructor(id, pageContainer) {
        super(id);
        this.pageContainer = pageContainer;
    }

    init() {
        if (Storage.getUserData()) {
            this.component.value = Storage.getUserData().theme;
        } else {
            this.component.value = 'gray';
        }

        this.component.addEventListener('change', onThemeHandler.bind(this));
    }

    value() {
        return this.component.value;
    }
}

function onThemeHandler(e) {
    Storage.setTheme(e.target.value);

    let classLists = this.pageContainer.classList;
    Array.from(classLists).forEach((theme) => {
        this.pageContainer.classList.remove(theme);
    });
    this.pageContainer.classList.add(e.target.value);
}
