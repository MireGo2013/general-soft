export class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};
        Object.keys(this.controls).forEach((field) => {
            value[field] = this.form[field].value;
        });
        return value;
    }

    isValid() {
        let isValidateForm = true;

        Object.keys(this.controls).forEach((field) => {
            const validators = this.controls[field];

            let isValid = true;

            validators.forEach((validator) => {
                isValid = validator(this.form[field].value) && isValid;
            });

            isValid ? clearNoticeError(this.form[field]) : setNoticeError(this.form[field]);

            isValidateForm = isValid && isValidateForm;
        });

        return isValidateForm;
    }

    clear() {
        Object.keys(this.controls).forEach((field) => {
            this.form[field].value = '';
            clearNoticeError(this.form[field]);
        });
    }
}

function setNoticeError(input) {
    clearNoticeError(input);
    input.parentElement.classList.add('invalid');

    const error = `<p class='warning'>Invalide error</p>`;

    if (input.getAttribute('name') === 'name' || input.getAttribute('name') === 'title' || input.getAttribute('name') === 'description') {
        input.insertAdjacentHTML('afterend', setErrorText('Field is required'));
    }
    if (input.getAttribute('name') === 'email') {
        input.insertAdjacentHTML('afterend', setErrorText('Field is required (at least: "@" symbol)'));
    }
    if (input.getAttribute('name') === 'password') {
        if (input.classList.contains('sign-in__input')) {
            input.insertAdjacentHTML('afterend', setErrorText('Field is required'));
        } else {
            input.insertAdjacentHTML('afterend', setErrorText('Field is required(at least: 1 letter, 1 digit and 1 uppercase letter)'));
        }
    }
}

function clearNoticeError(input) {
    if (input.nextSibling) {
        if (input.closest('.form__field')) {
            input.closest('.form__field').removeChild(input.nextSibling);
            input.parentElement.classList.remove('invalid');
        } else if (input.closest('.modal__field')) {
            input.closest('.modal__field').removeChild(input.nextSibling);
            input.parentElement.classList.remove('invalid');
        }
    }
}

function setErrorText(text) {
    return `<p class='form__field-warning'>${text}</p>`;
}
