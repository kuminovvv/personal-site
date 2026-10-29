import type { getResumeContent } from "../model/resume-content";

type CareerUniversityAchievementsProps = { achievements: ReturnType<typeof getResumeContent>["career"]["omsu"]["achievements"]; label: string; };

export const CareerUniversityAchievements = (props: CareerUniversityAchievementsProps) => {
  const {
    achievements,
    label,
  } = props;
  return (
<ol className="mt-5 grid gap-3.5" aria-label={label}>
            {achievements.map((achievement, index) => (
              <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-site-subtle" key={achievement}>
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-site-sage text-[11px] font-semibold text-site-green-text dark:text-site-green">
                  {index + 1}
                </span>
                <span className="pt-0.5">{achievement}</span>
              </li>
            ))}
          </ol>
  );
};
