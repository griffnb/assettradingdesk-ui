// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Utility functions for TypeScript documentation extraction
 */

import { Node } from "ts-morph";

/**
 * Extract JSDoc comment from a node
 */
export function getJsDocComment(node: any): string | undefined {
  if (!node) return undefined;

  // For variable declarations, check the parent VariableStatement
  if (Node.isVariableDeclaration(node)) {
    const parent = node.getParent()?.getParent();
    if (parent && typeof parent.getJsDocs === "function") {
      const jsDocNodes = parent.getJsDocs();
      if (jsDocNodes && jsDocNodes.length > 0) {
        const comment = jsDocNodes[0].getComment();
        if (typeof comment === "string") {
          return comment;
        }
        if (Array.isArray(comment)) {
          return comment.map((c) => c.getText()).join("");
        }
      }
    }
  }

  // Try to get JSDoc if the node supports it
  if (typeof node.getJsDocs === "function") {
    const jsDocNodes = node.getJsDocs();
    if (jsDocNodes && jsDocNodes.length > 0) {
      const comment = jsDocNodes[0].getComment();
      if (typeof comment === "string") {
        return comment;
      }
      // Handle structured JSDoc comments
      if (Array.isArray(comment)) {
        return comment.map((c) => c.getText()).join("");
      }
    }
  }

  return undefined;
}

/**
 * Format type text to be more readable
 */
export function formatType(typeText: string): string {
  // Remove module prefixes for cleaner output
  return typeText.replace(/import\([^)]+\)\./g, "").replace(/React\./g, "");
}

/**
 * Check if a property is from React's base props (to filter them out)
 */
export function isReactBaseProp(propName: string, showAll: boolean): boolean {
  if (showAll) return false; // Don't filter if showing all props

  const reactBaseProps = [
    "ref",
    "key",
    "dangerouslySetInnerHTML",
    "children",
    // Common HTML attributes
    "id",
    "className",
    "style",
    "title",
    "hidden",
    "tabIndex",
    "role",
    "disabled",
    // Form element props
    "form",
    "formAction",
    "formEncType",
    "formMethod",
    "formNoValidate",
    "formTarget",
    "defaultChecked",
    "defaultValue",
    // HTML global attributes
    "accessKey",
    "autoCapitalize",
    "autoCorrect",
    "autoFocus",
    "autoSave",
    "contentEditable",
    "contextMenu",
    "dir",
    "draggable",
    "enterKeyHint",
    "inert",
    "inputMode",
    "is",
    "itemID",
    "itemProp",
    "itemRef",
    "itemScope",
    "itemType",
    "lang",
    "nonce",
    "part",
    "exportparts",
    "prefix",
    "property",
    "radioGroup",
    "rel",
    "resource",
    "results",
    "rev",
    "security",
    "slot",
    "spellCheck",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "translate",
    "typeof",
    "unselectable",
    "vocab",
    // Popover
    "popover",
    "popoverTarget",
    "popoverTargetAction",
    // RDF attributes
    "about",
    "content",
    "datatype",
    "inlist",
    // Input element specific
    "name",
    "type",
    "value",
    "color",
  ];

  // Check if it's a base prop or starts with common prefixes
  return (
    reactBaseProps.includes(propName) ||
    propName.startsWith("on") ||
    propName.startsWith("aria-") ||
    propName.startsWith("data-")
  );
}
