type ErrorMessageProps = {
    msg: string;
};

export default function ErrorMessage({ msg }: ErrorMessageProps) {
    return <p className="my-2 text-red-500 text-sm dark:text-red-400">{msg}</p>;
}
