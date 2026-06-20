import { relations } from 'drizzle-orm';
//
import { skillsTable } from './schema/skills';
import { usersTable } from './schema/users';
import { skillSessionsTable } from './schema/skill-sessions';

// User relations
export const userRelations = relations(usersTable, ({ many }) => ({
    skills: many(skillsTable),
    //
    skillSessions: many(skillSessionsTable),
}));

// Skill relations
export const skillsRelations = relations(skillsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [skillsTable.userId],
        references: [usersTable.id],
    }),

    sessions: many(skillSessionsTable),
}));

// Skill session relations
export const skillSessionsRelations = relations(
    skillSessionsTable,
    ({ one }) => ({
        user: one(usersTable, {
            fields: [skillSessionsTable.userId],
            references: [usersTable.id],
        }),
        //
        skill: one(skillsTable, {
            fields: [skillSessionsTable.skillId],
            references: [skillsTable.id],
        }),
    }),
);

//
