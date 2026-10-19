export const MiniWindow = ({
                               university = false,
                           }: {
    university?: boolean;
}) => {
    const rows = university
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
            className={university ? "h-62.75 rounded-[20px] bg-[#eaf4ed] px-6.75 py-5.25 max-[400px]:p-3" : "h-62.75 rounded-[20px] bg-site-soft px-6.75 py-5.25 max-[400px]:p-3"}>
            <div className="h-full rounded-site-16 bg-white px-3.75 py-3.25 text-[11px] text-[#333]">
                <div
                    className="mb-2.75 flex h-6.5 items-center justify-between [&>span]:gap-1.5 [&_i]:size-2.25 [&_i]:rounded-full [&_i]:bg-[#e4e4e4] [&_b]:font-semibold">
          <span>
            <i/>
            <i/>
            <i/>
          </span>
                    <b>{university ? "Портал университета" : "Редактор данных"}</b>
                </div>
                <div
                    className="mb-2.75 flex h-8 items-center justify-between rounded-site-6 bg-[#f7f7f7] px-2.25 text-[#777] [&_strong]:py-1.25">
                    {university ? "Расписание　Дисциплины" : "Поиск　Фильтры　Записи"}
                    <strong>{university ? "Открыть" : "Сохранить"}</strong>
                </div>
                {rows.map(([label, status], index) => (
                    <div
                        className="mb-1.75 flex h-7 items-center justify-between rounded-site-6 bg-[#f7f7f7] px-2.75 text-[#777] [&>span:first-child]:gap-2 [&_i]:size-3"
                        key={label}>
            <span>
              <i className={index === 1 ? "bg-site-green!" : ""}/>
                {label}
            </span>
                        <span>{status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
