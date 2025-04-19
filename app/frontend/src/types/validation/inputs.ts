interface InputTypes {
    Criteria: { [key: string]: boolean; }
    Data: { [key: string]: string }
    PasswordConfirmation: [string, string];
}

interface IRTimeValidation {
    regex: RegExp;
    name: (name: string) => boolean;
    email: (email: string) => boolean;
    password: (password: string) => InputTypes['Criteria'];
    passwordConfirmation: (password: string, confirmation: string) => boolean;
}

export { InputTypes as IT, IRTimeValidation };
