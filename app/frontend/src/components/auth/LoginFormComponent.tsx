// react
import { useState, ChangeEventHandler } from "react";
import { Auth } from "../../api/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = new Auth(undefined, {
    Correo: email,
    Contraseña: password
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const response = await auth.login();

    if (response && response.status >= 400) {
      console.log("User not found.")
      return;
    }
  // Supón que `response.data.NombreUsuario` devuelve el nombre del usuario
  const data = await response.data; // si no está parseado aún
  localStorage.setItem("nombreUsuario", data.NombreUsuario);

    window.location.replace("http://localhost:5173/")
   }

  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`} onSubmit={handleSubmit}>

      <input 
        type="email" 
        name="email"
        className={styles.input}
        placeholder="Correo"
        onChange={(e) => {
          setEmail(e.target.value as string);
        }}
        id={uuidv4()} />
      <input 
        type="password" 
        name="password"
        className={styles.input}
        placeholder="Contraseña"
        onChange={(e) => {
          setPassword(e.target.value as string);
        }}
        id={uuidv4()} />

      <Checkbox label="Recordar usuario" value={false} />

      <button type="submit" className={styles.button}>Ingresar</button>
  
    </form>
  );
};

export { LoginFormComponent };
