/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout;

    return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
