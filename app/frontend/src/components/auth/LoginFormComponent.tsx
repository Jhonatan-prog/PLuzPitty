// react
import { useState, ChangeEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { v4 as uuidv4 } from 'uuid';

// styles
import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";

const styles = TSCSS.auth;

const Checkbox = ({ 
    label, value, onChange 
  }: { 
    label:string, 
    value: boolean, 
    onChange?: ChangeEventHandler<HTMLInputElement>
  }) => {

  const [checked, setChecked] = useState(value);

  return (
    <label className="mt-3 flex items-center text-gray-600 text-lg font-medium">
      <input 
        className="mr-2 cursor-pointer" 
        type="checkbox" 
        checked={checked} 
        onChange={() => {
            setChecked(!checked);

            if (onChange) {
              return onChange;
            }
          }} />
      {label}
    </label>
  );
};

const LoginFormComponent = () => {
  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`}>

      <input 
        type="email" 
        name="email"
        className={styles.input}
        placeholder="Correo"
        id={uuidv4()} />
      <input 
        type="password" 
        name="password"
        className={styles.input}
        placeholder="Contraseña"
        id={uuidv4()} />

      <Checkbox label="Recordar usuario" value={false} />

      <button type="submit" className={styles.button}>Ingresar</button>
  
    </form>
  );
};

export { LoginFormComponent };
