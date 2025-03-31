import { AuthComponentPropsType } from "../types/compProps";
import { tailwindStyles as TSCSS} from "../utils/utils.styles.tailwind";

const AuthLayout = ({title, reference, children}: AuthComponentPropsType) => {
    return (
        <div className={reference + "-page " + `${TSCSS.flexStart}`}>
            <h2 className="title text-5xl pb-5">{title}</h2>

            {children}
        </div>
    );    
}

export default AuthLayout;
