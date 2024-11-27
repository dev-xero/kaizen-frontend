type MainViewProps = {
    screen: React.ReactNode;
};

export default function MainView({ screen }: MainViewProps) {
    return (
        <section className="col-span-5 h-dvh w-full bg-[#ECEDEF] p-4">
            {screen}
        </section>
    );
}
