import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import projectRules from "./scripts/eslint/project-rules.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { project: projectRules },
    rules: {
      "project/boundaries": "error",
      "project/component-props": "error",
      "project/component-file": "error",
      "project/jsx-depth": "error",
      "no-restricted-syntax": ["error", {
        selector: "JSXOpeningElement[name.type='JSXIdentifier'][name.name='button']",
        message: "Используйте общий shadcn/ui Button из @/shared/ui/button вместо нативного button.",
      }],
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "max-lines": ["error", { max: 250, skipBlankLines: false, skipComments: false }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
