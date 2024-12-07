type LinkProps = {
    text: string;
    href: string;
    external: boolean;
};

export default function Link(props: LinkProps) {
    return (
        <a
            href={props.href}
            target={props.external ? '_blank' : '_self'}
            className="underline underline-offset-4 dark:text-gray-400 text-gray-700 dark:hover:text-indigo-400 hover:text-indigo-500 text-sm"
        >
            {props.text}
        </a>
    );
}
