// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * TypeScript Documentation Extractor
 *
 * This script extracts TypeScript type information and JSDoc comments from components,
 * classes, and interfaces. It's useful for quickly understanding APIs without opening files.
 *
 * @structure
 * - tsdoc.ts (main entry point) - handles CLI arguments and file processing
 * - tsdoc_functions.ts - utility functions (JSDoc extraction, type formatting, React prop filtering)
 * - tsdoc_classes.ts - class declaration processing (properties, methods, constructors, decorators)
 * - tsdoc_components.ts - component processing (interfaces, type aliases, function components)
 *
 * @usage
 * bun scripts/tsdoc.ts "packages/ui/star-star/Button.tsx"
 * bun scripts/tsdoc.ts "packages/ui/src/components/star.tsx"
 * bun scripts/tsdoc.ts "packages/ui/star-star/Button.tsx" Button
 * bun scripts/tsdoc.ts "packages/ui/star-star/Button.tsx" --all
 *
 * @features
 * - Uses glob patterns for flexible file matching
 * - Extracts component-specific props (filters out common React props by default)
 * - Shows class properties, methods, and constructors with decorators
 * - Shows JSDoc comments for all properties, methods, and classes
 * - Displays what interfaces/types/classes a declaration extends
 * - Works with function components, classes, interfaces, and type aliases
 * - Optional --all flag to show inherited React props
 */

import * as fs from "fs";
import { globSync } from "glob";
import * as path from "path";
import { Project } from "ts-morph";
import { processClassDeclaration } from "./tsdoc_classes";
import {
  processComponentWithProps,
  processFunctionComponent,
  processInterfaceOrTypeAlias,
} from "./tsdoc_components";

const args = process.argv.slice(2);
const showAll = args.includes("--all") || args.includes("-a");
const filteredArgs = args.filter((a) => !a.startsWith("-"));
const [globPattern, componentName] = filteredArgs;

if (!globPattern) {
  console.error(
    "Usage: bun scripts/tsdoc.ts <glob-pattern> [Component] [--all|-a]",
  );
  console.error("");
  console.error("Arguments:");
  console.error(
    "  <glob-pattern>   Glob pattern to match files (e.g., 'packages/ui/**/*.tsx')",
  );
  console.error(
    "  [Component]      Optional: Component or interface name to extract (e.g., Button, ButtonProps)",
  );
  console.error(
    "                   If omitted, shows all exports in matched files",
  );
  console.error("");
  console.error("Options:");
  console.error("  --all, -a        Show all props including React base props");
  console.error("");
  console.error("Examples:");
  console.error('  bun scripts/tsdoc.ts "packages/ui/star-star/Button.tsx"');
  console.error('  bun scripts/tsdoc.ts "packages/ui/src/components/star.tsx"');
  console.error(
    '  bun scripts/tsdoc.ts "packages/ui/star-star/Button.tsx" Button',
  );
  console.error(
    '  bun scripts/tsdoc.ts "packages/ui/star-star/star-Model.ts" --all',
  );
  console.error(
    '  bun scripts/tsdoc.ts "packages/ui/src/components/Button.tsx" ButtonProps',
  );
  process.exit(1);
}

// Find files matching the glob pattern
const matchedFiles = globSync(globPattern, {
  ignore: ["**/node_modules/**", "**/*.test.ts", "**/*.test.tsx"],
  absolute: false,
});

if (matchedFiles.length === 0) {
  console.error(`No files found matching pattern: ${globPattern}`);
  process.exit(1);
}

// Find the appropriate package by looking for tsconfig.json
function findPackageRoot(filePath: string): string {
  let currentPath = path.dirname(filePath);
  while (currentPath !== "/" && currentPath !== ".") {
    if (fs.existsSync(path.join(currentPath, "tsconfig.json"))) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }

  // Fallback: try to extract from common paths
  const parts = filePath.split("/");
  const packagesIndex = parts.indexOf("packages");
  if (packagesIndex !== -1 && parts.length > packagesIndex + 1) {
    return parts.slice(0, packagesIndex + 2).join("/");
  }
  const appsIndex = parts.indexOf("apps");
  if (appsIndex !== -1 && parts.length > appsIndex + 1) {
    return parts.slice(0, appsIndex + 2).join("/");
  }

  throw new Error(`Could not find tsconfig.json for file ${filePath}`);
}

// Group files by their package root
const filesByPackage = new Map<string, string[]>();
for (const file of matchedFiles) {
  try {
    const pkgRoot = findPackageRoot(file);
    if (!filesByPackage.has(pkgRoot)) {
      filesByPackage.set(pkgRoot, []);
    }
    filesByPackage.get(pkgRoot)!.push(path.resolve(file));
  } catch (err) {
    console.error(`Warning: ${err.message}`);
  }
}

const searchComponentName: string | null = componentName || null;

/**
 * Process and display a single declaration
 */
function processDeclaration(sf: any, decl: any, name: string, checker: any) {
  // Try to process as class
  if (processClassDeclaration(sf, decl, name)) {
    return;
  }

  // Try to process as interface or type alias
  if (processInterfaceOrTypeAlias(sf, decl, name, showAll)) {
    return;
  }

  // Try to process as component with props interface
  if (processComponentWithProps(sf, decl, name, showAll)) {
    return;
  }

  // Fallback: try to process as function component
  processFunctionComponent(decl, checker, showAll);
}

// Process all matched files
let foundCount = 0;

for (const [pkgRoot, files] of filesByPackage) {
  const project = new Project({
    tsConfigFilePath: `${pkgRoot}/tsconfig.json`,
  });

  const checker = project.getTypeChecker();
  const targetFiles = new Set(files);

  for (const sf of project.getSourceFiles()) {
    // Skip node_modules and declaration files
    if (sf.getFilePath().includes("node_modules") || sf.isDeclarationFile()) {
      continue;
    }

    // Only process files that matched our glob pattern
    const normalizedSource = path.resolve(sf.getFilePath());
    if (!targetFiles.has(normalizedSource)) {
      continue;
    }

    // Get all exported declarations from the file
    const allExports = sf.getExportedDeclarations();

    // If no component name specified, show all exports
    if (!searchComponentName) {
      console.log(
        `\n=== Exports from ${sf.getFilePath().replace(process.cwd(), ".")} ===\n`,
      );

      for (const [exportName, declarations] of allExports) {
        if (declarations.length === 0) continue;

        for (const decl of declarations) {
          if (foundCount > 0) {
            console.log("\n" + "-".repeat(80) + "\n");
          }
          foundCount++;
          processDeclaration(sf, decl, exportName, checker);
        }
      }
      continue;
    }

    // Otherwise, search for specific component name
    const exports = allExports.get(searchComponentName);
    if (!exports || exports.length === 0) continue;

    for (const decl of exports) {
      if (foundCount > 0) {
        console.log("\n" + "=".repeat(80) + "\n");
      }
      foundCount++;
      processDeclaration(sf, decl, searchComponentName, checker);
    }
  }
}

if (foundCount === 0) {
  if (!searchComponentName) {
    console.error(
      `\nNo exports found in files matching pattern: ${globPattern}`,
    );
  } else {
    console.error(
      `\nComponent '${searchComponentName}' not found in files matching pattern: ${globPattern}`,
    );
  }
  process.exit(1);
} else if (foundCount > 1) {
  console.log(`\n${"=".repeat(80)}`);
  if (searchComponentName) {
    console.log(
      `\nFound ${foundCount} components named '${searchComponentName}'`,
    );
  } else {
    console.log(`\nFound ${foundCount} exports`);
  }
}
