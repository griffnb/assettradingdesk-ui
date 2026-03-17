// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Class declaration processing for TypeScript documentation extraction
 */

import { Node } from "ts-morph";
import { formatType, getJsDocComment } from "./tsdoc_functions";

/**
 * Check if decorator has enum and extract field name for comment
 */
function getEnumComment(decorators: any[], propName: string): string | null {
  for (const decorator of decorators) {
    const decoratorText = decorator.getText();
    // Check if it's an @attr decorator with enum option
    if (decoratorText.includes("@attr") && decoratorText.includes("enum:")) {
      return ` // ${propName}Enum available`;
    }
  }
  return null;
}

/**
 * Process and display a class declaration
 */
export function processClassDeclaration(
  sf: any,
  decl: any,
  name: string,
): boolean {
  if (!Node.isClassDeclaration(decl)) {
    return false;
  }

  // Get class-level JSDoc
  const classDoc = getJsDocComment(decl);

  console.log(`\n=== ${name} ===`);
  console.log(`File: ${sf.getFilePath().replace(process.cwd(), ".")}`);
  console.log(`Kind: Class`);

  if (classDoc) {
    console.log(`\n/**`);
    console.log(` * ${classDoc}`);
    console.log(` */`);
  }

  // Get extends/base class
  const extendsExpr = decl.getExtends();
  if (extendsExpr) {
    console.log(`\nExtends: ${extendsExpr.getText()}`);
  }

  // Get implements
  const implementsExprs = decl.getImplements();
  if (implementsExprs.length > 0) {
    console.log(
      `Implements: ${implementsExprs.map((i) => i.getText()).join(", ")}`,
    );
  }

  // Get all properties (including inherited)
  const type = decl.getType();
  const allSymbols = type.getProperties();
  const ownProperties = decl.getProperties();
  const ownMethods = decl.getMethods();
  const ownGetAccessors = decl.getGetAccessors();
  const ownSetAccessors = decl.getSetAccessors();

  const ownPropertyNames = new Set(ownProperties.map((p) => p.getName()));
  const ownMethodNames = new Set(ownMethods.map((m) => m.getName()));
  const ownGetAccessorNames = new Set(ownGetAccessors.map((g) => g.getName()));
  const ownSetAccessorNames = new Set(ownSetAccessors.map((s) => s.getName()));

  // Separate symbols into properties, methods, and accessors
  const regularProps: any[] = [];
  const methodProps: any[] = [];
  const accessorProps: any[] = [];

  for (const symbol of allSymbols) {
    //const symbolName = symbol.getName();
    const propDecls = symbol.getDeclarations();
    if (!propDecls || propDecls.length === 0) continue;

    const propDecl = propDecls[0];

    if (
      Node.isMethodDeclaration(propDecl) ||
      Node.isMethodSignature(propDecl)
    ) {
      methodProps.push(symbol);
    } else if (
      Node.isGetAccessorDeclaration(propDecl) ||
      Node.isSetAccessorDeclaration(propDecl)
    ) {
      accessorProps.push(symbol);
    } else if (
      Node.isPropertyDeclaration(propDecl) ||
      Node.isPropertySignature(propDecl)
    ) {
      regularProps.push(symbol);
    }
  }

  // Show own properties
  if (ownProperties.length > 0) {
    console.log(`\nOwn Properties:\n{`);
    for (const prop of ownProperties) {
      const propName = prop.getName();
      const propType = prop.getType().getText(prop);
      const isOptional = prop.hasQuestionToken();
      const propDoc = getJsDocComment(prop);

      if (propDoc) {
        console.log(`  /**`);
        console.log(`   * ${propDoc}`);
        console.log(`   */`);
      }

      // Check for enum decorators
      const decorators = prop.getDecorators();
      const enumComment = getEnumComment(decorators, propName);

      console.log(
        `  ${propName}${isOptional ? "?" : ""}: ${formatType(propType)}${enumComment || ""}`,
      );
    }
    console.log(`}`);
  }

  // Show inherited properties (excluding methods and own properties)
  const inheritedProps = regularProps.filter(
    (p) =>
      !ownPropertyNames.has(p.getName()) && !ownMethodNames.has(p.getName()),
  );
  if (inheritedProps.length > 0) {
    console.log(`\nInherited Properties:\n{`);
    for (const prop of inheritedProps) {
      const propName = prop.getName();
      const propDecls = prop.getDeclarations();
      if (!propDecls || propDecls.length === 0) continue;

      const propDecl = propDecls[0];
      const propType = propDecl.getType().getText(propDecl);
      const isOptional = propDecl.hasQuestionToken
        ? propDecl.hasQuestionToken()
        : false;
      const propDoc = getJsDocComment(propDecl);

      if (propDoc) {
        console.log(`  /**`);
        console.log(`   * ${propDoc}`);
        console.log(`   */`);
      }

      // Check for enum decorators
      let enumComment = null;
      if (propDecl.getDecorators) {
        const decorators = propDecl.getDecorators();
        enumComment = getEnumComment(decorators, propName);
      }

      console.log(
        `  ${propName}${isOptional ? "?" : ""}: ${formatType(propType)}${enumComment || ""}`,
      );
    }
    console.log(`}`);
  }

  // Show own getters/setters
  const ownAccessors = [...ownGetAccessors, ...ownSetAccessors];
  if (ownAccessors.length > 0) {
    console.log(`\nOwn Getters/Setters:\n{`);
    const processedAccessors = new Set<string>();

    for (const accessor of ownAccessors) {
      const accessorName = accessor.getName();
      if (processedAccessors.has(accessorName)) continue;
      processedAccessors.add(accessorName);

      const accessorDoc = getJsDocComment(accessor);
      if (accessorDoc) {
        console.log(`  /**`);
        console.log(`   * ${accessorDoc}`);
        console.log(`   */`);
      }

      const getter = ownGetAccessors.find((g) => g.getName() === accessorName);
      const setter = ownSetAccessors.find((s) => s.getName() === accessorName);

      if (getter && setter) {
        const getterType = getter.getReturnType().getText(getter);
        console.log(`  get/set ${accessorName}: ${formatType(getterType)}`);
      } else if (getter) {
        const getterType = getter.getReturnType().getText(getter);
        console.log(`  get ${accessorName}: ${formatType(getterType)}`);
      } else if (setter) {
        const params = setter.getParameters();
        const paramType = params[0]?.getType().getText(params[0]) || "any";
        console.log(`  set ${accessorName}: ${formatType(paramType)}`);
      }
    }
    console.log(`}`);
  }

  // Show inherited getters/setters
  const inheritedAccessors = accessorProps.filter(
    (p) =>
      !ownGetAccessorNames.has(p.getName()) &&
      !ownSetAccessorNames.has(p.getName()),
  );
  if (inheritedAccessors.length > 0) {
    console.log(`\nInherited Getters/Setters:\n{`);
    const processedInheritedAccessors = new Set<string>();

    for (const accessor of inheritedAccessors) {
      const accessorName = accessor.getName();
      if (processedInheritedAccessors.has(accessorName)) continue;
      processedInheritedAccessors.add(accessorName);

      const propDecls = accessor.getDeclarations();
      if (!propDecls || propDecls.length === 0) continue;

      const propDecl = propDecls[0];
      const accessorDoc = getJsDocComment(propDecl);

      if (accessorDoc) {
        console.log(`  /**`);
        console.log(`   * ${accessorDoc}`);
        console.log(`   */`);
      }

      if (Node.isGetAccessorDeclaration(propDecl)) {
        const getterType = propDecl.getReturnType().getText(propDecl);
        console.log(`  get ${accessorName}: ${formatType(getterType)}`);
      } else if (Node.isSetAccessorDeclaration(propDecl)) {
        const params = propDecl.getParameters();
        const paramType = params[0]?.getType().getText(params[0]) || "any";
        console.log(`  set ${accessorName}: ${formatType(paramType)}`);
      }
    }
    console.log(`}`);
  }

  // Show own methods
  if (ownMethods.length > 0) {
    console.log(`\nOwn Methods:\n{`);
    for (const method of ownMethods) {
      const methodName = method.getName();
      const methodDoc = getJsDocComment(method);

      if (methodDoc) {
        console.log(`  /**`);
        console.log(`   * ${methodDoc}`);
        console.log(`   */`);
      }

      // Get method signature
      const params = method.getParameters();
      const paramStrs = params.map((p) => {
        const pName = p.getName();
        const pType = p.getType().getText(p);
        const isOptional = p.hasQuestionToken() || p.isOptional();
        return `${pName}${isOptional ? "?" : ""}: ${formatType(pType)}`;
      });

      const returnType = method.getReturnType().getText(method);
      console.log(
        `  ${methodName}(${paramStrs.join(", ")}): ${formatType(returnType)}`,
      );
    }
    console.log(`}`);
  }

  // Show inherited methods
  const inheritedMethods = methodProps.filter(
    (m) => !ownMethodNames.has(m.getName()),
  );
  if (inheritedMethods.length > 0) {
    console.log(`\nInherited Methods:\n{`);
    for (const method of inheritedMethods) {
      const methodName = method.getName();
      const methodDecls = method.getDeclarations();
      if (!methodDecls || methodDecls.length === 0) continue;

      const methodDecl = methodDecls[0];
      const methodDoc = getJsDocComment(methodDecl);

      if (methodDoc) {
        console.log(`  /**`);
        console.log(`   * ${methodDoc}`);
        console.log(`   */`);
      }

      // Get method signature
      if (Node.isMethodDeclaration(methodDecl)) {
        const params = methodDecl.getParameters();
        const paramStrs = params.map((p) => {
          const pName = p.getName();
          const pType = p.getType().getText(p);
          const isOptional = p.hasQuestionToken() || p.isOptional();
          return `${pName}${isOptional ? "?" : ""}: ${formatType(pType)}`;
        });

        const returnType = methodDecl.getReturnType().getText(methodDecl);
        console.log(
          `  ${methodName}(${paramStrs.join(", ")}): ${formatType(returnType)}`,
        );
      }
    }
    console.log(`}`);
  }

  // Get constructor if present
  const constructors = decl.getConstructors();
  if (constructors.length > 0) {
    console.log(`\nConstructor:`);
    for (const ctor of constructors) {
      const ctorDoc = getJsDocComment(ctor);
      if (ctorDoc) {
        console.log(`/**`);
        console.log(` * ${ctorDoc}`);
        console.log(` */`);
      }

      const params = ctor.getParameters();
      const paramStrs = params.map((p) => {
        const pName = p.getName();
        const pType = p.getType().getText(p);
        const isOptional = p.hasQuestionToken() || p.isOptional();
        return `${pName}${isOptional ? "?" : ""}: ${formatType(pType)}`;
      });

      console.log(`constructor(${paramStrs.join(", ")})`);
    }
  }

  return true;
}
