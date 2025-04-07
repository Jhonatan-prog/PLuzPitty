// react
import { useState, useRef, useEffect } from "react";;
import { v4 as uuidv4 } from 'uuid';
// validation
import { RTimeValidation } from "../validation/inputs";
// styles
import { tailwindStyles as TSCSS} from "../../utils/utils.styles.tailwind";

const styles = TSCSS.auth;

const RegisterFormComponent = () => {
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const $passwordElement = useRef<HTMLInputElement>(null);
  const RTV = new RTimeValidation();
  const [text, setText] = useState('');
  const [criteria, setCriteria] = useState<{[key: string]: boolean}>({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    $passwordElement.current?.addEventListener("focus", () => {
      setOnFocus(true);
    })

    $passwordElement.current?.addEventListener('blur', () => {
      setOnFocus(false);
    });
  }, [])

  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`}>
  
      <input 
        type="name" 
        name="name"
        className={styles.input}
        placeholder="Nombre"
        id={uuidv4()} />

      <input 
        type="email" 
        name="email"
        className={styles.input}
        placeholder="Correo"
        id={uuidv4()} />

      <div className="relative transition-all">
        <input 
          type="password" 
          name="password"
          className={styles.input}
          placeholder="Contraseña"
          onChange={() => {
            setText($passwordElement.current?.value || '')
            setCriteria(RTV.password(text))
          }}
          ref={$passwordElement}
          id={uuidv4()} />

        <div 
          className={
            "absolute w-full bg-blue-50 px-4 py-2 rounded-[3px] transition-all shadow-[5px_5px_15px_rgba(25,21,23,.7)]" 
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

      <input 
        type="password-confirm" 
        name="password-confirm"
        className={styles.input}
        placeholder="Confirmar contraseña"
        id={uuidv4()} />

      <button type="submit" className={styles.button}>Registrarse</button>

    </form>
  );
}

export { RegisterFormComponent };
