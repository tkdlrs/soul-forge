import type { SkillSession } from '$lib/schemas/skillSessionSchema';

/**
 *
 **/
export function printJSON(obj: any): string {
    return JSON.stringify(obj, null, 2);
}
// Makes the first letter of a word uppercase and returns the word
export function upperCaseFirstLetter(name: string) {
    const properName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    return properName;
}

// // convert a string into slug/ kabob case
export function slugCase(name: string): string {
    if (!name) return '';
    const symbolsRegex = /[^a-z \-]/gi;
    //
    name = name.toString().trim();
    //
    if (name.includes(' ')) {
        return name
            .toString()
            .toLowerCase()
            .trim()
            .replace(symbolsRegex, '')
            .split(' ')
            .join('-');
    } else {
        return name.toString().toLowerCase().trim().replace(symbolsRegex, '');
    }
}
// convert a string to
export function pascalCase(strOfWords: string) {
    const slugify = slugCase(strOfWords);
    const arrWords = slugify.split('-');
    const pascalCase = arrWords
        .map((word: string) => upperCaseFirstLetter(word))
        .join('');
    return pascalCase;
}
// Format a date to local timezone
export function toDateTimeLocal(date: Date) {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}
//
export function calculateSessionDuration(
    startDateTime: Date,
    endDateTime: Date | null,
): number {
    if (endDateTime === null) {
        return 0;
    }
    //
    if (endDateTime.getTime() < startDateTime.getTime()) {
        console.error('End before start');
        throw new Error('End before start');
    }
    //
    const start = startDateTime.getTime();
    const end = endDateTime.getTime();
    // milliseconds
    const durationMilliseconds = end - start;
    const durationMinutes = durationMilliseconds / 60000;
    //
    return durationMinutes;
}
//
export function formatTimeSpentOnSkill(totalMinutes: number): string {
    // extract hours
    const totalHours = Math.floor(totalMinutes / 60);
    // console.log('totalHours:', totalHours);
    const remainingMinutes = Math.floor(totalMinutes - totalHours * 60);
    // console.log('remainingMinutes', remainingMinutes);
    const remainingSecondsInMinutes =
        totalMinutes - totalHours * 60 - remainingMinutes;
    // console.log('remainingSecondsInMinutes', remainingSecondsInMinutes);

    //
    const hoursTemplate =
        Math.floor(totalHours) > 0 ? `${totalHours.toFixed(0)} hours` : '';
    const minutesTemplate =
        Math.floor(remainingMinutes) > 0
            ? `${remainingMinutes.toFixed(0)} minutes`
            : '';
    //
    return `${hoursTemplate} ${minutesTemplate}`;
}
//
export function convertToCurrancyRange(totalMinutes: number): string {
    const lowEndHourlyMinimumWageRate = 7.25; // 2026 Federal min and UT min
    const highEndHourlyMinimumWageRate = 17.5; // 2026 Washington DC
    //
    const lowEndHourlyRateInPennies = lowEndHourlyMinimumWageRate * 100;
    const highEndHourlyRateInPennies = highEndHourlyMinimumWageRate * 100;
    //
    const lowEndMinutesRateInPennies = lowEndHourlyRateInPennies / 60;
    const highEndMinutesRateInPennies = highEndHourlyRateInPennies / 60;
    //
    const lowEnd = (lowEndMinutesRateInPennies * totalMinutes) / 100;
    const highEnd = (highEndMinutesRateInPennies * totalMinutes) / 100;
    //
    return `$${lowEnd.toFixed(2)} &ndash; $${highEnd.toFixed(2)}`;
}
//
export function getSkillsTotalMinutes(ranges: SkillSession[]): number {
    return ranges.reduce((total, { startDateTime, endDateTime }) => {
        return total + calculateSessionDuration(startDateTime, endDateTime);
    }, 0);
}
//
