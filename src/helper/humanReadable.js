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
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const humanReadableDate = (date) => {
    date = new Date(date);
    return (
        date.getFullYear() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getDate() +
        ', ' +
        days[date.getDay()] +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()
    );
};

export const formatDate = (date) => {
    return (
        new Date(date).getFullYear() +
        '/' +
        new Date(date).getMonth() +
        '/' +
        new Date(date).getDate()
    );
};

export const formatMonth = (date) => {
    return new Date(date).getFullYear() + '/' + new Date(date).getMonth();
};

export const formatYear = (date) => {
    return new Date(date).getFullYear();
};

export const formatTime = (date) => {
    date = new Date(date);
    return (
        date.getFullYear() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getDate() +
        ', ' +
        days[date.getDay()] +
        ' ' +
        date.getHours() +
        'h'
    );
};
