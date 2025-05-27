// react
import { memo, useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../hooks/useAppDispatch';
// styles, types
import { AuthComponentPropsType } from '../types/compProps';
import { tailwindStyles as TSCSS } from '../styles/styles.tailwind';
import { decodeJwtPayload } from '../utils/encode';
import Cookies from "js-cookie";
// images
import Logo from '../assets/icon-rmBg.png';
import BButton from '../assets/back-button.svg';
import AuthImage from '../assets/auth-image.png';

const AuthLayout = memo(
  ({ title, reference, children }: AuthComponentPropsType) => {
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const [authImageSrc, setAuthImageSrc] = useState<string | null>(null);

    const auth = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      const handleResize = () => {
        const large = window.innerWidth >= 768;
        setIsLargeScreen(window.innerWidth >= 768);

        if (large && !authImageSrc) {
          import('../assets/auth-image.png').then((module) => {
            setAuthImageSrc(module.default); // ES modules default export
          });
        }
      };

      // Initial check
      handleResize();

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (auth.isAuthenticated) {
      const email = decodeJwtPayload(Cookies.get("token")).unique_name

      children = <p className='my-4 text-xl'>Actualmente te encuentras autenticado en <br/> la aplicación con el correo: "{email}".</p>

      setTimeout(() => {
        navigate('/')
      }, 3000);
    }

    const backButtonEvent = () => {
      return history.back();
    };

    return (
      <Fragment>
        {reference.trim().toLocaleLowerCase() !== 'login' && (
          <button
            className="absolute back-button top-0 left-0 m-2.5 w-[45px] h-[45px] flex justify-start items-center pt-3 cursor-pointer"
            onClick={backButtonEvent}
          >
            <img src={BButton} alt="back-button" />
          </button>
        )}

        <div
          className={`${TSCSS.gridCenter} h-full md:grid-cols-2 w-full overflow-hidden`}
        >
          <div
            className={
              reference +
              '-page ' +
              `${TSCSS.flexStart} max-h-[600px] items-center pt-3`
            }
          >
            <h2 className="title text-4xl text-[#1F271B] pb-5 w-full text-center">
              {title}
            </h2>

            {children}

            <div className="relative right-4 w-[150px]">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          {isLargeScreen && (
            <div className="lib-image relative w-full h-full">
              <img
                className={
                  TSCSS.transformCenter +
                  ' min-w-[500px] w-full h-auto max-w-[700px]'
                }
                src={AuthImage}
                alt="Authentication Image"
              />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
);

export default AuthLayout;
