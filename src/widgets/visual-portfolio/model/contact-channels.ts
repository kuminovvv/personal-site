export type ContactChannel = {
  label: string;
  description: string;
  href: string;
};

export const CONTACT_CHANNELS = [
  {label: "Telegram", description: "@kuminovvv", href: "https://t.me/kuminovvv"},
  {label: "GitHub", description: "github.com/kuminovvv", href: "https://github.com/kuminovvv"},
  {label: "Email", description: "kuminovvv@mail.ru", href: "mailto:kuminovvv@mail.ru"},
] as const;
