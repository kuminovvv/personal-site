export const SocialPreview = () => {
  return (
    <div className="my-3 h-80 overflow-hidden rounded-[18px] bg-[#f1f1f1] p-4 max-[900px]:h-60 max-[900px]:p-2 max-[680px]:h-70">
      <div className="h-full rounded-xl bg-white p-3 text-[#333]">
        <div className="flex min-h-8 items-center gap-2.5 text-[15px]">
          <span aria-hidden="true" className="size-6 shrink-0 rounded-full bg-site-green" />
          <b>soobota</b>
        </div>
        <div className="mt-2 grid h-[calc(100%-40px)] grid-cols-[56px_minmax(0,1fr)] gap-2.5">
          <div className="grid content-start gap-3.25 rounded-[7px] bg-[#f1f1f1] px-2 py-3.5 [&_i]:h-1.25 [&_i]:w-full [&_i]:rounded-[10px] [&_i]:bg-[#e4e6e5] [&_i:first-child]:bg-site-green">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="grid min-w-0 grid-rows-[47px_1fr_1fr] gap-2">
            <div className="flex items-center gap-2.25 rounded-lg bg-[#f1f1f1] px-2.5 py-2.25 text-[11px] text-[#777]">
              <span aria-hidden="true" className="size-6.25 shrink-0 rounded-full bg-site-green" />
              Что нового?
            </div>
            {["Автор публикации", "Участник"].map((name, index) => (
              <div className="rounded-lg bg-[#f1f1f1] px-2.5 py-2.25 text-[11px] [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_i]:ml-6.75 [&_i]:mt-2 [&_i]:block [&_i]:h-1.25 [&_i]:w-[80%] [&_i]:rounded-[5px] [&_i]:bg-[#e5e5e5] [&_i:last-child]:w-[55%]" key={name}>
                <div>
                  <span
                    aria-hidden="true"
                    className={`size-4.75 shrink-0 rounded-full ${index ? "bg-site-green" : "bg-[#e5f2e9]"}`}
                  />
                  <b>{name}</b>
                </div>
                <i />
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
