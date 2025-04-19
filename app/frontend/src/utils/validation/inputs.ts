import { IT, IRTimeValidation } from '../../types/validation/inputs';

class RTimeValidation implements IRTimeValidation {
    public regex: RegExp;

    constructor() {
        this.regex = new RegExp('');
    }

    public name(name: string) {
        this.regex = /^[a-zA-ZÀ-ÿ\s]+$/; // Matches letters and spaces, including accented characters
        return this.regex.test(name);
    }

    public email(email: string) {
        this.regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return this.regex.test(email);
    }

    public password(password: string) {
        const pass = password;

        const criteria = {
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            number: /\d/.test(pass),
            special: /[!@#$%_^&*(),.?":{}|<>]/.test(pass),
        }

        return criteria;
    }

    public passwordConfirmation(password: string, confirmation: string) {
        return password === confirmation;
    }
    
    public validateCriteria(criteria: IT['Criteria']) {
        const values = Object.values(criteria);

        return values.filter((value) => value === true).length === 4;
    }

    public validationComplete(validData: any) {
        const validForm = Object.values(validData).every((value) => value === true);
        console.log(validForm)
        return validForm
    }

    public validationHandler(reference: string, value: string | IT['PasswordConfirmation']) {
        const handler: {
            [key: string]: IT['Criteria'] | boolean | void;
        } = {
            name: this.name(value as string),
            email: this.email(value as string),
            password: this.password(value as string),
            passwordConfirmation: this.passwordConfirmation(value[0], value[1]),
        }

        return handler[reference];
    }
}

export { RTimeValidation };
