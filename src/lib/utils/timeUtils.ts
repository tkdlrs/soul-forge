import { getWeekDay } from '$lib/helpers/formatters';
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
