// react
import { useState, ChangeEventHandler } from "react";
import { useFormStatus } from "react-dom";

// styles
import { tailwindStyles as TSCSS} from "../../utils/utils.styles.tailwind";

const styles = {
  form: `${TSCSS.flexStart} flex-col gap-2`,
  label: "text-2xl",
  input: "w-80 h-12 bg-gray-300 my-4 outline-none rounded-[.625rem] px-2 focus:border-3 focus:border-gray-400 text-[1.257rem] placeholder:text-[1.257rem] placeholder:font-medium",
  button: "transition duration-400 text-gray-600 tracking-wide border-none bg-[#95D9DA] hover:bg-[#68c8ca] font-medium py-2 px-4 rounded w-full cursor-pointer",
};

const Checkbox = ({ 
    label, value, onChange 
  }: { 
    label:string, 
    value: boolean, 
    onChange?: ChangeEventHandler<HTMLInputElement>
  }) => {

  const [checked, setChecked] = useState(value);

  return (
    <label className="my-5 flex items-center text-gray-600 text-lg font-medium">
      <input 
        className="mr-2" 
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

const FormLoginComponent = () => {
  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`}>

      <input 
        type="email" 
        name="email"
        className={styles.input}
        placeholder="Email"
        id="" />
      <input 
        type="password" 
        name="password"
        className={styles.input}
        placeholder="Password"
        id="" />

      <Checkbox label="Recordar usuario" value={false} />

      <button type="submit" className={styles.button}>Login</button>
  
    </form>
  );
};

export { FormLoginComponent };
