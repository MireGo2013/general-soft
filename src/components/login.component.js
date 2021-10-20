import { Component } from '../core/component.js';
import { SignInComponent } from './sign-in.component.js';
import { SignUpComponent } from './sign-up.component.js';

export class LoginComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.signUp = new SignUpComponent('sign-up');
        this.signIn = new SignInComponent('sign-in');
        this.component.addEventListener('click', onChangeFromHandler.bind(this));
    }
}

function onChangeFromHandler(e) {
    e.preventDefault();
    if (e.target.classList.contains('link-in')) {
        this.signUp.hide();
        this.signIn.show();
    } else if (e.target.classList.contains('link-up')) {
        console.log(e.target);
        this.signIn.hide();
        this.signUp.show();
    }
}
