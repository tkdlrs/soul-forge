/**
 * Server Side Skills INDEX page
 **/
import z from 'zod/v4';
import {
    SkillsWithActiveSkillSessionsSchema,
    SkillWithIdSchema,
    type SkillsWithActiveSkillSessions,
} from '$lib/schemas/skillSchema.js';
import {
    SkillSessionSchema,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema';

//
export async function load({ fetch, params }) {
    //
    try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        const skills = z.array(SkillWithIdSchema).parse(result);
        // ToDo:// Determine if each skill is/has 'isActive' boolean and add that to the data.

        //
        const skillSessionResponse = await fetch(`/api/skill-sessions`);
        const skillSessionsResult = await skillSessionResponse.json();
        const skillsWithActiveSessions: string[] = [];
        const skillsIdToActiveSessionMap: Record<string, string> = {};
        //
        let skillSessions: SkillSession[] = [];
        if (skillSessionsResult.length > 0) {
            skillSessions = z
                .array(SkillSessionSchema)
                .parse(skillSessionsResult);
        }
        //
        console.log('skillSessions', skillSessions);
        for (let sSession of skillSessions) {
            if (
                sSession.endDateTime === null &&
                !skillsWithActiveSessions.includes(sSession.id)
            ) {
                skillsWithActiveSessions.push(sSession.skillId);
                skillsIdToActiveSessionMap[sSession.skillId] = sSession.id;
            } else if (skillsWithActiveSessions.includes(sSession.id)) {
                throw new Error('Skill has too many active sessions');
            }
        }
        //
        console.log('skillsWithActiveSessions', skillsWithActiveSessions);
        const skillsWithActive: SkillsWithActiveSkillSessions[] = [];
        for (let i = 0; i < skills.length; i++) {
            if (skillsWithActiveSessions.includes(skills[i].id)) {
                skillsWithActive.push({
                    ...skills[i],
                    isActive: true,
                    activeId: skillsIdToActiveSessionMap[skills[i].id],
                });
            } else {
                skillsWithActive.push({
                    ...skills[i],
                    isActive: false,
                    activeId: '',
                });
            }
        }
        //
        z.array(SkillsWithActiveSkillSessionsSchema).parse(skillsWithActive);
        //
        return {
            skills: skillsWithActive,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
