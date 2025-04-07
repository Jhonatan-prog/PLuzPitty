type CriteriaType = {
    [key: string]: boolean;
}

class RTimeValidation {
    public validate(value: string): boolean {
      const regex = /^(0[0-9]|1[0-2]):[0-5][0-9] [AP]M$/;
      return regex.test(value);
    }

    public name() {

    }

    public email() {

    }

    public password(value: string) {
        const password = value;

        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        }

        return criteria;
    }

    public passwordConfirmation() {

    }

    public validationComplete() {
        // check if all criteria are met
    }

    public validationHandler(reference: string, value: string) {
        const handler: {
            [key: string]: string | CriteriaType | void;
        } = {
            "name": this.name(),
            "email": this.email(),
            "password": this.password(value),
            "passwordConfirmation": this.passwordConfirmation(),
        }

        return handler[reference];
    }
}

export { RTimeValidation };
