#!/usr/bin/env bun

/**
 * OpenAPI Service Generator
 *
 * This script generates TypeScript service files from an OpenAPI specification.
 * It groups routes by their base path and creates service methods that use ServerService.
 *
 * Usage: bun run scripts/generate-services.ts
 */

import * as fs from "fs";
import * as path from "path";

interface OpenAPISpec {
  paths: {
    [path: string]: {
      [method: string]: {
        tags?: string[];
        summary?: string;
        description?: string;
        parameters?: Array<{
          name: string;
          in: string;
          type?: string;
          required?: boolean;
        }>;
        requestBody?: any;
        responses: {
          [statusCode: string]: any;
        };
      };
    };
  };
}

interface RouteInfo {
  path: string;
  method: string;
  operationName: string;
  summary?: string;
  description?: string;
  hasBody: boolean;
  hasPathParams: boolean;
  hasQueryParams: boolean;
  requestType?: string;
  responseType?: string;
  tags?: string[];
}

interface ServiceGroup {
  name: string;
  basePath: string;
  routes: RouteInfo[];
  isAdmin: boolean;
}

interface CLIOptions {
  input: string;
  output: string;
}

// Default Configuration
const DEFAULT_SWAGGER_PATH =
  process.env.GO_SWAGGER_PATH || "./swag_docs/swagger.json";
const DEFAULT_OUTPUT_DIR = "./packages/models/src/openapi/services";

/**
 * Parse command line arguments
 */
function parseArguments(): CLIOptions {
  const args = process.argv.slice(2);
  let input = DEFAULT_SWAGGER_PATH;
  let output = DEFAULT_OUTPUT_DIR;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-i" || arg === "--input") {
      if (i + 1 < args.length) {
        input = args[i + 1];
        i++; // Skip next argument
      } else {
        console.error("Error: -i flag requires a file path");
        process.exit(1);
      }
    } else if (arg === "-o" || arg === "--output") {
      if (i + 1 < args.length) {
        output = args[i + 1];
        i++; // Skip next argument
      } else {
        console.error("Error: -o flag requires a directory path");
        process.exit(1);
      }
    } else if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    }
  }

  return { input, output };
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
OpenAPI Service Generator

Usage: bun run generate-services.ts [options]

Options:
  -i, --input <path>   Path to the OpenAPI/Swagger JSON file
                       Default: ${DEFAULT_SWAGGER_PATH}
  
  -o, --output <path>  Path to the output directory for generated services
                       Default: ${DEFAULT_OUTPUT_DIR}
  
  -h, --help          Show this help message

Examples:
  bun run generate-services.ts
  bun run generate-services.ts -i ./swagger.json -o ./src/services
  bun run generate-services.ts --input /path/to/spec.json --output /path/to/output
