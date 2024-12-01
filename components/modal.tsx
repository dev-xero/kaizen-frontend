type ModalProps = {
    children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
    return (
        <section className="fixed top-0 left-0 h-screen w-full grid place-items-center">
            <main className="p-4 text-center rounded-md bg-white border border-[#cbd1dd] w-[calc(100vw-16px)] sm:w-[512px] max-w-lg z-[889]">
                {props.children}
            </main>
            <div className="fixed inset-0 h-dvh w-full bg-[#12111A]/80 backdrop-blur-sm z-[888]"></div>
        </section>
    );
}