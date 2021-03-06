import {
    dateDiffString,
    dateWithFromNow,
    ensureUrlWithProtocol,
    formatDate
} from '../formatters';

import { unknownValueString } from '../constants';

const invalidDates = ['abc', -200, 0];
// Matches strings in the form 01/01/2000 01:01:00 PM  (5 minutes ago)
const dateWithAgoRegex = /^[\w\/:\s]+ (AM|PM)\s+UTC\s+\([a\d] (minute|hour|day|second)s? ago\)$/;
const dateRegex = /^[\w\/:\s]+ (AM|PM)/;

describe('dateWithFromNow', () => {
    invalidDates.forEach(v =>
        it(`returns a constant string for invalid date: ${v}`, () => {
            expect(dateWithFromNow(new Date(v))).toEqual(unknownValueString);
        })
    );

    // Not testing this extensively because it's relying on moment, which is well-tested
    it('Returns a reasonable date string with (ago) text for valid inputs', () => {
        const date = new Date();
        expect(dateWithFromNow(new Date(date.getTime() - 65000))).toMatch(
            dateWithAgoRegex
        );
    });
});

describe('formatDate', () => {
    invalidDates.forEach(v =>
        it(`returns a constant string for invalid date: ${v}`, () => {
            expect(formatDate(new Date(v))).toEqual(unknownValueString);
        })
    );

    it('returns a reasonable date string for valid inputs', () => {
        expect(formatDate(new Date())).toMatch(dateRegex);
    });
});

describe('dateDiffString', () => {
    invalidDates.forEach(v =>
        it(`returns a constant string for invalid date on left side: ${v}`, () => {
            expect(dateDiffString(new Date(v), new Date())).toEqual(
                unknownValueString
            );
        })
    );

    invalidDates.forEach(v =>
        it(`returns a constant string for invalid date on right side: ${v}`, () => {
            expect(dateDiffString(new Date(), new Date(v))).toEqual(
                unknownValueString
            );
        })
    );

    // Values are offset in milliseconds and expected string value
    const cases: [number, string][] = [
        [5, unknownValueString], // values less than 1s are invalid (for now)
        [1000, '1s'],
        [60000, '1m'],
        [61000, '1m 1s'],
        [60 * 60000, '1h'],
        [60 * 60000 + 1000, '1h 1s'],
        [60 * 60000 + 60000, '1h 1m'],
        [60 * 60000 + 61000, '1h 1m 1s'],
        // For values greater than a day, we just use the hour value
        [24 * 60 * 60000, '24h'],
        [24 * 60 * 60000 + 61000, '24h 1m 1s']
    ];

    cases.forEach(([offset, expected]) =>
        it(`should return ${expected} for an offset of ${offset}`, () => {
            const now = new Date();
            const later = new Date(now.getTime() + offset);
            expect(dateDiffString(now, later)).toEqual(expected);
        })
    );
});

describe('ensureUrlWithProtocol', () => {
    // input and expected result
    const cases: [string, string][] = [
        ['localhost', 'https://localhost'],
        ['http://localhost', 'http://localhost'],
        ['https://localhost', 'https://localhost']
        // There could be more test cases, but this function is only designed
        // to add a protocol if missing and preserve http:// if it is used
    ];

    cases.forEach(([input, expected]) =>
        it(`should produce ${expected} with input ${input}`, () => {
            expect(ensureUrlWithProtocol(input)).toEqual(expected);
        })
    );
});
