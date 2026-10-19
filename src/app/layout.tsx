import type { Metadata } from "next";
import { Roboto_Flex, Unbounded } from "next/font/google";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";
import { SiteLayout } from "@/widgets/site-layout/ui/site-layout";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuminovvv — портфолио Ильи Куминова",
  description: "Илья Куминов — ведущий специалист по frontend-разработке. Корпоративные интерфейсы, собственные продукты, React, TypeScript и Go.",
  openGraph: {
    title: "Kuminovvv — портфолио Ильи Куминова",
    description: "Опыт разработки, технические решения, личные продукты и способы сотрудничества.",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`h-full antialiased ${robotoFlex.variable} ${unbounded.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("portfolio-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full">
        <SmoothScrollProvider>
          <SiteLayout>{children}</SiteLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
};

export default RootLayout;
