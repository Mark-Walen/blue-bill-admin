import moment from "moment";

const getLastNDaysOrMonth = (n, format, unit, date) => {
    if (typeof date === "undefined" || date == null) {
        date = moment();
    } else {
        date = moment(date);
    }

    if (unit === 'mm' || unit === 'MM' || unit === 'month' || unit === 'months') {
        unit = 'months'
    } else {
        unit = 'days'
    }
    console.log(unit);

    const lastNDayOrMonth = date.subtract(n, unit);
    const dates = [];
    for (let i = 0; i < n; i++) {
        dates.push(lastNDayOrMonth.add(1, unit).format(format));
    }
    console.log(dates);
    return dates;
};

const getLastMonthDays = (format, date) => {
    let today = moment();
    const lastMonthDate = today.subtract(1, "months");
    const differ = today.diff(lastMonthDate, "days") + 1;
    return getLastNDaysOrMonth(differ, format, date, 'd');
};

export {
    getLastNDaysOrMonth,
    getLastMonthDays,
};
