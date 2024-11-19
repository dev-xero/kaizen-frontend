type CenteredGridProps = {
    children: JSX.Element;
};

export default function CenteredGridLayout(props: CenteredGridProps) {
    return (
        <main className="w-full h-dvh grid grid-cols-1 place-items-center">
            {props.children}
        </main>
    );
}
