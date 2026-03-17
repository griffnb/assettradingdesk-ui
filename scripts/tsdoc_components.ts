// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Component, interface, and type alias processing for TypeScript documentation extraction
 */

import { Node, SymbolFlags } from "ts-morph";
import {
  formatType,
  getJsDocComment,
  isReactBaseProp,
} from "./tsdoc_functions";

/**
 * Process and display an interface or type alias declaration
 */
export function processInterfaceOrTypeAlias(
  sf: any,
  decl: any,
  name: string,
  showAll: boolean,
): boolean {
  if (
    !Node.isInterfaceDeclaration(decl) &&
    !Node.isTypeAliasDeclaration(decl)
  ) {
    return false;
  }

  // Get component-level JSDoc
  const componentDoc = getJsDocComment(decl);

  console.log(`\n=== ${name} ===`);
  console.log(`File: ${sf.getFilePath().replace(process.cwd(), ".")}`);
  console.log(
    `Kind: ${Node.isInterfaceDeclaration(decl) ? "Interface" : "Type Alias"}`,
  );

  if (componentDoc) {
    console.log(`\n/**`);
    console.log(` * ${componentDoc}`);
    console.log(` */`);
  }

  // Get extends/base types
  const extendsInfo: string[] = [];
  if (Node.isInterfaceDeclaration(decl)) {
    const extending = decl.getExtends();
    extendsInfo.push(...extending.map((e) => e.getText()));
  } else if (Node.isTypeAliasDeclaration(decl)) {
    const typeNode = decl.getTypeNode();
    if (typeNode && Node.isIntersectionTypeNode(typeNode)) {
      const types = typeNode.getTypeNodes();
      extendsInfo.push(...types.map((t) => t.getText()));
    }
  }

  if (extendsInfo.length > 0) {
    console.log(`\nExtends: ${extendsInfo.join(" & ")}`);
  }

  const type = decl.getType();
  const props = type.getProperties();

  console.log(`\nProperties:\n{`);

  let hasCustomProps = false;
  for (const prop of props) {
    const propName = prop.getName();

    // Skip React base props for cleaner output (unless showing all)
    if (isReactBaseProp(propName, showAll)) continue;

    hasCustomProps = true;
    const propDecls = prop.getDeclarations();
    if (!propDecls || propDecls.length === 0) continue;

    const propDecl = propDecls[0];
    const optional = prop.hasFlags(SymbolFlags.Optional) ? "?" : "";
    const typeText = formatType(propDecl.getType().getText(propDecl));

    // Get JSDoc for this property
    const propDoc = getJsDocComment(propDecl);
    if (propDoc) {
      console.log(`  /**`);
      console.log(`   * ${propDoc}`);
      console.log(`   */`);
    }

    console.log(`  ${propName}${optional}: ${typeText}`);
  }

  if (!hasCustomProps) {
    console.log(
      `  // Only base props from extended types - use --all to see them`,
    );
  }

  console.log(`}`);
  return true;
}

/**
 * Process and display a component with props interface
 */
