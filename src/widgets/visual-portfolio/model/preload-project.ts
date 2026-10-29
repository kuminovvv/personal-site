import { loadProjectModal } from "./load-project-modal";
import { preloadProjectImage } from "./preload-project-image";

export const preloadProject = (slug: string) => {
  preloadProjectImage(slug);
  // A failed speculative import must not prevent the next click from retrying.
  void loadProjectModal().catch(() => undefined);
};
