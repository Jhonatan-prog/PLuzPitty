// react
import { useFormStatus } from "react-dom";

// styles
import { tailwindStyles as TSCSS} from "../../utils/utils.styles.tailwind";

const styles = {
    form: `${TSCSS.flexStart} flex-col gap-2`,
    label: "text-2xl",
    input: "w-80 h-12 bg-gray-300 my-4 outline-none rounded-[.625rem] px-2 focus:border-3 focus:border-gray-400 text-[1.257rem] placeholder:text-[1.257rem] placeholder:font-medium",
    button: "transition duration-400 text-gray-600 tracking-wide border-none bg-[#95D9DA] hover:bg-[#68c8ca] font-medium py-2 px-4 rounded w-full cursor-pointer",
};

const RegisterFormComponent = () => {
    return (
      <form action="" method="post" className={`${TSCSS.flexStart}`}>

        <input 
          type="name" 
          name="name"
          className={styles.input}
          placeholder="Nombre"
          id="" />
        <input 
          type="email" 
          name="email"
          className={styles.input}
          placeholder="Correo"
          id="" />
        <input 
          type="password" 
          name="password"
          className={styles.input}
          placeholder="Contraseña"
          id="" />
        <input 
          type="password-confirm" 
          name="password-confirm"
          className={styles.input}
          placeholder="Confirmar contraseña"
          id="" />

        <button type="submit" className={styles.button}>Registrarse</button>
    
      </form>
    );
}

export { RegisterFormComponent };
