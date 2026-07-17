// 10,000 hours = 600,000 minutes = 600,000 XP ~means SCALE would need to be 600
// if wanted level 100 to mean you did at least an hour a day for 90% of the year
// 328.5 is 90% of 365.
// 328.5 * 60 = 19_710.
// scale becomes 19.71
// Tuning
const XP_PER_MINUTE = 1;
const SCALE = 19.71;
const EXPONENT = 1.5;
const MS_PER_MINUTE = 60_000;
//
export function xpToMilliseconds(xp: number): number {
    return xp * MS_PER_MINUTE;
}
// Total XP earned from training time
export function minutesToXP(minutes: number): number {
    return minutes * XP_PER_MINUTE;
}
// Total XP required to reach a level
export function levelToXP(level: number): number {
    return SCALE * Math.pow(level, EXPONENT);
}
// Current level from total XP
export function xpToLevel(totalXP: number): number {
    return Math.floor(Math.pow(totalXP / SCALE, 1 / EXPONENT));
}
// Progress toward the next level (0.0 - 1.0)
export function levelProgress(totalXP: number): number {
    const level = xpToLevel(totalXP);
    //
    const currentLevelXP = levelToXP(level);
    const nextLevelXP = levelToXP(level + 1);
    //
    return (totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP);
}
//
export function xpToNextLevel(totalXP: number): number {
    const level = xpToLevel(totalXP);
    //
    const nextLevelXP = levelToXP(level + 1);
    //
    return Math.max(0, Math.ceil(nextLevelXP - totalXP));
}
//
export function currentXpEarnedAtLevel(totalXP: number): number {
    const level = xpToLevel(totalXP);
    //
    const currentLevelXP = levelToXP(level);
    //
    return totalXP - currentLevelXP;
}
//
export function remainingXpToNextLevel(totalXP: number): number {
    const level = xpToLevel(totalXP);
    //
    const currentLevelXP = levelToXP(level);
    const nextLevelXP = levelToXP(level + 1);
    //
    return nextLevelXP - currentLevelXP;
}
