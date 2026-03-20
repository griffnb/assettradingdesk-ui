import { defineConfig } from "@hey-api/openapi-ts";

const GO_SWAGGER_PATH =
  process.env.GO_SWAGGER_PATH || "./swag_docs/swagger.json";

export default defineConfig({
  input: GO_SWAGGER_PATH,
  enums: true,
  output: { path: "packages/models/src/openapi", indexFile: false },
  parser: {
    transforms: {
      enums: "root",
    },
  },
  plugins: [
    {
      name: "@hey-api/typescript",
      definitions: (name) => {
        const parts = name.split(".");
        console.log("Processing type:", name);
        if (parts.length !== 2) return name;

        const [prefix, typeName = ""] = parts;

        console.log("Processing type:", name);

        // SuccessResponse and ErrorResponse cleanup
        if (prefix == "response") {
          console.log("Special Response Case", typeName);
          return typeName;
        }

        // Remove underscores to see if its a match
        const normalized = prefix.split("_").join("");

        // Check if typeName already starts with the prefix (case-insensitive)
        if (typeName.toLowerCase().startsWith(normalized.toLowerCase())) {
          console.log("Type name already has prefix:", typeName);
          return typeName;
        }

        // Convert prefix to PascalCase
        const pascalPrefix = prefix
          .split(/_|-|\s+/)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join("");
        // Otherwise, concatenate prefix with typeName
        console.log(
          "Adding prefix to type name:",
          pascalPrefix + typeName.charAt(0).toUpperCase() + typeName.slice(1),
        );
        return (
          pascalPrefix + typeName.charAt(0).toUpperCase() + typeName.slice(1)
        );
      },
      requests: { name: "Request{{name}}" },
      responses: { name: "Response{{name}}" },
      enums: { enabled: true, mode: "typescript" },
    },
  ],
});
