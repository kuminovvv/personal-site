import { MiniWindowHeader } from "./mini-window-header";
import { MiniWindowRow } from "./mini-window-row";

export const MiniWindow = (props: {
    isUniversity?: boolean;
}) => {
  const {
    isUniversity = false,
  } = props;

    const rows = isUniversity
        ? [
            ["Понедельник", "2 занятия"],
            ["Вторник", "3 занятия"],
            ["Среда", "2 занятия"],
        ]
        : [
            ["Объект 001", "Сохранено"],
            ["Объект 002", "Изменено"],
            ["Объект 003", "Сохранено"],
        ];
    return (
        <div
            className={isUniversity ? "h-62.75 rounded-[20px] bg-site-mini-window-surface px-6.75 py-5.25 max-[400px]:p-3" : "h-62.75 rounded-[20px] bg-site-soft px-6.75 py-5.25 max-[400px]:p-3"}>
            <div className="h-full rounded-site-16 bg-white px-3.75 py-3.25 text-[11px] text-site-mini-window-surface-b">
                <MiniWindowHeader isUniversity={isUniversity} />
                <div
                    className="mb-2.75 flex h-8 items-center justify-between rounded-site-6 bg-site-mini-window-surface-d px-2.25 text-site-mini-window-surface-e [&_strong]:py-1.25">
                    {isUniversity ? "Расписание　Дисциплины" : "Поиск　Фильтры　Записи"}
                    <strong>{isUniversity ? "Открыть" : "Сохранить"}</strong>
                </div>
                {rows.map(([label, status], index) => <MiniWindowRow key={label} label={label} status={status} isHighlighted={index === 1} />)}
            </div>
        </div>
    );
};
