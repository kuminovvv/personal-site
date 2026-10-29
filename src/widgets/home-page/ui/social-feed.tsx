import { SocialComposer } from "./social-composer";
import { SocialPost } from "./social-post";

export const SocialFeed = () => <div className="grid min-w-0 grid-rows-[47px_1fr_1fr] gap-2"><SocialComposer />{["Автор публикации", "Участник"].map((name, index) => <SocialPost key={name} name={name} index={index} />)}</div>;
