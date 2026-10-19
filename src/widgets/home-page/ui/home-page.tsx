import { Hero } from "./hero";
import { Approach } from "./approach";
import { Experience } from "./experience";
import { Projects } from "./projects";
import { Stack } from "./stack";
import { Contacts } from "./contacts";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

export const HomePage = ({ content }: { content: SiteContent["home"] }) => {
  return (
    <>
      <Hero content={content.hero} />
      <Approach content={content.approach} />
      <Experience content={content.experience} />
      <Projects content={content.projects} />
      <Stack content={content.stack} />
      <Contacts content={content.contacts} />
    </>
  );
};
