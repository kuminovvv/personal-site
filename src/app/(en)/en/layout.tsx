import type { ReactNode } from "react";
import RootDocument from "@/app/root-document";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";

export const metadata = getPageMetadata("home", "en");

const EnglishLayout = ({ children }: { children: ReactNode }) => <RootDocument locale="en">{children}</RootDocument>;

export default EnglishLayout;
