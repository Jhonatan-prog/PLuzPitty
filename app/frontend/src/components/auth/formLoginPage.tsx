// react
import { useState, ChangeEventHandler } from "react";

// styles
import { tailwindStyles as TSCSS} from "../../utils/utils.styles.tailwind";

const styles = {
  form: `${TSCSS.flexStart} flex-col gap-2`,
  label: "text-2xl",
  input: "w-80 h-12 bg-gray-300 my-1.5 outline-none rounded-[.625rem] px-2 focus:border-3 focus:border-gray-400",
  button: "border-none bg-[#95D9DA] hover:bg-blue-700 font-bold py-2 px-4 rounded w-full cursor-pointer",
};

const Checkbox = ({ 
    label, value, onChange 
  }: { 
    label:string, 
    value: boolean, 
    onChange: ChangeEventHandler<HTMLInputElement>
  }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

const FormLoginComponent = () => {
  return (
    <form action="" method="post" className={`${TSCSS.flexStart}`}>

      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        name="email"
        className={styles.input}
        id="" />

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        name="password"
        className={styles.input}
        id="" />

      <Checkbox label="Recordar usuario" value={false} onChange={() => 1}/>

      <button type="submit" className={styles.button}>Login</button>
  
    </form>
  );
};

export { FormLoginComponent };
