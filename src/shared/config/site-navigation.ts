export const siteNavigation = [
  { href: "/", label: "Главная", footerHref: "/#about", footerLabel: "Мой подход" },
  { href: "/projects", label: "Проекты", footerLabel: "Проекты" },
  { href: "/stack", label: "Стек", footerLabel: "Навыки" },
  { href: "/resume", label: "Резюме", footerLabel: "Опыт работы" },
  { href: "/contacts", label: "Контакты", footerLabel: "Контакты" },
] as const;

export const siteFooterNavigation = [
  siteNavigation[0],
  siteNavigation[3],
  siteNavigation[1],
  siteNavigation[2],
  siteNavigation[4],
] as const;
