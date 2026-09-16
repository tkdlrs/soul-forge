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
// ToDo:// get this working and have it tested
export function weekViewBaseLabels(today: Date): Array<string> {
    const FLAT_WEEK = WEEKDAYS.flat();
    const WEEK_DAY = getWeekDay(today);
    const TODAY_WEEK = FLAT_WEEK[WEEK_DAY];
    console.log('TODAY_WEEK:', TODAY_WEEK);
    let outputArray = new Array(7);
    let count = 6;
    outputArray[count] = [TODAY_WEEK];
    count--;
    let weekDay = WEEK_DAY - 1;
    do {
        console.log('FLAT_WEEK[weekDay]', FLAT_WEEK[weekDay]);
        outputArray[count] = [FLAT_WEEK[weekDay]];
        //
        count--;
        console.log('count', count);
        if (weekDay <= 0) {
            weekDay += 7;
        }
        weekDay--;
    } while (count >= 0);
    //
    return outputArray;
}
