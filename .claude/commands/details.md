Given the model, use the following components to build out a details view for the model that helps the user see and edit the specific object.

**All models use mobx for state management so dont use any state hooks or other state management libraries**


**Be sure to group fields by related fields using DetailFieldContainer to make it easier for the user to understand the form.  The grouping should be by what fields are related / similar / you'd edit them together**

**If you have questions about what fields are important, ask first before making assumptions.**

All the detail fields that you can use are in `ui/src/common/components/form/details/`

Here are the available components you can use with a brief description of each:

 - DetailFieldContainer.tsx This component is used to group together related form fields. It will wrap the grid safely


- DetailFieldCheckbox.tsx This component is used for 0/1 fields. It will render a checkbox input.


## Model Relationships 
- `DetailFieldModelSelect.tsx` This component is used for fields that are a single-select of related models. It will render a select input, but if there are a lot of options, consider using DetailFieldModelSearchSelect instead

- `DetailFieldModelMultiSelect.tsx` This component is used for fields that are a multi-select of related models. It will render a multi-select input, but if there are a lot of options, consider using DetailFieldModelSearchMultiSelect instead

- `DetailFieldModelSearchMultiSelect.tsx` This component is used for fields that are a multi-select of related models with a search input. It will render a searchable multi-select input. Use this when a model has alot of options

- `DetailFieldModelSearchSelect.tsx` This component is used for fields that are a single-select of related models with a search input. It will render a searchable select input. Use this when a model has a moderate number of options
If using a model relationship, this component requires two types <SourceType,TargetType>. 
```tsx
 <DetailFieldModelSelect<AccountModel, OrganizationModel>
            record={props.account}
            displayField="organization_name"
            field="organization_id"
            label="Organization"
            placeholder="Organization"
            modelName="organization"
            modelSearchField="name"
            modelDisplayField="label"
            modelSearchFilters={{ disabled: "0" }}
            reloadOnSave={true}
          />
```

**try to always use label as the model display field, and q as the model search field**
- if a model doesnt have a good to understand label, modify it in the XXModel.ts to make it useful
- Assume all models would already have a corresponding model to reference and you shouldnt create a new one.


## Simple Select Fields
- DetailFieldMultiSelect.tsx This component is used for fields that are a multi-select of constants. It will render a multi-select input.
- DetailFieldSelect.tsx This component is used for fields that are a single-select of constants. It will render a select input.
- The constants and statuses for a model only relate to that model itself.

```tsx
<DetailFieldSelect
            record={props.account}
            field="relation_to_primary"
            label="Relation to Primary"
            options={constants.account.relation}
            displayField="relation_to_primaryFmt"
          />
```

## Text Fields
- `DetailFieldText.tsx` This component is used for short text fields. It will render a text input.
- `DetailFieldTextArea.tsx` This component is used for long text fields. It will render a textarea input.
- `DetailFieldCodeEdit.tsx` This component is used for code fields. It will render a code editor input.
- `DetailFieldColor.tsx` This component is used for color fields. It will render a color picker input.
- `DetailFieldDate.tsx` This component is used for date fields. It will render a date picker input.
- `DetailFieldReadOnly.tsx` This component is used for read-only fields. It will render a read-only input.



## JSONB Fields
 If using a sub field that is JSONB, there is a helper for generics to make sure the fields line up.  You also are required to use a parentRecord to make sure it saves properly.  Also make sure the JSONB class extends `ValidationClass` from the models package or typescript wont compile
```tsx
<DetailFieldTextArea
            record={props.organization.properties as SafeBaseModel<Properties>}
            parentRecord={props.organization}
            field="pricing_text"
            label="Pricing Text"
            placeholder="Pricing Text Here....."
            helpText="This is default text if there is no pricing info in the plan"
          />
```


## Complex Fields for certain uses

- `DetailFieldArray.tsx` This component is used for fields that are an array of values.
