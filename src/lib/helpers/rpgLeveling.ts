// Tuning
const XP_PER_HOUR = 100;
const SCALE = 1000;
const EXPONENT = 1.5;

//

// Total XP earned from training time
export function hoursToXP(hours: number): number {
    return hours * XP_PER_HOUR;
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

/**
 * ToDo:// Look at this
  // ===== Tuning =====

// 10,000 hours = 600,000 minutes = 1,000,000 XP
const XP_PER_MINUTE = 1_000_000 / 600_000; // ≈ 1.6666667

// Level curve
const SCALE = 1000;
const EXPONENT = 1.5;

// ==================

// Total XP earned from playtime.
export function minutesToXP(minutes: number): number {
    return minutes * XP_PER_MINUTE;
}

// Total XP required to reach a level.
export function levelToXP(level: number): number {
    return SCALE * Math.pow(level, EXPONENT);
}

// Current level from total XP.
export function xpToLevel(totalXP: number): number {
    return Math.floor(Math.pow(totalXP / SCALE, 1 / EXPONENT));
}

// Progress toward the next level (0.0 - 1.0)
export function levelProgress(totalXP: number): number {
    const level = xpToLevel(totalXP);

    const currentLevelXP = levelToXP(level);
    const nextLevelXP = levelToXP(level + 1);

    return (totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP);
}
 */
