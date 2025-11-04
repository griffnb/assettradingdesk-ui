# Forms & Validation

## High-Level Flow
- Forms edit MobX models directly; every field updates the backing record in-place via `runInAction`, keeping `_dirtyAttributes` and validation state in sync (`packages/ui/src/common/components/form/fields/FormFieldText.tsx:35`).
- Before saving, call `isObjectValid(model)` to trigger all validation rules; bail if any messages are returned (`apps/admin/app/pods/company/components/CompanyForm.tsx:20`).
- Persist with `model.save()` and route success back through callbacks or navigation fallbacks; `rollback()` on cancel to restore the last loaded snapshot (`apps/admin/app/pods/company/components/CompanyForm.tsx:36`).

## FormWrap Contract
- Wrap every form body in `FormWrap` to get consistent spacing, button placement, and keyboard handling (`apps/admin/app/pods/company/components/CompanyForm.tsx:57`).
- `FormWrap` intercepts Enter (except inside textareas) and calls `saveAction`, preventing accidental double submits (`packages/ui/src/common/components/form/wrap/FormWrap.tsx:46`).
- Buttons are BusyButtons for built-in loading states; pass `showCancel`, `cancelAction`, and `extraButtons` as needed. Use `customButtons` when the default footer shouldn’t render (`packages/ui/src/common/components/form/wrap/FormWrap.tsx:70`).

## Field Components
- Every field variant wraps `FormFieldWrap`, which handles labeling, required markers, and layout variants (`packages/ui/src/common/components/form/fields/FormFieldWrap.tsx:1`).
- Field components call `isFieldValid` when `record.tryValidation` or a local `validate` flag is true, so errors appear after first change/blur but don’t flicker upfront (`packages/ui/src/common/components/form/fields/FormFieldText.tsx:28`).
- `validateOn` governs when the local `validate` flag flips (`FormFieldText` supports `change` or `blur`). Use `extraErrors`/`validationRule` to inject temporary rules without altering the model schema (`packages/ui/src/common/components/form/fields/types.ts:4`).
- Use the strongest semantic field: `FormFieldText` for strings/numbers/zip, `FormFieldSelect` for constants, `FormFieldModelSelect` when backing data comes from another store, and the array/map variants for repeatable primitives (`packages/ui/src/common/components/form/fields/FormFieldSelect.tsx:18`, `packages/ui/src/common/components/form/fields/FormFieldModelSelect.tsx:16`).
- Inline additions such as constants or tag arrays lean on structured components (`FormFieldConstantsCreator`, `FormFieldArray`) that maintain local rows then sync via `runInAction` (`packages/ui/src/common/components/form/fields/FormFieldConstantsCreator.tsx:49`, `packages/ui/src/common/components/form/fields/FormFieldArray.tsx:44`).

## Validation Model
- Extend `ValidationClass` on nested JSON types so they expose `validationRules`/`tryValidation`; register them with `addObserve` inside the host model constructor to propagate dirty state and validation (`packages/models/src/models/company/model/CompanyBaseModel.ts:12`, `packages/models/src/models/company/model/CompanyModel.ts:32`).
- Global rules live alongside the model (`model/validation_rules.ts`) and are surfaced through a `validationRules` getter, letting components rely on the model as the single source of truth (`packages/models/src/models/asset/model/AssetModel.ts:13`).
- Use `tryValidation` to flip all fields into validation mode (e.g., before submit) or rely on field-level `validate` toggles for incremental feedback (`packages/utils/src/validations.ts:4`).

## Modals & Layers
- Launch forms in layers with `LayerService.add` and close via `LayerService.remove`. Modals typically host a `FormModal` wrapper that sets title, manages close/save buttons, and renders the form body (`apps/admin/app/pods/company/components/CompanyFormModal.tsx:19`, `packages/ui/src/common/components/modal/FormModal.tsx:1`).
- Pass `onSuccess` to propagate refresh hooks (e.g., reloading table filters) before dismissing the layer (`apps/admin/app/pods/company/components/CompanyFormModal.tsx:12`).

## Patterns to Keep
- Keep forms minimal: declare fields inline inside `FormWrap`; avoid extra component layers unless the form becomes unwieldy.
- Stay in MobX land—no separate React state for form values. If a field needs derived UI state (e.g., row arrays), mirror it locally but sync back to the record immediately like the provided array/constant components.
- Let shared inputs handle visuals; stick to Tailwind classes already provided through `cva` variants rather than mixing inline style or custom markup (`packages/ui/src/common/components/fields/TextInput.tsx:1`).
- Prefer descriptive `label`, `placeholder`, and `helpText` so the form remains self-documenting. `FormFieldWrap` supports inline CTAs via `labelButton`/`linkHandler` when you need “Add new …” actions without cluttering the layout (`packages/ui/src/common/components/form/fields/FormFieldWrap.tsx:73`).

