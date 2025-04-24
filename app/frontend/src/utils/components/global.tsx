import { LabelProps } from "../../types/compProps";

const Label = () => {
    return (
    <label htmlFor="">

    </label>
    )
}

const LabelForInvalidInput = ({ reference, message, isValid, userInput }: LabelProps) => {
    return (
      <label 
        htmlFor={reference} 
        className={`
          absolute bottom-[-4px] left-1 opacity-0 transition-all duration-500 text-sm font-semibold tracking-wide 
          ${(isValid || userInput === "") ? '' : 'opacity-100 text-red-300 bottom-[-10px] left-3'}
        `}>
        {message}
      </label>
    )
}

export { LabelForInvalidInput };
