import { resumeExpertise } from "../model/resume-content";

export const ResumeExpertise = () => (
  <section className="mt-8" aria-labelledby="resume-expertise-title">
    <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">02 / ПРАКТИЧЕСКАЯ ЭКСПЕРТИЗА</p>
    <h2 id="resume-expertise-title" className="mt-2 font-heading text-[clamp(22px,2.3vw,30px)] leading-tight font-bold tracking-[-0.035em]">
      Инженерные задачи, которые я решаю
    </h2>
    <div className="mt-6 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1 max-[680px]:gap-3">
      {resumeExpertise.map((item, index) => (
        <article className="min-h-39 rounded-[18px] bg-site-surface p-6 max-[680px]:min-h-0" key={item.title}>
          <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-[17px] leading-snug font-semibold">{item.title}</h3>
          <p className="mt-2.5 text-[14px] leading-[1.5] text-site-subtle">{item.description}</p>
        </article>
      ))}
    </div>
  </section>
);
