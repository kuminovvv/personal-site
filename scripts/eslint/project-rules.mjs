import path from "node:path";
import componentFile from "./component-file.mjs";

const layers = ["shared", "entities", "features", "widgets", "app"];
const slicedLayers = new Set(["entities", "features", "widgets"]);

const getLocation = (filename) => {
  const parts = filename.replaceAll("\\", "/").split("/src/").at(-1).split("/");
  return { layer: parts[0], slice: parts[1], parts };
};

const boundaries = {
  meta: { type: "problem", schema: [], messages: {
    upward: "Слой {{from}} не может импортировать слой {{to}}.",
    neighbor: "Импорт соседнего слайса запрещён: {{slice}}. Композиция относится к app.",
    private: "Используйте публичный API @/{{layer}}/{{slice}}.",
  } },
  create(context) {
    const filename = context.filename;
    const from = getLocation(filename);
    const check = (node) => {
      const source = node.source ?? node;
      const value = source.value;
      if (typeof value !== "string") return;
      const target = value.startsWith("@/") ? value.slice(2)
        : value.startsWith(".") ? path.resolve(path.dirname(filename), value) : null;
      if (!target) return;
      const to = getLocation(target);
      const fromRank = layers.indexOf(from.layer);
      const toRank = layers.indexOf(to.layer);
      if (fromRank < 0 || toRank < 0) return;
      if (toRank > fromRank) {
        context.report({ node: source, messageId: "upward", data: { from: from.layer, to: to.layer } });
      } else if (to.layer === from.layer && slicedLayers.has(from.layer) && to.slice !== from.slice) {
        context.report({ node: source, messageId: "neighbor", data: { slice: to.slice } });
      } else if (slicedLayers.has(to.layer) && to.parts.length > 2
        && !(to.layer === from.layer && to.slice === from.slice)) {
        context.report({ node: source, messageId: "private", data: to });
      }
    };
    return { ImportDeclaration: check, ExportNamedDeclaration: check, ExportAllDeclaration: check,
      ImportExpression: check };
  },
};

const componentProps = {
  meta: { type: "suggestion", schema: [], messages: {
    destructure: "Деструктурируйте props внутри тела компонента.",
    single: "Каждый React-компонент должен находиться в отдельном TSX-файле.",
  } },
  create(context) {
    let count = 0;
    return { VariableDeclarator(node) {
      if (!context.filename.endsWith(".tsx") || node.id.type !== "Identifier"
        || !/^[A-Z]/.test(node.id.name) || node.init?.type !== "ArrowFunctionExpression") return;
      count += 1;
      if (count > 1) context.report({ node: node.id, messageId: "single" });
      if (node.init.params[0]?.type === "ObjectPattern") {
        context.report({ node: node.init.params[0], messageId: "destructure" });
      }
    } };
  },
};

const jsxDepth = {
  meta: { type: "suggestion", schema: [], messages: {
    depth: "Вложенность JSX превышает четыре уровня. Выделите самостоятельный блок в компонент.",
  } },
  create(context) {
    const check = (node) => {
      const depth = context.sourceCode.getAncestors(node).filter((ancestor) =>
        ["JSXElement", "JSXFragment"].includes(ancestor.type)).length + 1;
      if (depth === 5) context.report({ node, messageId: "depth" });
    };
    return { JSXElement: check, JSXFragment: check };
  },
};

const projectRules = { rules: { boundaries, "component-props": componentProps, "jsx-depth": jsxDepth, "component-file": componentFile } };

export default projectRules;
