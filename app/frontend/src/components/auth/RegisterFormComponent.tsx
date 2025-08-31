// libs
import { useState, useRef, useEffect, Fragment } from "react";;
import { v4 as uuidv4 } from 'uuid';
// validation
import { RTimeValidation } from "../../utils/validation/inputs";
import { Request } from "../../api/requests";
import Alert from "../Alertas/Alert";
// styles / types
import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";
import { LabelProps } from '../../types/compProps';
import { IT } from '../../types/validation/inputs';
import { useNavigate } from "react-router-dom";

const styles = TSCSS.auth;
const invalidInput = "ring-[3px] ring-red-300 focus:ring-red-300";
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
  const navigate = useNavigate();

  const $passwordInput = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alerta, setAlerta] = useState<{ 
    mensaje: string; 
    tipo: "exito" | "error" 
  } | null>(null);

  const request = new Request('http://localhost:5000', {
    NombreUsuario: name,
    Contraseña: password,
    Correo: email,
    Telefono: telefono,
    NombreRol: "EMPLEADO"
  });

  // Inicialización para validación de inputs
  const RTV = new RTimeValidation();
  const [validData, setValidData] = useState({
    name: false,
    email: false,
    telefono: false,
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

    const response = await request.post('Usuario');
    
    setAlerta(null);

    if (!response || response.status >= 400) {

      setTimeout(() => {
        setAlerta({ 
          mensaje: response.status === 409 ? "¡El correo ya está en uso!" : "¡No pudimos registrarte, intenta de nuevo!", 
          tipo: "error" 
        });
      }, 100)

      setPassword("");
      setPasswordConfirmation("");
      setCriteria({
        length: false,
        uppercase: false,
        number: false,
        special: false,
      })
      setValidData({
        ...validData,
        password: false,
        passwordConfirmation: false
      })
      setValidationComplete(false);

      console.error("User could not be created, something went wrong.")

      return;
    }
    
    setTimeout(() => {
      setAlerta({ 
        mensaje: "¡Usuario registrado!", 
        tipo: "exito" 
      });
    }, 100)

    setTimeout(() => {
      navigate("/login")
    }, 2500);
  }

  return (
    <Fragment>
      {alerta && <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} />}

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
          type="tel" 
          name="telefono"
          inputMode="numeric"
          maxLength={10}
          className={`${styles.input} ${(validData.telefono || telefono === "") ? '' : invalidInput}`}
          placeholder="Telefono"
          value={telefono}
          onChange={(e) => {
              const raw = e.target.value as string;
              const digits = raw.replace(/\D/g, ''); // Elimina cualquier caracter que no sea dígito
              setTelefono(digits); // Actualiza el estado con solo dígitos
              const value = e.target.value as string;
              const updatedValidData = {
                ...validData, 
                telefono: RTV.validationHandler("telefono", digits) as boolean
              }
              const validForm = RTV.validationComplete(updatedValidData);

              setTelefono(value);
              setValidData(updatedValidData)

              if (validForm) {
                setValidationComplete(true);
              } else {
                setValidationComplete(false);
              }
            }}
            id={uuidv4()} />
            <Label
              reference="telefono"
              message="El numero ingresado no es valido"
              isValid={validData.telefono}
              userInput={telefono}
            />
        </div>

        <div className="relative">
          <input 
            type="password" 
            name="password"
            className={`${styles.input} ${(validData.password || password === "") ? '' : invalidInput}`}
            placeholder="Contraseña"
            value={password}
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
            value={passwordConfirmation}
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
    </Fragment>
  );
}

export { RegisterFormComponent };
