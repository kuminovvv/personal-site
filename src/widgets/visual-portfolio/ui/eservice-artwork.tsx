import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

const getCopy = createDictionary("eservice-artwork", {
  ru: { university: "УНИВЕРСИТЕТ", sketch: "ИНТЕРФЕЙС-СХЕМА", title: "Все сервисы рядом.", description: "Расписание, учебные задачи и личные сервисы", cards: ["РАСПИСАНИЕ", "СЕРВИСЫ", "ЗАДАЧИ"], myDay: "МОЙ ДЕНЬ", today: "СЕГОДНЯ", tasks: ["Работа с расписанием", "Университетские сервисы", "Личный кабинет"], concept: "КОНЦЕПТ-ВИЗУАЛИЗАЦИЯ / НЕ РЕАЛЬНЫЙ СКРИНШОТ" },
  en: { university: "UNIVERSITY", sketch: "INTERFACE CONCEPT", title: "All services in one place.", description: "Timetable, study tasks, and personal services", cards: ["TIMETABLE", "SERVICES", "TASKS"], myDay: "MY DAY", today: "TODAY", tasks: ["Timetable", "University services", "My account"], concept: "CONCEPT VISUALIZATION / NOT A REAL SCREENSHOT" },
});

const taskTimes = ["09:00", "11:00", "14:00"];
const moduleColors = ["#e5ddfd", "#deedff", "#dbf4e2"];
const taskColors = ["#efebfc", "#ebf2ff", "#e8f5ec"];

export const EserviceArtwork = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getCopy(locale);
  return (
    <div className="relative h-[455px] w-[364px] origin-top-left max-[520px]:scale-[.76]">
      <span className="absolute -left-[85px] top-[130px] font-[family-name:var(--font-visual-display)] text-[130px] leading-[1.05] font-extrabold tracking-[-5.46px] text-[#b6adb2]/80">
        SERVICE
      </span>
      <div className="absolute left-[20px] top-[186.18px] flex h-[217.803px] w-[331.722px] items-center justify-center">
        <div className="h-[186px] w-[314px] -rotate-6 rounded-[19px] bg-[#c8d4ed] transition-transform duration-[var(--motion-hover)] ease-[var(--motion-out)] [@media(pointer:fine)]:site-motion:group-hover:-translate-y-[6px] site-motion:group-focus-visible:-translate-y-[6px]" />
      </div>
      <div className="absolute left-[11.51px] top-[207px] flex h-[243.288px] w-[331.434px] items-center justify-center">
        <div className="flex w-[320px] rotate-3 flex-col items-start overflow-hidden rounded-[16px] bg-[#ced9ef] transition-transform duration-[var(--motion-hover)] ease-[var(--motion-out)] [@media(pointer:fine)]:site-motion:group-hover:translate-y-[3px] site-motion:group-focus-visible:translate-y-[3px]">
          <div className="relative flex w-full flex-col items-start gap-[8.148px] rounded-[8.889px] bg-[#c8d4eb] p-[11.111px]">
            <div className="flex w-full items-center justify-between font-[family-name:var(--font-visual-mono)] text-[4.444px] leading-none text-[#425776]">
              <span className="w-[222.222px] tracking-[0.0156px]">eSERVICE / {copy.university}</span>
              <span className="w-[59.259px] text-right tracking-[0.0067px]">2020—2024</span>
            </div>
            <div className="flex w-full flex-col items-start gap-[7.778px] rounded-[7.037px] bg-[#2f3d63] p-[8.889px]">
              <div className="flex w-full items-center justify-between text-white">
                <strong className="w-[140.741px] font-[family-name:var(--font-visual-display)] text-[12.222px] leading-none font-bold tracking-[-0.1222px]">eService.</strong>
                <span className="flex h-[11.852px] items-center justify-center overflow-hidden rounded-full bg-[#53648f] px-[11.852px] font-[family-name:var(--font-visual-mono)] text-[4.074px] leading-none text-[#eff0ff]">{copy.sketch}</span>
              </div>
              <div className="flex w-full flex-col items-start gap-[7.037px] rounded-[5.185px] bg-[#fbfcff] p-[7.407px] text-[#252a4c]">
                <div className="flex w-[265.185px] flex-col items-start gap-[2.963px]">
                  <strong className="w-[262.593px] font-[family-name:var(--font-visual-text)] text-[10px] leading-[1.12] font-bold tracking-[-0.065px]">{copy.title}</strong>
                  <span className="w-[262.593px] font-[family-name:var(--font-visual-text)] text-[5.185px] leading-[1.16] text-[#7a819b]">{copy.description}</span>
                </div>
                <div className="flex w-full items-start gap-[4.444px]">
                  {copy.cards.map((name, index) => (
                    <div key={name} className="flex min-w-0 flex-1 flex-col items-start gap-[6.296px] overflow-hidden rounded-[5.926px] p-[5.926px]" style={{ backgroundColor: moduleColors[index] }}>
                      <span className="font-[family-name:var(--font-visual-mono)] text-[4.444px] leading-none text-[#67708f]">0{index + 1}</span>
                      <strong className="font-[family-name:var(--font-visual-text)] text-[5.926px] leading-[1.1] font-bold tracking-[-0.0237px] text-[#303857]">{name}</strong>
                    </div>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between font-[family-name:var(--font-visual-mono)] text-[4.444px] leading-none text-[#616d91]">
                  <span className="w-[112.963px]">{copy.myDay}</span>
                  <span className="w-[88.889px] text-right">{copy.today}</span>
                </div>
                <div className="flex w-[265.185px] flex-col items-start gap-[4.074px]">
                  {copy.tasks.map((action, index) => (
                    <div key={action} className="flex h-[15.185px] w-full items-center justify-between overflow-hidden rounded-[3.333px] px-[5.926px] font-[family-name:var(--font-visual-text)] font-medium" style={{ backgroundColor: taskColors[index] }}>
                      <span className="w-[32.593px] font-[family-name:var(--font-visual-mono)] text-[4.815px] leading-[1.1] text-[#505f86]">{taskTimes[index]}</span>
                      <span className="w-[211.111px] text-[5.556px] leading-[1.13] text-[#485578]">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between font-[family-name:var(--font-visual-mono)] text-[4.444px] leading-none">
              <span className="w-[246.296px] text-[#566b88]">{copy.concept}</span>
              <strong className="w-[16.667px] text-right font-[family-name:var(--font-visual-display)] text-[6.667px] font-bold text-[#475d82]">K</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
