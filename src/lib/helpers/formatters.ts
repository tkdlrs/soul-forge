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

// // convert a string into slug-kabob-spinal-case
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
// convert a string to Pascal Case.
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
// Calculate the duration of a single 'skill session'
export function calculateSessionDurationInMilliseconds(
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
    const durationMilliseconds = Math.abs(end - start);
    //
    // console.log('durationMilliseconds', durationMilliseconds);
    return durationMilliseconds;
}
//
export function convertMillisecondsToMinutes(milliseconds: number): number {
    return milliseconds / 60_000;
}
//
type DateDeltaParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
// export function getDateDeltaParts(a: Date, b: Date): DateDeltaParts {
//     let remaining = Math.abs(b.getTime() - a.getTime());
//     //
//     const days = Math.floor(remaining / 86_400_00);
//     remaining %= 86_400_00;
//     //
//     const hours = Math.floor(remaining / 3_600_000);
//     remaining %= 3_600_000;
//     //
//     const minutes = Math.floor(remaining / 60_000);
//     remaining %= 60_000;
//     //
//     const seconds = Math.floor(remaining / 1_000);
//     remaining %= 1_000;
//     //
//     return {
//         days,
//         hours,
//         minutes,
//         seconds,
//         milliseconds: remaining,
//     };
// }
export function getDateDeltaParts(milliseconds: number): DateDeltaParts {
    let remaining = milliseconds;
    //
    const conversionRates = {
        days: 1000 * 60 * 60 * 24,
        hours: 1000 * 60 * 60,
        minutes: 1000 * 60,
        seconds: 1000,
    };
    //
    const days = Math.floor(remaining / conversionRates['days']);
    remaining %= conversionRates['days'];
    //
    const hours = Math.floor(remaining / conversionRates['hours']);
    remaining %= conversionRates['hours'];
    //
    const minutes = Math.floor(remaining / conversionRates['minutes']);
    remaining %= conversionRates['minutes'];
    //
    const seconds = Math.floor(remaining / conversionRates['seconds']);
    remaining %= conversionRates['seconds'];
    //
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds: remaining,
    };
}
/**
 * Format a time provided in minutes to have the format:
 *   `\d+ days \d+ hours \d+ minutes \d+ seconds`
 **/
export function formatTimeSpentInMilliseconds(milliseconds: number): string {
    const { days, hours, minutes, seconds } = getDateDeltaParts(milliseconds);
    //
    const daysTemplate = days ? `${days}&nbsp;Days <br />` : '';
    const hoursTemplate = hours ? `${hours}&nbsp;Hrs <br />` : '';
    const minutesTemplate = minutes ? `${minutes}&nbsp;Mins <br />` : '';
    const secondsTemplate = seconds ? `${seconds}&nbsp;Secs <br />` : '';
    //
    return `${daysTemplate} ${hoursTemplate} ${minutesTemplate} ${secondsTemplate}`;
}
// Get a currancy range for the minimum wage in the USA
export function convertToCurrancyRange(milliseconds: number): string {
    //
    const totalMinutes = milliseconds / 60_000;

    //
    const lowEndHourlyMinimumWageRate = 7.25; // 2026 Federal min and UT min
    const highEndHourlyMinimumWageRate = 17.5; // 2026 Washington DC min
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
    const lowEndIntlFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(lowEnd);
    const highEndIntlFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(highEnd);
    //
    return `<div class="text-center">${lowEndIntlFormat}<br />&ndash;<br />${highEndIntlFormat}</div>`;
}
//
export function getSkillsTotalMilliseconds(ranges: SkillSession[]): number {
    return ranges.reduce((total, { startDateTime, endDateTime }) => {
        return (
            total +
            calculateSessionDurationInMilliseconds(startDateTime, endDateTime)
        );
    }, 0);
}
//
export function formatDateTimeToLocale(date: Date): string {
    const formattedParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Denver',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        //
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    }).formatToParts(date);
    //
    const get = (type: string) =>
        formattedParts.find((p) => p.type === type)?.value;
    //
    return `${get('year')}-${get('month')}-${get('day')} <br /> ${get('hour')}:${get('minute')}:${get('second')} ${get('timeZoneName')}`;
}
//
