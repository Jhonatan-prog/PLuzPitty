// styles/ types
import { tailwindStyles as TSCSS } from '../../styles/styles.tailwind';

const styles = TSCSS.auth;

const PassResetFormComponent = () => {
  return (
    <form
      action=""
      method="post"
      className={`${TSCSS.flexStart} place-items-center`}
    >
      <input
        type="password"
        name="password"
        className={styles.input}
        placeholder="password"
      />

      <input
        type="password confirm"
        name="password-confirm"
        className={styles.input}
        placeholder="Password Confirmation"
      />

      <button type="submit" className={styles.button}>
        Cambiar
      </button>
    </form>
  );
};

export { PassResetFormComponent };
