export type MotionPreference = "on" | "off";

const STORAGE_KEY = "portfolio-motion";
const CHANGE_EVENT = "portfolio:motion-preference";
let cachedPreference: MotionPreference | undefined;

const parsePreference = (value: string | null): MotionPreference => value === "off" ? "off" : "on";

export const getMotionPreference = (): MotionPreference => {
  if (typeof window === "undefined") return "on";
  if (cachedPreference !== undefined) return cachedPreference;
  try {
    cachedPreference = parsePreference(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    cachedPreference = "on";
  }
  return cachedPreference;
};

export const isMotionReduced = () => getMotionPreference() === "off";

export const syncMotionPreference = () => {
  document.documentElement.dataset.siteMotion = isMotionReduced() ? "off" : "on";
};

export const setMotionPreference = (preference: MotionPreference) => {
  cachedPreference = preference;
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // The choice still works for this visit when storage is unavailable.
  }
  syncMotionPreference();
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const subscribeMotionPreference = (onChange: () => void) => {
  const notify = () => { syncMotionPreference(); onChange(); };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    cachedPreference = parsePreference(event.newValue);
    notify();
  };
  syncMotionPreference();
  window.addEventListener(CHANGE_EVENT, notify);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, notify);
    window.removeEventListener("storage", onStorage);
  };
};
