import {
    formatDate,
    formatMonth,
    formatYear,
    formatTime,
} from './humanReadable';

export const groupByDate = (items, by, role) => {
    let formatFunc = formatTime;
    if (by === 'date') formatFunc = formatDate;
    if (by === 'month') formatFunc = formatMonth;
    if (by === 'year') formatFunc = formatYear;

    return items
        .map((item) => {
            return {
                amountToGD:
                    role === 'admin'
                        ? item.amountToGD.$numberDecimal
                        : item.amountToStore.$numberDecimal,
                createdAt: formatFunc(item.createdAt),
            };
        })
        .reduce((acc, value) => {
            if (!acc[value.createdAt]) {
                acc[value.createdAt] = 0;
            }

            acc[value.createdAt] += parseFloat(value.amountToGD);
            return acc;
        }, {});
};

export const groupByJoined = (items, by) => {
    let formatFunc = formatTime;
    if (by === 'date') formatFunc = formatDate;
    if (by === 'month') formatFunc = formatMonth;
    if (by === 'year') formatFunc = formatYear;

    return items
        .map((item) => {
            return {
                createdAt: formatFunc(item.createdAt),
            };
        })
        .reduce((acc, value) => {
            if (!acc[value.createdAt]) {
                acc[value.createdAt] = 0;
            }

            acc[value.createdAt] += 1;
            return acc;
        }, {});
};
