import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { LabelProps } from '../../types/compProps';
import { tailwindStyles } from '../../styles/styles.tailwind';
import sadFace from '../../assets/sad-face.png';

const TSCSS = tailwindStyles;

const Label = () => {
  return <label htmlFor=""></label>;
};

const LabelForInvalidInput = ({
  reference,
  message,
  isValid,
  userInput,
}: LabelProps) => {
  return (
    <label
      htmlFor={reference}
      className={`
          absolute bottom-[-4px] left-1 opacity-0 transition-all duration-500 text-sm font-semibold tracking-wide 
          ${isValid || userInput === '' ? '' : 'opacity-100 text-red-300 bottom-[-10px] left-3'}
        `}
    >
      {message}
    </label>
  );
};

const ErrorBlock = ({ errorMessage }: {errorMessage: string}) => {

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'auth/setErrorServer', payload: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [auth.serverError]);

  return (
  <div 
    className={`transition-all duration-500 ${TSCSS.xAxisCenter} ${TSCSS.flexBetween} ${auth.serverError ? 'top-[10px]' : 'top-[-70px]'} z-50 h-[80px] px-6 bg-[#95D9DA] rounded-[.625rem] align-middle text-[1.257rem] font-semibold`}>
    <img src={sadFace} alt="sad-face" className='w-[60px] h-[60px] mr-5' />
    <p>{errorMessage}</p>
  </div>
  );
};

export { LabelForInvalidInput, ErrorBlock };
