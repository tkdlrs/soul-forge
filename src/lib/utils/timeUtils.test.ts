import { describe, expect, it } from 'vitest';
import { weekViewBaseLabels } from './timeUtils';

//
//
describe('weekViewBaseLabels', () => {
    // Takes a 0 index number representing the week day and returns an array of seven days
    it('Returns an array of the weekday seven days beforea a Sunday ', () => {
        const aTuesday = new Date('2026-09-15');
        const result = weekViewBaseLabels(aTuesday);
        console.log('result', result);
        expect(result).toEqual([
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
        ]);
    });
    //
    it('Returns an array of the weekday seven days beforea a Sunday ', () => {
        const aSunday = new Date('2026-09-12');
        const result = weekViewBaseLabels(aSunday);
        console.log('result', result);
        expect(result).toEqual([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]);
    });
    //
    it('To have length seven (7)', () => {
        const result = weekViewBaseLabels(new Date());
        expect(result).toHaveLength(7);
    });
    //
});
// long day. I'll be back tomorrow.

//
