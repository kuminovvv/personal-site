import type { getResumeContent } from "../model/resume-content";

type CareerProjectAchievementsProps = { achievements: ReturnType<typeof getResumeContent>["career"]["gazprom"]["achievements"]; label: string; };

export const CareerProjectAchievements = (props: CareerProjectAchievementsProps) => {
  const {
    achievements,
    label,
  } = props;
  return (
<ol className="mt-6 grid grid-cols-2 gap-4 max-[680px]:grid-cols-1" aria-label={label}>
            {achievements.map((achievement, index) => (
              <li className="rounded-[16px] bg-site-soft p-4" key={achievement.title}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{String(index + 1).padStart(2, "0")}</span>
                  <h4 className="text-[14px] leading-snug font-semibold">{achievement.title}</h4>
                </div>
                <p className="mt-2 text-[13px] leading-[1.5] text-site-subtle">{achievement.description}</p>
              </li>
            ))}
          </ol>
  );
};
