export function getDateAfter(hours: number = 1): Date {
    const MS_PER_HOUR = 60 * 60 * 1000;
    return new Date(Date.now() + hours * MS_PER_HOUR);
}

export const transformMonth = (month: number) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return months[month];
};

export const transformWeekDay = (weekday: number) => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[weekday];
};
