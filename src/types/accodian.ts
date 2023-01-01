interface AccodianType {
    name: string,
    children: React.ReactNode
}

type Accodian = ({ name }: AccodianType, { children }: React.PropsWithChildren) => any;

export default Accodian;