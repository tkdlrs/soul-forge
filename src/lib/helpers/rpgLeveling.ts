// 10,000 hours = 600,000 minutes = 600,000 XP
// Tuning
const XP_PER_MINUTE = 1;
const SCALE = 600;
const EXPONENT = 1.5;

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
