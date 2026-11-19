const routeExports = new Set([
  "metadata", "viewport", "generateMetadata", "generateViewport", "generateStaticParams",
  "dynamic", "dynamicParams", "revalidate", "fetchCache", "runtime", "preferredRegion", "maxDuration",
]);

const componentFile = {
  meta: { type: "problem", schema: [], messages: {
    separate: "Вынесите {{name}} в отдельный model/lib модуль. TSX содержит только компонент и его props.",
    single: "В TSX-файле допускается только один компонент, включая dynamic/memo/forwardRef.",
  } },
  create(context) {
    if (!context.filename.endsWith(".tsx")) return {};
    const isRoute = /\/src\/app\/(?:.*\/)?(?:page|layout)\.tsx$/.test(context.filename.replaceAll("\\", "/"));
    return { Program(program) {
      const wrappers = new Set();
      const reactNamespaces = new Set();
      for (const statement of program.body) {
        if (statement.type !== "ImportDeclaration") continue;
        for (const specifier of statement.specifiers) {
          if (statement.source.value === "next/dynamic" && specifier.type === "ImportDefaultSpecifier") {
            wrappers.add(specifier.local.name);
          }
          if (statement.source.value !== "react") continue;
          if (specifier.type !== "ImportSpecifier") reactNamespaces.add(specifier.local.name);
          else if (["memo", "forwardRef"].includes(specifier.imported.name)) wrappers.add(specifier.local.name);
        }
      }
      const isComponent = (declaration) => {
        if (declaration.id.type !== "Identifier" || !/^[A-Z]/.test(declaration.id.name)) return false;
        const init = declaration.init;
        if (init?.type === "ArrowFunctionExpression") return true;
        if (init?.type !== "CallExpression") return false;
        const callee = init.callee;
        return callee.type === "Identifier" ? wrappers.has(callee.name)
          : callee.type === "MemberExpression" && !callee.computed && callee.object.type === "Identifier"
            && reactNamespaces.has(callee.object.name) && ["memo", "forwardRef"].includes(callee.property.name);
      };
      let count = 0;
      const reject = (node, name) => context.report({ node, messageId: "separate", data: { name } });
      for (const statement of program.body) {
        const exported = statement.type === "ExportNamedDeclaration";
        const node = exported ? statement.declaration : statement;
        if (!node || node.type === "ImportDeclaration" || node.type === "ExportAllDeclaration") continue;
        if (node.type === "ExpressionStatement" && node.directive) continue;
        if (node.type === "ExportDefaultDeclaration" && node.declaration.type === "Identifier") continue;
        if (["TSTypeAliasDeclaration", "TSInterfaceDeclaration"].includes(node.type)) {
          if (!node.id.name.endsWith("Props")) reject(node, node.id.name);
          continue;
        }
        if (node.type !== "VariableDeclaration") {
          reject(node, node.id?.name ?? "объявление");
          continue;
        }
        for (const declaration of node.declarations) {
          if (isComponent(declaration)) {
            count += 1;
            if (count > 1) context.report({ node: declaration, messageId: "single" });
          } else if (!(isRoute && exported && routeExports.has(declaration.id.name))) {
            reject(declaration, declaration.id.name ?? "объявление");
          }
        }
      }
    } };
  },
};

export default componentFile;
