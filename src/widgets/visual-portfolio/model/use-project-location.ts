import { useCallback, useRef, useSyncExternalStore } from "react";
import { visualProjects } from "./projects";

const LOCATION_EVENT = "portfolio:project-change";
const HISTORY_KEY = "kuminovProject";
const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(LOCATION_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(LOCATION_EVENT, onChange);
  };
};
const getSnapshot = () => {
  const slug = new URLSearchParams(window.location.search).get("project");
  return visualProjects.some((project) => project.slug === slug) ? slug : null;
};
const getServerSnapshot = () => null;

export const useProjectLocation = () => {
  const closingRef = useRef(false);
  const subscribeLocation = useCallback((onChange: () => void) => subscribe(() => {
    closingRef.current = false;
    onChange();
  }), []);
  const selected = useSyncExternalStore(subscribeLocation, getSnapshot, getServerSnapshot);
  const updateUrl = useCallback((slug: string | null) => {
    const current = getSnapshot();
    if (slug === current || closingRef.current) return;
    if (!slug && window.history.state?.[HISTORY_KEY]?.slug === current) {
      closingRef.current = true;
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("project", slug);
    else url.searchParams.delete("project");
    const nextState = { ...window.history.state };
    if (slug) {
      nextState[HISTORY_KEY] = { slug };
      window.history.pushState(nextState, "", url);
    } else {
      delete nextState[HISTORY_KEY];
      window.history.replaceState(nextState, "", url);
    }
    window.dispatchEvent(new Event(LOCATION_EVENT));
  }, []);
  return { selected, updateUrl };
};
