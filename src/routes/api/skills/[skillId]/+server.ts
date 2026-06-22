import { updateSkill } from '$lib/server/repositories/skill.repository';

// Get all the sessions for a single skill that belongs to a single user
export async function POST({ request }) {
    //
}
// Allow user to update the skill name and icon.
export async function PUT({ params, request }) {
    //
    const body = await request.json();
    //
    const skill = await updateSkill(id, {
        name: body.name,
        icon: body.icon,
    });
}
