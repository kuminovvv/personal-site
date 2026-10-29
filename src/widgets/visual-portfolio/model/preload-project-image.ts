import { projectDetails } from "./project-details";

const images = new Map<string, HTMLImageElement>();

export const preloadProjectImage = (slug: string) => {
  if (typeof window === "undefined") return;
  const source = projectDetails[slug]?.art;
  if (!source || images.has(source)) return;
  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = "high";
  images.set(source, image);
  image.onerror = () => { images.delete(source); };
  image.src = source;
  void image.decode().catch(() => undefined);
};
