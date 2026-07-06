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
