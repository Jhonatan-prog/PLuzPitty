// This file contains the types for the component props
import { ReactNode } from "react";

type GlobalPropsType = {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
}

type AuthComponentPropsType = {
    reference: string;
    title: string;
    children: ReactNode;
    boxChildren?: ReactNode;
}

type LabelProps = {
    reference: string, 
    message: string, 
    isValid: boolean, 
    userInput: string
}

export type { GlobalPropsType, AuthComponentPropsType, LabelProps };
