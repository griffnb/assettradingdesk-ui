Given the model, use the following components to build out the table columns based on the fields of the model

the type definitions for a column is below:
```ts
export interface IColumn<T extends object> {
  title: string; // the header of the column
  field: keyof T; // The object field name, only override this if you need custom query mechanisms
  displayField?: keyof T; // If the display field is different from the field, for standard types, you can just use the field + format and leave this off
  queryField: string | IField; // The field name to query on, needed for sorting and/or filtering, should be the field value normally
  filterValueField?: string | IField; // The field value to pull for filtering, only used for reporting
  filterTargetField?: string; // the filter target, only used for reporting
  csvHeaderName?: string; // If you want to define a different title in the CSV export
  csvPropertyName?: keyof T; // If you want to define a different property name in the CSV export
  render?: ColumnComponent<T>; // Used to override how the column is rendered, only need this for customizations outside of the default
  noSort?: boolean; // If you want to disable sorting on this column, mainly for if its a custom query or not standard database field
  class?: string; // If you want to add a className to the column
  headerClass?: string; // If you want to add a className to the header column
  total?: boolean; // If you want to show a total at the bottom of the column
  totalFormat?: TotalFormat; // If you want to format the total, only used if total is true
  hidden?: boolean; // If you want to hide the column by default
  fixed?: boolean; // If you want to fix the column so it cant be reordered.  Not normally used
  format?: TextFormat; // If you want to format the column, only used for standard types
  noExport?: boolean; // If you want to exclude this column from the CSV export
}
```




<example>
This is a regular column meant for data that doesnt make sense to inline edit, things that are complex or like UUIDs or joined data or dates
```ts
  {
    title: "First Name", // short readable title for header
    field: "first_name", // the actual field
    queryField: "first_name", // the actual field
    format?:"number" // only put in if its one of these types | "dollars"| "percent" | "number" | "decimal"  | "boolean";
  },
```
</example>

For simple inline edits like name / descriptions use a column that looks like this

```tsx
  {
    title: "Description", // pretty name
    field: "description", // the actual field
    queryField: "description", // the actual field
    type: "text", // "text" or "number"
    render: (options: ColumnComponentOptions<ExampleModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ExampleModel>}
          index={options.index}
        />
      );
    },
  } as InlineEditCellTextColumn<ExampleModel>,
```tsx

For boolean yes/no is_xxx type fields, you can use this inline edit column
```tsx
  {
    title: "Is Required",
    field: "is_required",
    queryField: "is_required",
    render: (options: ColumnComponentOptions<ExampleModel>) => {
      return (
        <InlineEditCellCheckbox
          record={options.record}
          column={
            options.column as InlineEditCellCheckboxColumn<ExampleModel>
          }
          index={options.index}
        />
      );
    },
  } as InlineEditCellCheckboxColumn<ExampleModel>,
```

This is a list of custom prebuilt column types.
`/packages/ui/src/common/components/table/cell/BadgeCell.tsx` // used for things that make sense as a colored badge
`/packages/ui/src/common/components/table/cell/ImageCell.tsx`  // preview of an image
`/packages/ui/src/common/components/table/cell/JSONCell.tsx`  // used for json data, shows a preview and full json on click
`/packages/ui/src/common/components/table/cell/LinkCell.tsx`  // used for links, can be internal or external
`/packages/ui/src/common/components/table/cell/MultiBadgeCell.tsx`  // used for multi select type fields that make sense as colored badges
`/packages/ui/src/common/components/table/cell/RowActions.tsx` // used for the actions column at the start of the row, all tables should have this by default already
`/packages/ui/src/common/components/table/cell/StatCell.tsx` // used for showing a stat with a label and value, only used in reporting tables
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellCheckbox.tsx`   // used for inline editing boolean fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellModelMultiSelect.tsx`  // used for inline editing multi select model relationship fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellModelSearchMultiSelect.tsx`  // used for inline editing multi select model relationship fields with a search input
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellModelSearchSelect.tsx`  // used for inline editing model relationship fields with a search input
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellModelSelect.tsx`  // used for inline editing model relationship fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellMultiSelect.tsx`  // used for inline editing multi select fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellSelect.tsx`  // used for inline editing select fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellText.tsx`  // used for inline editing text fields
`/packages/ui/src/common/components/table/cell/inline-edit/InlineEditCellWrap.tsx`  // used for inline editing wrapped fields



**MPORTANT**
Before beginning, list out all the columns you will add, with a description of the type of render you want to use for each column. to get feedback before writing the code.