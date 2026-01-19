Given the model, use the following components to build out the table filters based on the fields of the model

the type definitions for the fields are in ./packages/ui/src/common/components/types/filters.ts


type: "simple-select" | "multi-select"; // used for constant fields
type: "model-select" | "model-multi-select"; // used for model relationship fields that have a small number of options
type: "model-search-select" | "model-search-multi-select"; // used for model relationship fields that have a moderate or large number of options
type: "text" | "email" | "number"; // used for text based fields
type: "checkbox"; // used for 0/1 fields
type: "date-range"; // used for date range fields
type: "gap"; // used to add spacing between groups of fields



## Field

the field is either a string or an object with the following properties
- queryParam: the query param to use in the URL for the filter
- postgresColumn: the full postgres column name to use in the query (table.column)
- elasticsearchColumn: the full elasticsearch column name to use in the query (table.column)
- if the field is a string, it will be used for all three properties above
- if you are using the postgres and elastic search columns, you can use the query builder logic to customize the query
- see in the golang internal/controllers/README.md section on Query Building for more details, a sample is below:

**Supported Query Patterns:**

| Query Parameter | SQL Result | Description |
|-----------------|------------|-------------|
| `?name=john` | `WHERE account.name = 'john'` | Exact match |
| `?name[]=john&name[]=jane` | `WHERE account.name IN('john','jane')` | Multiple values |
| `?not:name=john` | `WHERE account.name != 'john'` | Not equal |
| `?q:name=john` | `WHERE LOWER(account.name) ILIKE '%john%'` | Like search |
| `?gt:age=25` | `WHERE account.age > 25` | Greater than |
| `?lt:age=65` | `WHERE account.age < 65` | Less than |
| `?between:age=25\|65` | `WHERE account.age >= 25 AND account.age <= 65` | Range |
| `?limit=10` | `LIMIT 10` | Result limit |
| `?offset=20` | `OFFSET 20` | Result offset |
| `?order=name,created_at desc` | `ORDER BY account.name asc, account.created_at desc` | Custom ordering |

Example Gap
```ts
 {
    type: "gap",
    placeholder: "",
    label: "Some Section Label",
    field: "",
  },
```

Example Model Search Multi Select
Field is the field to query on, modelName is the related model to query, modelDisplayField is the field to display in the select options, modelSearchField is the field to search on, modelSearchFilters are any additional filters to apply to the search, modelSearchParam is the query param to use for the search input
```ts
   {
    placeholder: "Organization",
    type: "model-search-multi-select",
    field: "organization_id",
    modelName: "organization",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
    modelSearchParam: "q",
  },
```


Example Multi Select with constants

```ts
  {
    placeholder: "Organization Type",
    type: "multi-select",
    field: {
      queryParam: "organization_type_id",
      postgresColumn: "organizations.type",
      elasticsearchColumn: "organization_type_id",
    },
    options: constants.organization.type,
  },
```

Example Select with constants
```ts
  {
    placeholder: "Organization Role",
    type: "multi-select",
    field: "org_role",
    options: constants.account.org_role,
  },
```

Example Checkbox for 0/1 fields
Checked and unchecked values can allow for cusomization of what is sent in the query
```ts
   {
    placeholder: "Is Minor",
    type: "checkbox",
    field: "is_minor",
    checkedValue: "1",
    uncheckedValue: "",
  },