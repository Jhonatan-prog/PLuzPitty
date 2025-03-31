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

export type { GlobalPropsType, AuthComponentPropsType };