`);
}

/**
 * Parse the OpenAPI spec and extract route information
 */
function parseOpenAPISpec(specPath: string): OpenAPISpec {
  const content = fs.readFileSync(specPath, "utf-8");
  return JSON.parse(content);
}

/**
 * Convert HTTP method and path to operation name
 * e.g., GET /account/{id} -> GetAccountById
 */
function getOperationName(method: string, path: string): string {
  const methodName =
    method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();

  // Remove leading slash and split by /
  const parts = path.replace(/^\//, "").split("/");

  // Convert to PascalCase, handling path parameters
  const pathName = parts
    .map((part) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        // Convert {id} to ById, {conversationID} to ByConversationId
        const param = part.slice(1, -1);

        // Convert camelCase to PascalCase
        // Handle consecutive capitals: conversationID -> Conversation + ID
        // Split on transition from lowercase to uppercase: /([a-z])([A-Z])/
        // Then capitalize first letter of each word, lowercase the rest
        const withSpaces = param.replace(/([a-z])([A-Z])/g, "$1 $2");
        const words = withSpaces.split(" ").filter((word) => word.length > 0);

        const pascalParam = words
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join("");

        return "By" + pascalParam;
      }

      // Convert kebab-case or snake_case to PascalCase
      // If the part contains no separators, it might already be camelCase - preserve it
      if (!part.includes("-") && !part.includes("_")) {
        // Capitalize first letter but preserve rest (handles camelCase like testUser -> TestUser)
        return part.charAt(0).toUpperCase() + part.slice(1);
      }

      return part
        .split(/[-_]/)
        .filter((word) => word.length > 0)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join("");
    })
    .join("");

  return methodName + pathName;
}

/**
 * Extract the base path for grouping routes
 * e.g., /account/{id} -> account
 * e.g., /admin/account/{id} -> admin/account
 */
function getBasePath(path: string): string {
  // Remove leading slash
  const cleanPath = path.replace(/^\//, "");

  // Split by slash
  const parts = cleanPath.split("/");

  // If starts with 'admin' or 'api', include it in the base path
  if (parts[0] === "admin" || parts[0] === "api") {
    return parts.slice(0, 2).join("/");
  }

  // Otherwise, just use the first part
  return parts[0];
}

/**
 * Get the service name from the base path
 * e.g., account -> Account
 * e.g., admin/account -> AdminAccount
 */
function getServiceName(basePath: string): string {
  return basePath
    .split("/")
    .map((part) =>
      part
        .split(/[-_]/)
        .filter((word) => word.length > 0)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(""),
    )
    .join("");
}

/**
 * Check if route has body parameter
 */
function hasBodyParam(method: string, route: any): boolean {
  if (method !== "post" && method !== "put" && method !== "patch") {
    return false;
  }

  // Check if there's a body parameter in the parameters array
  const hasBodyInParams =
    route.parameters?.some((p: any) => p.in === "body") ?? false;

  if (hasBodyInParams) {
    return true;
  }

  // For Swagger 2.0, if there are parameters check if they're all path or query
  const allParams = route.parameters || [];
  if (allParams.length > 0) {
    const hasOnlyPathOrQuery = allParams.every(
      (p: any) => p.in === "path" || p.in === "query",
    );
    // If all parameters are path/query, then there's no body
    return !hasOnlyPathOrQuery;
  }

  // No parameters at all - assume no body for safety
  return false;
}

/**
 * Check if route has path parameters
 */
function hasPathParams(path: string): boolean {
  return path.includes("{") && path.includes("}");
}

/**
 * Check if route has query parameters
 */
function hasQueryParams(route: any): boolean {
  return route.parameters?.some((p: any) => p.in === "query") ?? false;
}

/**
 * Group routes by their base path
 */
function groupRoutes(spec: OpenAPISpec): Map<string, ServiceGroup> {
  const groups = new Map<string, ServiceGroup>();

  for (const [path, methods] of Object.entries(spec.paths)) {
    const basePath = getBasePath(path);

    if (!groups.has(basePath)) {
      groups.set(basePath, {
        name: getServiceName(basePath),
        basePath,
        routes: [],
        isAdmin: basePath.startsWith("admin/"),
      });
    }

    const group = groups.get(basePath)!;

    for (const [method, routeInfo] of Object.entries(methods)) {
      const operationName = getOperationName(method, path);
      const requestType = `Request${operationName}`;
      const responseType = `Response${operationName}`;

      group.routes.push({
        path,
        method: method.toUpperCase(),
        operationName,
        summary: routeInfo.summary,
        description: routeInfo.description,
        hasBody: hasBodyParam(method, routeInfo),
        hasPathParams: hasPathParams(path),
        hasQueryParams: hasQueryParams(routeInfo),
        requestType,
        responseType,
        tags: routeInfo.tags,
      });
    }
  }

  return groups;
}

/**
 * Generate the service method signature and implementation
 */
function generateServiceMethod(route: RouteInfo): string | null {
  const {
    method,
    path,
    operationName,
    hasBody,
    hasPathParams,
    hasQueryParams,
    summary,
    tags,
  } = route;

  if (tags && tags.includes("CRUD")) {
    return null;
  }

  // Extract path parameters
  const pathParams =
    path.match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) || [];

  // Build method parameters
  const params: string[] = [];

  if (hasPathParams) {
    pathParams.forEach((param) => {
      params.push(`${param}: string`);
    });
  }

  // Add body parameter only if body is expected
  if (hasBody) {
    params.push(`body: ${route.requestType}['body']`);
  }

  if (hasQueryParams) {
    params.push(`query: ${route.requestType}['query']`);
  }

  // Build the path for ServerService
  let routePath = path;

  // Remove the base path prefix (account, admin/account, etc)
  const basePath = getBasePath(path);
  routePath = routePath.replace(
    new RegExp(`^/${basePath.replace("/", "\\/")}`),
    "",
  );
  routePath = routePath.replace(/^\//, ""); // Remove leading slash if any

  // Replace path parameters with template literals
  pathParams.forEach((param) => {
    routePath = routePath.replace(`{${param}}`, `\${${param}}`);
  });

  // Determine ServerService method to use
  let serverServiceMethod: string;
  let serverServiceParams: string[] = [];

  // The route for ServerService (without leading /)
  const serviceRoute = basePath.replace(/^admin\//, "").replace(/^api\//, "");

  if (method === "GET") {
    serverServiceMethod = "callGet";
    serverServiceParams = [`"${serviceRoute}"`, `\`${routePath}\``];
    if (hasQueryParams) {
      serverServiceParams.push("(query ? query : {}) as any");
    } else {
      serverServiceParams.push("{}");
    }
  } else if (method === "DELETE") {
    serverServiceMethod = "callDelete";
    serverServiceParams = [`"${serviceRoute}"`, `\`${routePath}\``];
    if (hasQueryParams) {
      serverServiceParams.push("(query ? query : {}) as any");
    } else {
      serverServiceParams.push("{}");
    }
  } else if (method === "POST") {
    serverServiceMethod = "callPost";
    if (hasBody) {
      serverServiceParams = [
        `"${serviceRoute}"`,
        `\`${routePath}\``,
        "(body ? body : {}) as any",
      ];
    } else {
      serverServiceParams = [`"${serviceRoute}"`, `\`${routePath}\``, "{}"];
    }
    if (hasQueryParams) {
      serverServiceParams.push("(query ? query : {}) as any");
    } else {
      serverServiceParams.push("{}");
    }
  } else if (method === "PUT") {
    serverServiceMethod = "callPut";
    if (hasBody) {
      serverServiceParams = [
        `"${serviceRoute}"`,
        `\`${routePath}\``,
        "(body ? body : {}) as any",
      ];
    } else {
      serverServiceParams = [`"${serviceRoute}"`, `\`${routePath}\``, "{}"];
    }
    if (hasQueryParams) {
      serverServiceParams.push("(query ? query : {}) as any");
    } else {
      serverServiceParams.push("{}");
    }
  } else {
    throw new Error(`Unsupported method: ${method}`);
  }

  // Generate JSDoc comment
  const jsdoc = summary ? `  /**\n   * ${summary}\n   */\n` : "";

  // Generate method
  const methodName =
    operationName.charAt(0).toLowerCase() + operationName.slice(1);
  const returnType = `Promise<${route.responseType}['200']>`;

  return `${jsdoc}  ${methodName}(${params.join(", ")}): ${returnType} {
    return ServerService.${serverServiceMethod}(${serverServiceParams.join(", ")}) as ${returnType};
  }`;
}

