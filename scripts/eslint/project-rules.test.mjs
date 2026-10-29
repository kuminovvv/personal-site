import path from "node:path";
import { RuleTester } from "eslint";
import typescriptConfig from "eslint-config-next/typescript";
import projectRules from "./project-rules.mjs";

const filename = (name) => path.resolve("src", name);
const tester = new RuleTester({ languageOptions: {
  ecmaVersion: "latest", sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } },
} });

tester.run("FSD boundaries", projectRules.rules.boundaries, {
  valid: [
    { filename: filename("app/root-document.tsx"), code: 'import { Header } from "@/widgets/site-header";' },
    { filename: filename("widgets/gallery/ui/card.tsx"), code: 'import { data } from "../model/data";' },
    { filename: filename("widgets/gallery/ui/card.tsx"), code: 'import { Button } from "@/shared/ui/button";' },
    { filename: filename("widgets/gallery/index.ts"), code: 'export { Card } from "./ui/card";' },
  ],
  invalid: [
    { filename: filename("shared/ui/button.tsx"), code: 'import { Header } from "@/widgets/site-header";',
      errors: [{ messageId: "upward" }] },
    { filename: filename("widgets/gallery/ui/card.tsx"), code: 'import { Header } from "@/widgets/site-header";',
      errors: [{ messageId: "neighbor" }] },
    { filename: filename("app/root-document.tsx"), code: 'import { Header } from "@/widgets/site-header/ui/header";',
      errors: [{ messageId: "private" }] },
    { filename: filename("widgets/gallery/ui/card.tsx"), code: 'const load = () => import("../../site-header");',
      errors: [{ messageId: "neighbor" }] },
    { filename: filename("features/share-site/index.ts"), code: 'export { data } from "@/widgets/gallery";',
      errors: [{ messageId: "upward" }] },
  ],
});

tester.run("Component contracts", projectRules.rules["component-props"], {
  valid: [
    { filename: filename("shared/ui/card.tsx"), code: 'export const Card = (props) => { const { title } = props; return <div>{title}</div>; };' },
  ],
  invalid: [
    { filename: filename("shared/ui/card.tsx"), code: 'export const Card = ({ title }) => <div>{title}</div>;',
      errors: [{ messageId: "destructure" }] },
    { filename: filename("shared/ui/card.tsx"), code: 'const Card = () => <div />; const Title = () => <h1 />;',
      errors: [{ messageId: "single" }] },
  ],
});

tester.run("JSX depth", projectRules.rules["jsx-depth"], {
  valid: [
    'const Card = () => <section><div><p><span>Text</span></p></div></section>;',
  ],
  invalid: [
    { code: 'const Card = () => <section><div><div><p><span>Text</span></p></div></div></section>;',
      errors: [{ messageId: "depth" }] },
    { code: 'const Card = () => <><section><div><p><span>Text</span></p></div></section></>;',
      errors: [{ messageId: "depth" }] },
  ],
});

const typedTester = new RuleTester({ languageOptions: {
  parser: typescriptConfig.find((config) => config.languageOptions?.parser).languageOptions.parser,
  parserOptions: { ecmaFeatures: { jsx: true } },
} });

typedTester.run("Clean component file", projectRules.rules["component-file"], {
  valid: [
    { filename: filename("widgets/header/ui/header.tsx"), code: 'import { getCopy } from "../model/copy"; type HeaderProps = { title: string }; export const Header = (props: HeaderProps) => <header>{props.title}</header>;' },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'export const Header = () => { const [isOpen, setIsOpen] = useState(false); const close = () => setIsOpen(false); return <button onClick={close}>{String(isOpen)}</button>; };' },
    { filename: filename("app/(ru)/page.tsx"), code: 'export const metadata = { title: "Home" }; const Page = () => <main />; export default Page;' },
    { filename: filename("app/projects/[slug]/page.tsx"), code: 'export const dynamicParams = false; export const generateStaticParams = () => []; const Page = () => <main />; export default Page;' },
    { filename: filename("widgets/header/ui/lazy-header.tsx"), code: 'import lazy from "next/dynamic"; export const Header = lazy(() => import("./header"));' },
    { filename: filename("shared/ui/button.tsx"), code: 'export { buttonVariants } from "./button-variants"; export const Button = () => <button />;' },
    { filename: filename("widgets/header/model/theme.ts"), code: 'export const getTheme = () => false;' },
  ],
  invalid: [
    { filename: filename("widgets/header/ui/header.tsx"), code: 'const getTheme = () => false; export const Header = () => <header />;', errors: [{ messageId: "separate" }] },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'const getCopy = createDictionary("header", {}); export const Header = () => <header />;', errors: [{ messageId: "separate" }] },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'const items = ["home"]; export const Header = () => <header />;', errors: [{ messageId: "separate" }] },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'type Channel = { title: string }; export const Header = () => <header />;', errors: [{ messageId: "separate" }] },
    { filename: filename("app/page.tsx"), code: 'const getTheme = () => false; const Page = () => <main />; export default Page;', errors: [{ messageId: "separate" }] },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'export const metadata = {}; export const Header = () => <header />;', errors: [{ messageId: "separate" }] },
    { filename: filename("widgets/header/ui/header.tsx"), code: 'import dynamic from "next/dynamic"; const LazyHeader = dynamic(() => import("./header")); export const Header = () => <LazyHeader />;', errors: [{ messageId: "single" }] },
    { filename: filename("shared/ui/card.tsx"), code: 'import { memo } from "react"; const MemoCard = memo(() => <div />); export const Card = () => <MemoCard />;', errors: [{ messageId: "single" }] },
  ],
});
