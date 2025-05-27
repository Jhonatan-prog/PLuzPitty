// react
import { useState, Fragment, ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../api/auth";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import Alert from "../Alertas/Alert";
// styles
import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";

const styles = TSCSS.auth;
const invalidInput = "ring-[3px] ring-red-300 focus:ring-red-300";

const Checkbox = ({ 
    label, useSt, onChange 
  }: { 
    label:string, 
    useSt: {
      checked: boolean;
      setChecked: React.Dispatch<React.SetStateAction<boolean>>
    }, 
    onChange?: ChangeEventHandler<HTMLInputElement>
  }) => {

  return (
    <label className="mt-3 flex items-center text-gray-600 text-lg font-medium">
      <input 
        className="mr-2 mb-[2px] cursor-pointer w-4 h-4 bg-gray-100 border-gray-300 rounded ring-[#95D9DA] focus:ring-[#95D9DA]" 
        type="checkbox" 
        checked={useSt.checked} 
        onChange={() => {
            useSt.setChecked(!useSt.checked);

            if (onChange) {
              return onChange;
            }
          }} />
      <span>{label}</span>
    </label>
  );
};

const LoginFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();

  const useSt = {
    checked, 
    setChecked
  }

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

    const response = await authentication.login(useSt.checked);

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

    navigate("/")
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

        <Checkbox label="Recordar usuario" useSt={useSt} />

        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
    </Fragment>
  );
};

export { LoginFormComponent };
