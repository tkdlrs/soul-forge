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
        // `load` is server side and server side will never know what 'sessionStorage' is
        // so I'm not sure how to get it so the requests have the 'accessToken' in their
        // 'Authorization' header.
        // ToDo:// figure out how to handle authentication.
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Not authenticated');
        }
        //
        const response = await fetch('/api/skills', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const result = await response.json();
        const skills = z.array(SkillWithIdSchema).parse(result);
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
        // console.log('skillSessions', skillSessions);
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
        // console.log('skillsWithActiveSessions', skillsWithActiveSessions);
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
            skillSessions,
            //
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
