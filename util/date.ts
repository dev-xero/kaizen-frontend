export function getDateAfter(hours: number = 1): Date {
    const MS_PER_HOUR = 60 * 60 * 1000;
    return new Date(Date.now() + hours * MS_PER_HOUR);
}
