/**
 * Evaluates if the given strings are equal, ignoring their casing.
 * @param s1 the first string to compare.
 * @param s2 the second string to compare.
 */
export function compareIgnoringCase(s1: string, s2: string): boolean {
    return s1.toLocaleLowerCase() === s2.toLocaleLowerCase(); 
}

/**
 * Evaluates if the given string is null or empty.
 * @param s the string to evaluate.
 */
export function isNullOrEmpty(s: string): boolean {
    return s === null || s === "";
}

export default {
    isNullOrEmpty,
    compareIgnoringCase
};