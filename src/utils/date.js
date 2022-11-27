import moment from "moment";

const getLastNDays = (n, format, date) => {
    if (typeof date === "undefined" || date == null) {
        date = moment()
    } else {
        date = moment(date)
    }
    const lastNDay = date.subtract(n, "days")
    const days = []
    for (let i = 0; i < n; i++) {
        days.push(lastNDay.add(1, 'days').format(format))
    }
    return days
}

const getLastMonthDays = (format, date) => {
    let today = new Date()
    const lastMonthDate = moment(today).subtract(1, 'months')
    const differ = moment(today).diff(lastMonthDate, 'days') + 1
    console.log(differ, today, lastMonthDate)
    return getLastNDays(differ, format, date)
}

export {
    getLastNDays,
    getLastMonthDays
}
