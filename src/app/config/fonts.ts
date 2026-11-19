import { Roboto_Flex, Unbounded, Onest, Golos_Text, Geist_Mono } from "next/font/google";

export const robotoFlex = Roboto_Flex({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-flex",
  display: "swap",
  preload: false,
});

export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  preload: false,
});

export const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-visual-display", display: "swap", weight: "variable" });

export const golos = Golos_Text({ subsets: ["latin", "cyrillic"], variable: "--font-visual-text", display: "swap" });

export const geistMono = Geist_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-visual-mono", display: "swap", preload: false });
