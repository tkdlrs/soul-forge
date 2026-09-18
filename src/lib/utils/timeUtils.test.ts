import { describe, expect, it } from 'vitest';
import { weekViewBaseLabels } from './timeUtils';

//
//
describe('weekViewBaseLabels', () => {
    //
    it('Should have length seven (7)', () => {
        const result = weekViewBaseLabels(new Date());
        expect(result).toHaveLength(7);
    });
    //
    // Takes a 0 index number representing the week day and returns an array of seven days
    //
    it('Returns an array of the seven weekdays leading up to a Sunday.', () => {
        const aSunday = new Date('2026-09-13T12:00:00');
        const flatExpected = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aSunday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Monday.', () => {
        const aMonday = new Date('2026-09-14T12:00:00');
        const flatExpected = [
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aMonday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Tuesday.', () => {
        const aTuesday = new Date('2026-09-15T12:00:00');
        const flatExpected = [
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aTuesday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Wednesday.', () => {
        const aWendesday = new Date('2026-09-16T12:00:00');
        const flatExpected = [
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aWendesday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Thursday.', () => {
        const aThursday = new Date('2026-09-17T12:00:00');
        const flatExpected = [
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aThursday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Friday.', () => {
        const aFriday = new Date('2026-09-18T12:00:00');
        const flatExpected = [
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aFriday);
        //
        expect(result).toEqual(expected);
    });
    //
    it('Returns an array of the seven weekdays leading up to a Saturday.', () => {
        const aSaturday = new Date('2026-09-19T12:00:00');
        const flatExpected = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const expected = flatExpected.map((item) => [item]);
        const result = weekViewBaseLabels(aSaturday);
        //
        expect(result).toEqual(expected);
    });
    //
});
//
