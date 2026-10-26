import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

const getCopy = createDictionary("eservice-artwork", {
  ru: { university: "УНИВЕРСИТЕТ", sketch: "ИНТЕРФЕЙС-СХЕМА", title: "Все сервисы рядом.", description: "Расписание, учебные задачи и личные сервисы", cards: ["РАСПИСАНИЕ", "СЕРВИСЫ", "ЗАДАЧИ"], myDay: "МОЙ ДЕНЬ", today: "СЕГОДНЯ", tasks: ["Работа с расписанием", "Университетские сервисы", "Личный кабинет"], concept: "КОНЦЕПТ-ВИЗУАЛИЗАЦИЯ / НЕ РЕАЛЬНЫЙ СКРИНШОТ" },
  en: { university: "UNIVERSITY", sketch: "INTERFACE CONCEPT", title: "All services in one place.", description: "Timetable, study tasks, and personal services", cards: ["TIMETABLE", "SERVICES", "TASKS"], myDay: "MY DAY", today: "TODAY", tasks: ["Timetable", "University services", "My account"], concept: "CONCEPT VISUALIZATION / NOT A REAL SCREENSHOT" },
});

export const EserviceArtwork = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getCopy(locale);
  return (
  <div className="relative h-[455px] w-[364px] origin-top-left max-[520px]:scale-[.76]">
    <span className="absolute top-[135px] -left-[33px] transition-transform duration-[var(--motion-hover)] ease-[var(--motion-out)] [@media(pointer:fine)]:site-motion:group-hover:-translate-x-1 font-[family-name:var(--font-visual-display)] text-[130px] leading-[1.05] font-extrabold tracking-[-.042em] text-[#b6adb2]/80">
      SERVICE
    </span>
    <div className="absolute top-[186.18px] left-[20px] flex h-[217.803px] w-[331.722px] items-center justify-center">
      <div className="h-[186px] w-[314px] -rotate-6 rounded-[19px] bg-[#c8d4ed]" />
    </div>
    <div className="absolute top-[207px] left-[11.51px] flex h-[216.971px] w-[330.055px] items-center justify-center transition-transform duration-(--motion-hover) ease-(--motion-out) [@media(pointer:fine)]:site-motion:group-hover:scale-[1.035] [@media(pointer:fine)]:site-motion:group-hover:-translate-y-0.5">
      <div className="relative h-[200.498px] w-[320px] rotate-3 overflow-hidden rounded-[16px] bg-[#ced9ef]">
        <div className="absolute -top-[13.94px] left-0 flex w-[320px] flex-col gap-[8px] rounded-[9px] bg-[#c8d4eb] p-[11px]">
        <div className="flex justify-between font-[family-name:var(--font-visual-mono)] text-[5px] text-[#425776]">
          <span>eSERVICE / {copy.university}</span><span>2020—2024</span>
        </div>
        <div className="flex flex-col gap-[8px] rounded-[7px] bg-[#2f3d63] p-[9px]">
          <div className="flex justify-between text-white">
            <strong className="font-[family-name:var(--visual-heading-font-stack)] text-[12px] leading-none">eService.</strong>
            <span className="rounded-full bg-[#53648f] px-3 py-1 font-mono text-[4px]">{copy.sketch}</span>
          </div>
          <div className="flex flex-col gap-[7px] rounded-[5px] bg-[#fbfcff] p-[7px] text-[#252a4c]">
            <div><strong className="block text-[10px] leading-tight">{copy.title}</strong><span className="text-[5px] text-[#7a819b]">{copy.description}</span></div>
            <div className="grid grid-cols-3 gap-[4px]">
              {copy.cards.map((name, index) => (
                <div key={name} className="flex flex-col gap-1 rounded-[5px] p-[6px] text-[5px] text-[#303857]" style={{backgroundColor:["#e5ddfd", "#deedff", "#dbf4e2"][index]}}><span className="font-mono">0{index + 1}</span><strong>{name}</strong></div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-[5px] text-[#616d91]"><span>{copy.myDay}</span><span>{copy.today}</span></div>
            {copy.tasks.map((action, index)=>(
              <div key={action} className="flex gap-3 rounded-[3px] px-[6px] py-[5px] text-[5px] text-[#485578]" style={{backgroundColor:["#efebfc","#ebf2ff","#e8f5ec"][index]}}><span className="font-mono">{["09:00","11:00","14:00"][index]}</span><span>{action}</span></div>
            ))}
          </div>
        </div>
        <div className="flex justify-between font-mono text-[4px] text-[#566b88]"><span>{copy.concept}</span><strong>K</strong></div>
        </div>
      </div>
    </div>
  </div>
  );
};
