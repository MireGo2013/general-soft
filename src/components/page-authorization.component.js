import { Component } from '../core/component.js';
import { SignInComponent } from './sign-in.component.js';
import { SignUpComponent } from './sign-up.component.js';

export class PageAuthorizationComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.signIn = new SignInComponent('sign-in', this.component);
        this.signUp = new SignUpComponent('sign-up', this.component);
        this.links = this.component.querySelectorAll('.form__link');
        this.links.forEach((link) => {
            link.addEventListener('click', onChangeFormHandler.bind(this));
        });
    }

    onShow() {
        this.signUp.hide();
        this.signIn.show();
    }
}

function onChangeFormHandler(e) {
    console.log('cliiiick');
    e.preventDefault();
    if (e.target.classList.contains('link-in')) {
        this.signUp.hide();
        this.signIn.show();
    } else if (e.target.classList.contains('link-up')) {
        this.signIn.hide();
        this.signUp.show();
    }
}