export function processComponentWithProps(
  sf: any,
  decl: any,
  name: string,
  showAll: boolean,
): boolean {
  // Get component-level JSDoc
  const componentDoc = getJsDocComment(decl);

  console.log(`\n=== ${name} ===`);
  console.log(`File: ${sf.getFilePath().replace(process.cwd(), ".")}`);

  if (componentDoc) {
    console.log(`\n/**`);
    console.log(` * ${componentDoc}`);
    console.log(` */`);
  }

  // Try to find props interface/type
  let propsInterface = null;

  // Check if there's a Props interface/type in the same file
  const propsName = `${name}Props`;
  const propsExports = sf.getExportedDeclarations().get(propsName);

  if (propsExports && propsExports.length > 0) {
    propsInterface = propsExports[0];
  } else {
    // Look for non-exported interface
    const interfaces = sf.getInterfaces();
    const types = sf.getTypeAliases();

    propsInterface =
      interfaces.find((i) => i.getName() === propsName) ||
      types.find((t) => t.getName() === propsName);
  }

  if (propsInterface) {
    const type = propsInterface.getType();
    const props = type.getProperties();

    // Get base types/interfaces this extends from
    const extendsInfo: string[] = [];
    if (Node.isInterfaceDeclaration(propsInterface)) {
      const extending = propsInterface.getExtends();
      extendsInfo.push(...extending.map((e) => e.getText()));
    } else if (Node.isTypeAliasDeclaration(propsInterface)) {
      const typeNode = propsInterface.getTypeNode();
      if (typeNode && Node.isIntersectionTypeNode(typeNode)) {
        const types = typeNode.getTypeNodes();
        extendsInfo.push(
          ...types
            .map((t) => t.getText())
            .filter((t) => !t.includes("VariantProps")),
        );
      }
    }

    if (extendsInfo.length > 0) {
      console.log(`\nExtends: ${extendsInfo.join(", ")}`);
    }

    console.log(`\nComponent-specific Props:\n{`);

    let hasCustomProps = false;
    for (const prop of props) {
      const propName = prop.getName();

      // Skip React base props for cleaner output
      if (isReactBaseProp(propName, showAll)) continue;

      const propDecls = prop.getDeclarations();
      if (!propDecls || propDecls.length === 0) continue;

      hasCustomProps = true;
      const propDecl = propDecls[0];
      const optional = prop.hasFlags(SymbolFlags.Optional) ? "?" : "";
      const typeText = formatType(propDecl.getType().getText(propDecl));

      // Get JSDoc for this property
      const propDoc = getJsDocComment(propDecl);
      if (propDoc) {
        console.log(`  /**`);
        console.log(`   * ${propDoc}`);
        console.log(`   */`);
      }

      console.log(`  ${propName}${optional}: ${typeText}`);
    }

    if (!hasCustomProps) {
      console.log(`  // Only base props from extended types`);
    }

    console.log(`}`);
    return true;
  }

  return false;
}

/**
 * Process and display a function component (fallback method)
 */
export function processFunctionComponent(
  decl: any,
  checker: any,
  showAll: boolean,
): boolean {
  // Fallback: try to get props from function signature
  const symbol = decl.getSymbol();
  if (!symbol) return false;

  const componentType = symbol.getTypeAtLocation(decl);
  const callSig = componentType.getCallSignatures()[0];

  if (!callSig) return false;

  const funcParamDecl = callSig.getParameters()[0]?.getDeclarations()[0];
  if (!funcParamDecl) {
    console.log(`\nNo props defined`);
    return true;
  }

  const rawPropsType = funcParamDecl.getType();
  const propsType = checker.getApparentType(rawPropsType);
  const componentProps = propsType.getProperties();

  console.log(`\nComponent-specific Props:\n{`);

  let hasFuncCustomProps = false;
  for (const prop of componentProps) {
    const propName = prop.getName();

    // Skip React base props for cleaner output
    if (isReactBaseProp(propName, showAll)) continue;

    hasFuncCustomProps = true;
    const propDecls = prop.getDeclarations();
    if (!propDecls || propDecls.length === 0) continue;

    const propDecl = propDecls[0];
    const optional = prop.hasFlags(SymbolFlags.Optional) ? "?" : "";
    const typeText = formatType(propDecl.getType().getText(propDecl));

    // Get JSDoc for this property
    const propDoc = getJsDocComment(propDecl);
    if (propDoc) {
      console.log(`  /**`);
      console.log(`   * ${propDoc}`);
      console.log(`   */`);
    }

    console.log(`  ${propName}${optional}: ${typeText}`);
  }

  if (!hasFuncCustomProps) {
    console.log(`  // Only base props - use --all to see all inherited props`);
  }

  console.log(`}`);
  return true;
}
