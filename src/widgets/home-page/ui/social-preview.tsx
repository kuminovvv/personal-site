import { SocialSidebar } from "./social-sidebar";
import { SocialHeader } from "./social-header";
import { SocialFeed } from "./social-feed";

export const SocialPreview = () => (
  <div className="my-3 h-80 overflow-hidden rounded-[18px] bg-site-approach-surface p-4 max-[900px]:h-60 max-[900px]:p-2 max-[680px]:h-70">
    <div className="h-full rounded-xl bg-white p-3 text-site-mini-window-surface-b">
      <SocialHeader />
      <div className="mt-2 grid h-[calc(100%-40px)] grid-cols-[56px_minmax(0,1fr)] gap-2.5">
        <SocialSidebar />
        <SocialFeed />
      </div>
    </div>
  </div>
);
