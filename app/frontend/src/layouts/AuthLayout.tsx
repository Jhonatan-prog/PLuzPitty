import { AuthComponentPropsType } from "../types/compProps";
import { tailwindStyles as TSCSS} from "../utils/utils.styles.tailwind";
// images
import Logo from "../assets/icon-rmBg.png";
import AuthImage from "../assets/auth-image.png";

const AuthLayout = ({title, reference, children}: AuthComponentPropsType) => {
    return (
        <div className={`${TSCSS.gridCenter} grid-cols-2 max-h-[100vh]`}>
            <div className={reference + "-page " + `${TSCSS.flexStart} items-center max-h-[700px] pt-10`}>
                <h2 className="title text-4xl pb-5 w-full text-center">{title}</h2>

                {children}

                <div className="my-5 w-[150px]">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
            <div className={"lib-image relative"}>
                <img className={TSCSS.transformCenter + " " + "min-w-[550px] min-h-[550px]"} src={AuthImage} alt="Authentication Image" />
            </div>
        </div>
    );
}

export default AuthLayout;
