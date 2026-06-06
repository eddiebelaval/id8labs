import { SkillCard } from './SkillCard'
import type { Skill } from '@/lib/skill-types'

interface ServerSkillsGridProps {
    skills: Skill[]
    totalCount: number
}

/**
 * Server-rendered skills grid.
 * Filtering is done server-side, this just displays the results.
 */
export function ServerSkillsGrid({ skills, totalCount }: ServerSkillsGridProps) {
    if (skills.length === 0) {
        return (
            <div className="text-center py-16 border border-[var(--hair)]">
                <h3 className="font-[family-name:var(--font-display)] font-normal text-xl mb-2 text-[var(--ink)]">No skills found</h3>
                <p className="text-[var(--muted)]">
                    Try adjusting your filters or search terms
                </p>
            </div>
        )
    }

    return (
        <div>
            {/* Results count */}
            <div className="mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                Showing <span className="text-[var(--ink)]">{skills.length}</span>
                {skills.length !== totalCount && (
                    <> of <span className="text-[var(--ink)]">{totalCount}</span></>
                )} items
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} enableFlip />
                ))}
            </div>
        </div>
    )
}
