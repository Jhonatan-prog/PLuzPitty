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

    public telefono(telefono: unknown) {
        const digits = String(telefono ?? '').replace(/\D/g, '');  
        this.regex =/^\d{10}$/;
        return this.regex.test(digits);

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
        return validForm
    }

    public validationHandler(reference: string, value: string | IT['PasswordConfirmation']) {
        const handler: {
            [key: string]: IT['Criteria'] | boolean | void;
        } = {
            name: this.name(value as string),
            email: this.email(value as string),
            telefono: this.telefono(value as string),
            password: this.password(value as string),
            passwordConfirmation: this.passwordConfirmation(value[0], value[1]),
        }

        return handler[reference];
    }

    public soloLetras(soloLetras: string) {
        this.regex = /^[a-zA-Z\s\-]*$/; // Permite letras, espacios y guiones
        return this.regex.test(soloLetras);
    }

    public soloNumeros(soloNumeros: string) {
        this.regex = /^[0-9]*$/; 
        return this.regex.test(soloNumeros);
    }

    public imagen(imagen: File | null) {
        return imagen !== null; // Retorna true si la imagen no es null
    }

    public sinespeciales(sinEspeciales: string) {
        this.regex = /^[a-zA-Z0-9\s\-\/.]*$/; // Permite letras, números, espacios, guiones y algunos caracteres especiales
        return this.regex.test(sinEspeciales);
    }
    
    public validarCamposProducto(formData: any) {
        const errores: { [key: string]: string } = {};

        if ((!formData.CodigoProducto)) errores.CodigoProducto = "Este campo es obligatorio";
        if ((!formData.Nombre)) errores.Nombre = "Este campo es obligatorio";
        if ((!formData.FechaIngreso)) errores.FechaIngreso = "Este campo es obligatorio";
        if ((!formData.Stock)) errores.Stock = "Este campo es obligatorio";
        if ((!formData.VlrUnitario)) errores.VlrUnitario = "Este campo es obligatorio";
        if ((!formData.VlrSinIva)) errores.VlrSinIva = "Este campo es obligatorio";
        if ((!formData.VlrCompra)) errores.VlrCompra = "Este campo es obligatorio";
        if (!this.imagen(formData.imagen)) errores.imagen = "La imagen es obligatoria";

        return errores;
    }
    public validarCamposProveedor(formData: any) {
        const errores: { [key: string]: string } = {};

        if ((!formData.Nit)) errores.Nit = "Este campo es obligatorio";
        if ((!formData.Nombre)) errores.Nombre = "Este campo es obligatorio";
        if ((!formData.NombreContacto)) errores.NombreContacto = "Este campo es obligatorio";
        if ((!formData.Telefono)) errores.Telefono = "Este campo es obligatorio";
        if ((!formData.Direccion)) errores.Direccion = "Este campo es obligatorio";
        if ((!formData.Redes)) errores.Redes = "Este campo es obligatorio";
        if (!this.imagen(formData.imagen)) errores.imagen = "La imagen es obligatoria";

        return errores;
    }
    
}

export { RTimeValidation };
