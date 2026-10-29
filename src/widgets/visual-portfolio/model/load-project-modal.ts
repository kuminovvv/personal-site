let modulePromise: ReturnType<typeof importProjectModal> | undefined;

const importProjectModal = () => import("../ui/project-modal");

export const loadProjectModal = () => {
  modulePromise ??= importProjectModal().catch((error: unknown) => {
    modulePromise = undefined;
    throw error;
  });
  return modulePromise;
};