/**
 * Generate service class for a group of routes
 */
function generateServiceFile(group: ServiceGroup): string {
  const { name, routes } = group;

  // Generate imports for all request/response types
  const typeImports = new Set<string>();
  routes.forEach((route) => {
    if (route.requestType) typeImports.add(route.requestType);
    if (route.responseType) typeImports.add(route.responseType);
  });

  const imports = `// @ts-nocheck - Auto-generated service file
import { ServerService } from "@/common_lib/services/ServerService";
import { MockableService } from "../mocks/MockableService";
import type {
  ${Array.from(typeImports).sort().join(",\n  ")}
} from "../openapi/types.gen";
`;

  // Generate methods
  const methods = routes
    .map((route) => generateServiceMethod(route))
    .filter((m) => m !== null)
    .join("\n\n");

  // Generate class
  const serviceClass = `/**
 * ${name}Service
 * Auto-generated service for ${name} endpoints
 */
class ${name}ServiceClass extends MockableService<${name}ServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
${methods}
}

export const ${name}Service = new ${name}ServiceClass();
`;

  return imports + "\n" + serviceClass;
}

/**
 * Main function
 */
function main() {
  console.log("🚀 Generating services from OpenAPI spec...\n");

  // Parse CLI arguments
  const options = parseArguments();

  // Validate input file exists
  if (!fs.existsSync(options.input)) {
    console.error(`❌ Error: Input file not found: ${options.input}`);
    process.exit(1);
  }

  // Parse the spec
  const spec = parseOpenAPISpec(options.input);
  console.log(`📖 Parsed OpenAPI spec from ${options.input}`);

  // Group routes
  const groups = groupRoutes(spec);
  console.log(`📦 Found ${groups.size} service groups:\n`);

  groups.forEach((group, basePath) => {
    console.log(
      `   - ${group.name} (${basePath}): ${group.routes.length} routes`,
    );
  });

  // Create output directory
  if (!fs.existsSync(options.output)) {
    fs.mkdirSync(options.output, { recursive: true });
  }

  console.log(`\n📁 Output directory: ${options.output}\n`);

  // Generate service files
  let generatedCount = 0;
  groups.forEach((group) => {
    const fileName = `${group.name}Service.ts`;
    const filePath = path.join(options.output, fileName);
    const content = generateServiceFile(group);

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Generated ${fileName}`);
    generatedCount++;
  });

  console.log(`\n🎉 Successfully generated ${generatedCount} service files!`);
}

// Run the script
main();
