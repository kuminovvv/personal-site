import type { ReactNode } from "react";
import { RootDocument } from "@/app/root-document";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";

export const metadata = getPageMetadata("home", "ru");

const RussianLayout = (props: { children: ReactNode }) => {
  const {
    children,
  } = props;
  return (<RootDocument locale="ru">{children}</RootDocument>);
};

export default RussianLayout;
