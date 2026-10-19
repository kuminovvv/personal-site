import type { Metadata } from "next";
import { StackPage as StackPageContent } from "@/widgets/stack-page/ui/stack-page";

export const metadata: Metadata = {
  title: "Стек — Kuminovvv",
  description: "React, TypeScript, Go, PostgreSQL и инструменты разработки интерфейсов и продуктов.",
};

const StackPage = () => <StackPageContent />;

export default StackPage;
