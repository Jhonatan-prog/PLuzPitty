import { AuthComponentPropsType } from "../types/compProps";
import { tailwindStyles as TSCSS} from "../utils/utils.styles.tailwind";
// image
import Logo from "../assets/icon.png";

const AuthLayout = ({title, reference, children, boxChildren}: AuthComponentPropsType) => {
    return (
        <div className={reference + "-page " + `${TSCSS.flexStart}`}>
            <h2 className="title text-5xl pb-5">{title}</h2>

            {children}

            <div className="my-5 w-[150px]">
                <img src={Logo} alt="Logo" />
            </div>
        </div>
    );
}

export default AuthLayout;
