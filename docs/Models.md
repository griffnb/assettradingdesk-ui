# Models Playbook

## IMPORTANT

**Never create a new database model adhoc unless asked for, use `#ui-code-tools` to built the skeleton**

## Architecture Snapshot

- `BaseModel` extends `StoreModel`, so every domain model inherits lifecycle metadata (ids, timestamps, status) plus MobX persistence hooks (`packages/models/src/BaseModel.ts:7`, `packages/models/src/store/StoreModel.ts:1`).
- Each domain exposes a MobX-aware `APIStore` registered in `packages/models/src/store/Store.ts:9`; the store wraps `ServerService`, handles caching, and hydrates JSON responses into lived model instances.
- Always create records via the store (`Store.asset.create()`). Never call `new Model()` directly.

## Folder & File Expectations

- Directory layout: `packages/models/src/models/<entity>/` with `_constants/`, `model/`, `services/`, and a `constants.ts` re-export (`packages/models/src/models/company/constants.ts:1`). Use `#ui-code-tools` to scaffold the full pod.
- `model/<Entity>BaseModel.ts` mirrors the backend schema with nothing but `@attr` fields. Keep it pure data that comes form the API. Seperate out fields that can be changed from fields that are {readOnly:true} because they are just joined data
- `model/<Entity>Model.ts` derives from the base to add computed getters, validation accessors, navigation helpers, etc.
- Constants live under `_constants/` and roll up through `constants.ts` then `packages/models/src/constants.ts:1` for global access.

## Declaring Attributes

- Define every persisted field with `@attr` and the narrowest type: `string`, `number`, `decimal`, `uuid`, `json`, etc. (`packages/models/src/serializers/serializer.ts.:115`).
- Mark joins as `readOnly` so serialization skips them. Use `nullable` only when the backend needs `null` (all uuid relationships default to null and dont need this 'nullable').
- Keep BaseModels free of computed logic or derived state—those belong in the derived model.

## Observable Wiring & Nested Data

- In each derived model constructor, call `this.addObserve(this);` so MobX tracks field mutations and dirty state.
- For JSON fields with structure, create a concrete class (usually extending `ValidationClass`) and register it via `@attr("json", { classType: ... })`. Immediately wire observers on the child with `addObserve(child, this, "field")` so nested edits serialize and affect dirty state.
- Plain JSON blobs (audits, arrays) can use `@attr("json")` without `classType` when no special behavior is needed.

## Loading, Querying & Caching

- Always pull data through the shared `Store` export. Use:
  - `query(params)` for lists of objects.
  - `get(id)` for single fetches.
  - `queryRecord` / `queryRecords` for custom routes.
- `APIStore` caches responses with a 500 ms TTL. Pass `{ skipCache: true }` or `{ customTTL: 0 }` when freshness matters (e.g., after a save).
- Hydrate raw collections with `Store.<entity>.loadMany()` when the server returns plain arrays outside standard Store helpers.

## Mutations & Persistence

- Update fields directly on the model (`model.name = "Updated"`); MobX tracks changes automatically.
- Call `model.save(extraParams?, allData?)` to persist. It auto-switches between POST/PUT, then refreshes the instance from the response and clears dirty flags.
- Use `rollback()` to discard local edits or `copyChangesFrom(otherModel)` when syncing staged updates.
- Avoid mutating `_loaded_attributes` or `_dirtyAttributes` manually—go through provided helpers.

## Validation Pipeline

- Author validation rules per entity in `<entity>/validation_rules.ts` using `ValidationRulesType<{Entity}Model>` so typing stays aligned.
- Derived models expose `get validationRules()` returning the imported rules to keep forms in sync .
- Nested JSON classes extending `ValidationClass` can maintain their own `validationRules` and `tryValidation` flags if forms edit them directly (`packages/utils/src/validations.ts:4`).

## Constants & Labels

- Centralize enums/status values under `_constants/` and surface them via `constants.ts` for the model, then rely on `findConstant`/`findStatus` helpers in getters to translate IDs .
- Be sure all constants have a helper getter to translate the value into its constant, i.e.

```ts
 get example_typeConst(): IConstant {
    return findConstant(constants.example_obj.example_type, this.example_type);
 }

get example_typeStr():string{
  return example_typeConst().label
}
```

- Share these constants with rather than redefining arrays inline.

## Services & Cross-Model Logic

- House non-trivial workflows in `models/<entity>/services/`. Use underscore-prefixed helpers for private methods and export a compact public API .
- Keep model getters cheap and side-effect free—HTTP, persistence orchestration, and multi-model coordination belong in stores or services.

## Adding or Extending Models

1. Generate the pod via the approved tool.
2. Fill out BaseModel attributes to match the backend contract, set proper `@attr` options, and add nested classes when JSON fields require shape.
3. Implement derived model helpers, validation getter, and constructor observers.
4. Register the store key in `types/store_keys.ts:1` and plug the new `APIStore` into `store/Store.ts:9`.
5. Populate `_constants`, tweak validation rules, and create any services before touching UI code so downstream consumers can follow the pattern.

## Working Agreements

- Go through stores for both reads and writes; components should not call `ServerService` directly.
- Think about dirty state/rollback any time you add nested structures—make sure observers are wired before exposing them to forms.
- Prefer descriptive getters and helpers over spreading raw model props through components; keep the knowledge in the model layer.
- When the default store behavior isn’t enough, extend via services or `APIStore` options rather than inventing ad-hoc fetch logic.
