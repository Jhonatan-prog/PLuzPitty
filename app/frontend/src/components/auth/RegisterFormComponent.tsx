// libs
import axios from 'axios';
import { useState, useRef, useEffect } from "react";;
import { v4 as uuidv4 } from 'uuid';
// validation
import { RTimeValidation } from "../../utils/validation/inputs";
import { defaultRequest } from "../../services/requests";
// styles / types
import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";
import { LabelProps } from "../../types/compProps";
import { IT } from '../../types/validation/inputs';

const styles = TSCSS.auth;
const invalidInput = "border-solid border-3 border-red-300 focus:border-red-300";
const invalidField = "opacity-100 text-red-300 bottom-[-10px] left-3";

const Label = ({ reference, message, isValid, userInput }: LabelProps) => {
  return (
    <label 
      htmlFor={reference} 
      className={`
        absolute bottom-[-4px] left-1 opacity-0 transition-all duration-500 text-sm font-semibold tracking-wide 
        ${(isValid || userInput === "") ? '' : invalidField}
      `}>
      {message}
    </label>
  )
}

const RegisterFormComponent = () => {
  const DR = defaultRequest;

  const $passwordInput = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  // Inicialización para validación de inputs
  const RTV = new RTimeValidation();
  const [validData, setValidData] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  });
  const [criteria, setCriteria] = useState<IT["Criteria"]>({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [validationComplete, setValidationComplete] = useState(false);

  useEffect(() => {
    $passwordInput.current?.addEventListener("focus", () => {
      setOnFocus(true);
    })

    $passwordInput.current?.addEventListener('blur', () => {
      setOnFocus(false);
    });
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validationComplete) {
      return
    };

    const userData = {
      NombreUsuario: name,
      Contraseña: password,
      Correo: email,
      NombreRol: "ADMINISTRADOR",
      Telefono: "3113788092"
    }

    DR.newData = userData;
    DR.create('Usuario');
    // const response = await axios.post('http://localhost:5000/api/Usuario', userData)
    // .catch(error => {
    //   console.log(error.response.data); // This will show any detailed error message from the server
    // });

    if (!true) {
      console.error("something went worng")
      return;
    }

    // window.location.replace("http://localhost:5173/login")
   }

  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`} onSubmit={handleSubmit}>
  
      <div className="relative">
        <input 
          type="name" 
          name="name"
          className={`${styles.input} ${(validData.name || name === "") ? '' : invalidInput}`}
          placeholder="Nombre"
          onChange={(e) => {
            const value = e.target.value as string;
            const updatedValidData = {
              ...validData, 
              name: RTV.validationHandler("name", value) as boolean
            };
            const validForm = RTV.validationComplete(updatedValidData);

            setName(value);
            setValidData(updatedValidData);

            if (validForm) {
              setValidationComplete(true);
            } else {
              setValidationComplete(false);
            }
          }}
          id={uuidv4()} />

          <Label 
            reference="name" 
            message="El nombre ingresado no es valido"
            isValid={validData.name}
            userInput={name}
          />
          
      </div>
      
      <div className="relative">
        <input 
          type="email" 
          name="email"
          className={`${styles.input} ${(validData.email || email === "") ? '' : invalidInput}`}
          placeholder="Correo"
          onChange={(e) => {
            const value = e.target.value as string;
            const updatedValidData = {
              ...validData, 
              email: RTV.validationHandler("email", value) as boolean
            }
            const validForm = RTV.validationComplete(updatedValidData);

            setEmail(value);
            setValidData(updatedValidData)

            if (validForm) {
              setValidationComplete(true);
            } else {
              setValidationComplete(false);
            }
          }}
          id={uuidv4()} />

          <Label 
            reference="email" 
            message="El correo ingresado no es valido"
            isValid={validData.email}
            userInput={email}
          />

      </div>

      <div className="relative">
        <input 
          type="password" 
          name="password"
          className={`${styles.input} ${(validData.password || password === "") ? '' : invalidInput}`}
          placeholder="Contraseña"
          onChange={(e) => {
            const value = e.target.value as string;
            const newCriteria = RTV.validationHandler("password", value) as IT['Criteria'];
            const isPasswordValid = RTV.validateCriteria(newCriteria);
            
            const updatedValidData = {
              ...validData,
              password: isPasswordValid,
              passwordConfirmation: RTV.validationHandler("passwordConfirmation", [passwordConfirmation, value]) as boolean
            };

            const validForm = RTV.validationComplete(updatedValidData);

            setPassword(value);
            setCriteria(newCriteria)
            setValidData(updatedValidData)

            if (validForm) {
              setValidationComplete(true);
            } else {
              setValidationComplete(false);
            }
          }}
          ref={$passwordInput}
          id={uuidv4()} 
        />

        <Label 
          reference="password" 
          message="Porfavor, cumple con todos los criterios"
          isValid={validData.password}
          userInput={password}
        />

        <div 
          className={
            "absolute z-40 w-full bg-blue-50 px-4 py-2 rounded-[3px] transition-all shadow-[5px_5px_15px_rgba(25,21,23,.7)]" 
            + " " + (onFocus ? "opacity-100 top-16" : "top left-0 top-0 opacity-0 pointer-events-none")
          }>
            <ul id="criteria" className="text-sm space-y-1 transition-all duration-1000">
              <li id="length" className={"tracking-wide" + " " + (!criteria.length ? "text-red-300" : "text-[#66C3C6]")}>Por lo menos 8 caracteres.</li>
              <li id="uppercase" className={"tracking-wide" + " " + (!criteria.uppercase ? "text-red-300" : "text-[#66C3C6]")}>Por lo menos una letra mayuscula.</li>
              <li id="number" className={"tracking-wide" + " " + (!criteria.number ? "text-red-300" : "text-[#66C3C6]")}>Por lo menos un número.</li>
              <li id="special" className={"tracking-wide" + " " + (!criteria.special ? "text-red-300" : "text-[#66C3C6]")}>Por lo menos un caracter especial (!@_*...)</li>
            </ul>
        </div>
      </div>

      <div className="relative">
        <input 
          type="password" 
          name="password-confirm"
          className={`${styles.input} ${(validData.passwordConfirmation || passwordConfirmation === "") ? '' : invalidInput}`}
          placeholder="Confirmar contraseña"
          onChange={(e) => {
            const value = e.target.value as string;
            const updatedValidData = {
              ...validData, 
              passwordConfirmation: RTV.validationHandler("passwordConfirmation", [password, value]) as boolean
            };
            const validForm = RTV.validationComplete(updatedValidData);

            setPasswordConfirmation(value);
            setValidData(updatedValidData)

            if (validForm) {
              setValidationComplete(true);
            } else {
              setValidationComplete(false);
            }
          }}
          id={uuidv4()} 
        />

        <Label 
          reference="password-confirm" 
          message="Las contraseñas no coinciden"
          isValid={validData.passwordConfirmation}
          userInput={passwordConfirmation}
        />
      </div>

      <button 
        type="submit" 
        className={`
          transition duration-400 min-w-80 mt-4 my-2 tracking-wide border-none text-[1.257rem] font-medium py-2 px-4 rounded w-full 
          ${validationComplete ? 'text-gray-600 bg-[#95D9DA] hover:bg-[#68c8ca] cursor-pointer' : "text-cyan-50 bg-gray-400 hover:bg-gray-400 cursor-auto"}`
        }>
          Registrarse
      </button>
    </form>
  );
}

export { RegisterFormComponent };
