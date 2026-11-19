import { RentFilterBar } from "./rent-filter-bar";
import { RentListing } from "./rent-listing";

export const RentPreview = () => (
    <div className="my-3 h-80 overflow-hidden rounded-[18px] bg-site-approach-surface p-4 max-[900px]:h-60 max-[900px]:p-2 max-[680px]:h-70">
      <div className="h-full rounded-xl bg-white p-3 text-site-mini-window-surface-b">
        <div className="flex min-h-8 items-center gap-2.5 text-[15px]">
          <span className="size-5.25 rounded-full bg-site-green" />
          <b>Аренда в Петербурге</b>
        </div>
        <RentFilterBar />
        <RentListing />
      </div>
    </div>
  );
