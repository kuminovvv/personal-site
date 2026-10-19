import { resumeHighlights } from "../model/resume-content";

export const ResumeHighlights = () => (
  <section className="mt-8 grid grid-cols-3 gap-5 max-[680px]:grid-cols-1 max-[680px]:gap-3" aria-label="Кратко об опыте">
    {resumeHighlights.map((item) => (
      <div className="flex min-h-28 flex-col justify-center rounded-[19px] bg-site-surface px-8 py-6 max-[900px]:px-5 max-[680px]:min-h-23 max-[680px]:px-6" key={item.value}>
        <strong className="font-heading text-[23px] leading-tight font-bold tracking-[-0.035em] max-[900px]:text-[19px]">
          {item.value}
        </strong>
        <span className="mt-1.75 text-[14px] text-site-subtle max-[900px]:text-[12px]">{item.label}</span>
      </div>
    ))}
  </section>
);
