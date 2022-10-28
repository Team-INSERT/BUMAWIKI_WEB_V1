import { PropsWithChildren, ReactNode } from "react";

interface AccodianType {
    name: string,
    children: ReactNode
}

type Accodian = ({ name }: AccodianType, { children }: PropsWithChildren) => any;

export default Accodian;