// react
import { useState, Fragment, ChangeEventHandler } from "react";
import { Auth } from "../../api/auth";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import Alert from "../Alertas/Alert";
// styles
import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";

const styles = TSCSS.auth;
const invalidInput = "border-solid border-3 border-red-300 focus:border-red-300";

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
  const [alerta, setAlerta] = useState<{ 
    mensaje: string; 
    tipo: "exito" | "error" 
  } | null>(null);

  const authentication = new Auth(undefined, {
    Correo: email,
    Contraseña: password
  });

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    dispatch(loginStart());

    const response = await authentication.login();

    if (!response || response.status >= 400) {
      dispatch(loginFailure(response.message));

      setAlerta(null);

      setTimeout(() => {
        setAlerta({
          mensaje: "¡Credenciales no válidas!",
          tipo: "error",
        });
      }, 0);

      setEmail("");
      setPassword("");

      console.error("User not found.")

      return;
    }

    dispatch(loginSuccess(response?.data));

    window.location.replace("http://localhost:5173/")
  }

  return (
    <Fragment>
      {alerta && <Alert mensaje={alerta.mensaje} tipo={alerta.tipo} />}

      <form action="" method="post" className={`${TSCSS.flexStart}`} onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email"
          className={styles.input + " " + (!auth.serverError ? "" : invalidInput)}
          placeholder="Correo"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value as string);
          }}
          onClick={() => dispatch(loginStart())}
          id={uuidv4()} />
        <input 
          type="password" 
          name="password"
          className={styles.input + " " + (!auth.serverError ? "" : invalidInput)}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value as string);
          }}
          onClick={() => dispatch(loginStart())}
          id={uuidv4()} />

        <Checkbox label="Recordar usuario" value={true} />

        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
    </Fragment>
  );
};

export { LoginFormComponent };
