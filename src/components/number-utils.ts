/**
 * Evaluates if the given number is null or NaN.
 * @param n the number to evaluate.
 */
export function isNullOrNaN(n: number): boolean {
    return n === null || Number.isNaN(n);
}

export default {
    isNullOrNaN,
};