import { tailwindStyles as TSCSS} from "../../styles/styles.tailwind";

const styles = TSCSS.auth;

const PassRecoveryFormComponent = () => {
    return (
        <form action="" method="post" className={`${TSCSS.flexStart} place-items-center`}>
            <p className="text-center text-gray-500 text-lg mb-5">
                No te preocupes, ingresa el correo <br/> 
                electrónico registrado y enviaremos un link <br/> 
                para recuperarla.
            </p>
            <input 
              type="email" 
              name="email"
              className={styles.input}
              placeholder="Correo"
            />

            <button type="submit" className={styles.button}>Enviar</button>

            <p className="w-full text-center text-gray-500 text-lg my-5">
                Si no has recibido el link en 40 <br/> 
                segundos, inicie de nuevo el proceso.
            </p>
        </form>
    )
}

export { PassRecoveryFormComponent };
