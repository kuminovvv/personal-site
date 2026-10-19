import { resumeApproach } from "../model/resume-content";

export const ResumeApproach = () => (
  <section className="mt-8 grid grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-5 max-[680px]:grid-cols-1" aria-labelledby="resume-approach-title">
    <div>
      <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">03 / ПОДХОД К РАБОТЕ</p>
      <h2 id="resume-approach-title" className="mt-2 font-heading text-[27px] leading-tight font-bold tracking-[-0.035em]">Как я работаю</h2>
    </div>
    <div className="grid min-h-45 gap-4 rounded-[20px] bg-site-surface px-8 py-7 max-[680px]:px-6 max-[680px]:py-6">
      {resumeApproach.map((item, index) => (
        <div className="grid grid-cols-[95px_minmax(0,1fr)] items-start gap-5 max-[480px]:grid-cols-1 max-[480px]:gap-1.5" key={item.title}>
          <span className="text-[12px] font-semibold text-site-green-text dark:text-site-green">0{index + 1} / ПРИНЦИП</span>
          <div>
            <h3 className="text-[15px] font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-site-subtle">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
