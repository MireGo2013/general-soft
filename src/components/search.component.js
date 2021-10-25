import { Component } from '../core/component.js';
import { pageContent } from '../index.js';

export class SearchComponent extends Component {
    constructor(id) {
        super(id);
        this.filters = {
            title: '',
            status: 'all',
        };
    }

    value() {
        return this.filters;
    }

    init() {
        this.component.addEventListener('change', onSearchTextHandler.bind(this));
    }

    clear() {
        this.component.title.value = '';
        this.component.status.value = 'all';
        this.filters.title = '';
        this.filters.status = 'all';
    }
}

function onSearchTextHandler(e) {
    Object.keys(this.filters).forEach((field) => {
        this.filters[field] = this.component[field].value;
    });
    pageContent.show();
}
