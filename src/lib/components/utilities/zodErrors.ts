import type z from 'zod/v4';

// For individual form inputs
export function mapZodErrorsToUI<T>(
    error: z.ZodError<T>,
    optionalFields: string[] = [],
): Record<string, unknown> {
    const errors: Record<string, unknown> = {};
    //
    for (const issue of error.issues) {
        const fieldName = issue.path[0] as string;
        if (
            optionalFields.includes(fieldName) &&
            issue.code === 'invalid_type'
        ) {
            continue;
        }
        //
        let current = errors;
        //
        for (let i = 0; i < issue.path.length - 1; i++) {
            const key = issue.path[i] as string | number;
            const nextKey = issue.path[i + 1];
            //
            if (typeof nextKey === 'number') {
                if (!Array.isArray(current[key])) current[key] = [];
            } else {
                if (!current[key] || typeof current[key] !== 'object')
                    current[key] = {};
            }
            //
            current = current[key] as Record<string, unknown>;
        }
        //
        const lastKey = issue.path[issue.path.length - 1] as string | number;
        current[lastKey] = issue.message;
    }
    //
    return errors;
}
/**
 * Start section to add error notice at top of form
 */
// re-shape data for pretty print
type FlattenedFieldErrors = Record<string, string[] | undefined>;

type NestedKeyConfig = {
    header: string;
    key: string;
};

export function prepareErrorsForPrettyPrint(
    fieldErrors: FlattenedFieldErrors,
    nestedKeys: NestedKeyConfig[] = [],
): {
    topLevel: FlatErrors;
    sections: NestedErrorSection[];
} {
    const nestedKeyNames = nestedKeys.map((n) => n.key);

    const topLevel: FlatErrors = Object.fromEntries(
        Object.entries(fieldErrors)
            .filter(([key]) => !nestedKeyNames.includes(key))
            .map(([key, messages]) => [key, messages?.[0] ?? null]),
    );

    const sections: NestedErrorSection[] = nestedKeys.map(({ header, key }) => {
        const raw = fieldErrors[key];
        const errors = raw?.map((message) => ({ message })) ?? [];
        return { header, errors };
    });

    return { topLevel, sections };
}
// Pretty Print Zod Errors in Box at the top of the form
type NestedErrorSection = {
    header: string;
    errors:
        | (Record<string, string | null | undefined> | null)[]
        | null
        | undefined;
};

type FlatErrors = Record<string, string | null | undefined>;

export function prettyPrintZodErrors(
    topLevel: FlatErrors | null,
    sections: NestedErrorSection[] = [],
): string {
    if (!topLevel && sections.length === 0) return '';

    const buildList = (items: string[]): string =>
        `<ul class="listcol-lg-2">\n${items.map((item) => `<li>${item}</li>`).join('')}\n</ul>`;

    const buildSection = (header: string, items: string[]): string =>
        `<p><strong>${header} Section Errors</strong>:</p>\n${buildList(items)}`;

    const topLevelItems = Object.values(topLevel ?? {}).filter(
        (item): item is string => item != null,
    );

    const topLevelSection =
        topLevelItems.length > 0 ? buildSection('', topLevelItems) : '';

    const nestedSections = sections
        .map(({ header, errors }) => {
            const items =
                errors?.flatMap((entry) =>
                    entry
                        ? Object.values(entry).filter(
                              (item): item is string => item != null,
                          )
                        : [],
                ) ?? [];
            return items.length > 0 ? buildSection(header, items) : '';
        })
        .filter(Boolean);
    //
    return [topLevelSection, ...nestedSections].filter(Boolean).join('\n');
}
