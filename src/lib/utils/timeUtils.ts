import { formatDateTimeToLocale, getWeekDay } from '$lib/helpers/formatters';
//
export const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
//
export function weekViewBaseLabels(today: Date): Array<string[]> {
    let outputArray = new Array(7);
    //
    const WEEK_DAY_INDEX = getWeekDay(today);
    const TODAY_WEEK = WEEKDAYS[WEEK_DAY_INDEX];
    //
    let count = 6;
    let dayBeforeIndex = WEEK_DAY_INDEX;
    //
    outputArray[count] = [TODAY_WEEK];
    //
    do {
        //
        count--;
        dayBeforeIndex--;
        //
        if (dayBeforeIndex < 0) {
            dayBeforeIndex += 7;
        }
        if (dayBeforeIndex < 0 || dayBeforeIndex > 6) {
            throw new Error('Out of bounds');
        }
        //
        outputArray[count] = [WEEKDAYS[dayBeforeIndex]];
        //
    } while (count > 0);
    //
    return outputArray;
}
//
export function getSevenDatesToToday(today: Date): string[] {
    let outputArray = new Array(7);
    //
    let thisDay = today;
    for (let i = 6; i >= 0; i--) {
        outputArray[i] = formatDateTimeToLocale(thisDay).slice(0, 10);
        thisDay = daysBefore(thisDay, 1);
    }
    //
    if (outputArray.length !== 7) {
        throw new Error('Incorrect length for seven dates array ');
    }
    return outputArray;
}
//
function daysBefore(from: Date, n: number): Date {
    const d = new Date(from);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - n);
    return d;
}
