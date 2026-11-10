export const usePathname = () =>
  typeof window === "undefined" ? "/" : window.location.pathname;
