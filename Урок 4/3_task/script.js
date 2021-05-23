class Form {
    constructor() {
        this.htmlForm = {
            'name': document.getElementById('form-name'),
            'phone number': document.getElementById('form-phone-number'),
            'email': document.getElementById('form-email'),
            textarea: document.getElementById('form-textarea')
        }

        this.formValidators = {
            'name': /^[a-zA-Z]+$/,
            'phone number': /^\+[0-9]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/,
            'email': /^[a-z]+\.?\-?[a-z]+@[a-z]+.[a-z]+$/g,
        }

        this.log = '';
    }

    validate() {
        for (let prop in this.formValidators) {
            if (this.formValidators[`${prop}`].test(this.htmlForm[`${prop}`].value)) {
                this.log += `The ${prop} you've entered was successfully accepted\n`;
                this.htmlForm[`${prop}`].classList.remove('form-invalid-field');
            } else {
                this.log += `The ${prop} you've entered wasn't accepted\n`
                this.htmlForm[`${prop}`].classList.add('form-invalid-field')
            }
        }
    }

    init() {
        this.log = '';
        this.validate();

        alert(this.log);
    }
}

const form = new Form;
document.getElementById('form-button')
                .addEventListener('click', ()=> {
                    form.init();
                });