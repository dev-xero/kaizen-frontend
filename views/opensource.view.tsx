const openSourceLibraries = [
    {
        name: 'NextJS',
        url: 'https://nextjs.org',
        description:
            'Fast and optimized web framework based on React with SSR capabilities.',
    },
    {
        name: 'TailwindCSS',
        url: 'https://tailwindcss.com',
        description: 'Styling library using CSS-in-code via utility classes.',
    },
    {
        name: 'Shadcn UI',
        url: 'https://ui.shadcn.com',
        description: 'Radix UI based minimal component library for React.',
    },
    {
        name: 'Axios',
        url: 'https://axios-http.com',
        description: 'Robust http fetch API wrapper for modern applications.',
    },
    {
        name: 'Lottie React',
        url: 'https://lottiereact.com',
        description: 'Aesthetically animated components via Lottie.json',
    },
    {
        name: 'Phosphor Icons',
        url: 'https://phosphoricons.com',
        description: 'Minimal svg icon library.',
    },
    {
        name: 'Hello Pangea DnD',
        url: 'https://github.com/hello-pangea/dnd',
        description:
            'Fork of react-beautiful-dnd with a clean drag-and-drop API.',
    },
];

export default function OpenSourceView() {
    return (
        <section className="font-[family-name:var(--font-geist-sans)]">
            <div className="bg-gray-900 p-4 py-8 my-4 text-center rounded-md jigsaw">
                <h2 className="font-bold text-2xl text-white">Open Source</h2>
            </div>
            <h2 className="text-2xl font-bold mb-2">About Kaizen</h2>
            <p className="text-gray-700 text-lg">
                Kaizen is an Open Source web application that makes creating and
                managing tasks a breeze with an intuitive yet minimal interface.
                Kaizen would not have been possible without the various open
                source projects it depends on.
            </p>

            <section className="my-6">
                <p className="text-xl font-bold">Acknowledgments</p>
                <p className="text-gray-700 my-2">
                    We express our gratitude to the developers and maintainers
                    of these open-source projects. Their dedication and effort
                    have made Kaizen possible and continue to empower the
                    developer community globally.
                </p>
            </section>

            <section className="my-6">
                <p className="text-xl font-bold">Libraries</p>
                <ul className="my-2">
                    {openSourceLibraries.map((lib, id) => (
                        <li key={id} className="mb-2 ml-2">
                            <p className="text-gray-700">
                                <a
                                    href={lib.url}
                                    target="_blank"
                                    className="underline underline-offset-4 text-primary"
                                >
                                    {lib.name}
                                </a>
                                : {lib.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="my-6">
                <p className="text-xl font-bold">Contribute to Kaizen</p>
                <p className="text-gray-700 my-2">
                    Kaizen is a project currently maintained by{' '}
                    <a href="https://github.com/dev-xero" target="_blank" className="underline underline-offset-4">
                        Xero
                    </a>
                    . If you&apos;d like to contribute, report issues, or
                    suggest improvements, visit the GitHub repository.
                </p>
                <a
                    href="https://github.com/dev-xero/kaizen-frontend"
                    target="_blank"
                    className="underline underline-offset-4 text-primary"
                >
                    Contribute on GitHub
                </a>
            </section>

            <section className="text-gray-700 my-6">
                Kaizen is currently licensed under <b>GPL-v3</b>.
            </section>
        </section>
    );
}
