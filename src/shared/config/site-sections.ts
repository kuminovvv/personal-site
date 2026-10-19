export const siteSections = {
  about: { number: "01", label: "МОЙ ПОДХОД" },
  experience: { number: "02", label: "КОММЕРЧЕСКИЙ ОПЫТ", pageLabel: "РЕЗЮМЕ" },
  projects: { number: "03", label: "ПРОЕКТЫ" },
  stack: { number: "04", label: "ТЕХНОЛОГИИ", pageLabel: "СТЕК" },
  contacts: { number: "05", label: "КОНТАКТЫ" },
} as const;

export type SiteSection = keyof typeof siteSections;

export const formatSectionNumber = (section: SiteSection, page = false) => {
  const config = siteSections[section];
  const label = page && "pageLabel" in config ? config.pageLabel : config.label;
  return `${config.number} / ${label}`;
};
