# TechBoss AI Model System

This document provides a comprehensive overview of the model system used in TechBoss AI, covering the MobX-based store architecture, model lifecycle, and development patterns.

## Architecture Overview

The model system is built around several core concepts:

- **BaseModel**: Foundation class that all models extend, providing common attributes and behaviors
- **StoreModel**: Handles serialization, deserialization, and data persistence
- **APIStore**: Manages API communication with caching and query capabilities
- **Attributes (@attr)**: Decorators that define model properties with type information and options
- **Constants**: Centralized configuration for status values, roles, and other enums
- **Services**: Encapsulated business logic for complex model operations

## 1. How the Model System Works

### Core Components

**BaseModel** (`BaseModel.ts`)

```typescript
export class BaseModel extends StoreModel {
  @attr("string") urn: string = "";
  @attr("number") disabled: number = 0;
  @attr("number") deleted: number = 0;
  @attr("number") status: number = 0;
  @attr("string") created_by_urn: string | null = null;

  // Readonly is for joined fields only
  @attr("date-dayjs", { readOnly: true }) created_at: dayjs.Dayjs | null = null;
  // ... more common fields
}
```

All models inherit from BaseModel, gaining standard fields like timestamps, status, and URN identifiers.

**StoreModel** (`store/StoreModel.ts`)

- Handles serialization/deserialization
- Manages dirty attribute tracking
- Provides save/reload functionality
- Integrates with MobX for reactivity

**Model Structure**
Each model follows this pattern:

```
models/[model_name]/
├── _constants/          # Status, role, and other constant definitions
├── constants.ts         # Exports all constants for the model
├── model/
│   ├── [Model]BaseModel.ts   # Base attributes and structure that come directly from database/backend, can be generated
│   ├── [Model]Model.ts       # Main model class with business logic / computed fields, anything not 1-1 with the database or backend
│   └── validation_rules.ts   # Validation rules for the model
└── services/           # Custom business logic (optional)
    └── [Model]Service.ts
```

## 2. How the Store Works for Fetching/Querying Models

### Store Registration

Models are registered in `store/Store.ts`:

```typescript
export const Store = {
  admin: new APIStore({
    _class: AdminModel,
    modelName: "admin",
  }),
  account: new APIStore({
    _class: AccountModel,
    modelName: "account",
  }),
  // ... more stores
};
```

### Query Methods

**Basic Queries**

```typescript
// Get all records
const response = await Store.admin.query({ status: 100 });
if (response.success) {
  const admins = response.data; // AdminModel[]
}

// Get single record by ID
const response = await Store.admin.get("some-id");
if (response.success) {
  const admin = response.data; // AdminModel
}

// Custom endpoint queries
const response = await Store.admin.queryRecord("me", {});
const response = await Store.admin.queryRecords("active", { limit: 10 });
```

**Caching**

- Default TTL: 500ms
- Automatic cache invalidation
- Skip cache with `{ skipCache: true }`

### Store Types and Keys

Store keys are centrally managed in `types/store_keys.ts`:

```typescript
export type StoreKeys = "registration" | "sage_product" | "admin" | "account";
```

## 3. How Models are Modified and Saved (MobX Integration)

### MobX Observable Setup

Models are made observable in their constructor:

```typescript
constructor(store: IStore<AdminModel>) {
  super(store);
  this.addObserve(this); // Makes the model observable
  this.addObserve(this.bookmarks, this, "bookmarks"); // For nested objects
}
```

### Modification and Dirty Tracking

```typescript
// When you modify a model property:
admin.name = "New Name";
admin.email = "new@example.com";

// The system automatically tracks dirty attributes
console.log(admin.isDirty); // true
console.log(admin._dirtyAttributes); // { name: "New Name", email: "new@example.com" }
```

### Saving Changes

```typescript
// Save only changed attributes (default behavior)
const response = await admin.save();

// Save all attributes
const response = await admin.save({}, true);

// Save with extra parameters
const response = await admin.save({ notify: "true" });

if (response.success) {
  console.log("Model saved successfully");
  console.log(admin.isDirty); // false - dirty attributes cleared
}
```

### Rollback Changes

```typescript
// Revert to last loaded state
admin.rollback();
console.log(admin.isDirty); // false
```

## 4. How to Register a New Model

### Step 1: Add to Store Keys

```typescript
// types/store_keys.ts
export type StoreKeys =
  | "registration"
  | "sage_product"
  | "admin"
  | "account"
  | "new_model";
```

### Step 2: Create Store Instance

```typescript
// store/Store.ts
import { NewModel } from "../models/new_model/model/NewModel";

export const Store = {
  // ... existing stores
  new_model: new APIStore({
    _class: NewModel,
    modelName: "new_model",
  }),
};
```

### Step 3: Export Constants (if any)

```typescript
// constants.ts
import { constants as new_model } from "./models/new_model/constants";

export const model_constants = {
  admin,
  account,
  new_model, // Add here
};
```

## 5. Using `plop pod` to Scaffold a New Model

The plop generator creates a complete model structure:

```bash
npm run plop pod
```

**Prompts:**

- Model name (singular, e.g., "user")
- Model plural (e.g., "users")

**Generated Files:**

```
src/pods/[model]/
├── _constants/status.ts         # Status constants
├── components/[Model]Form.tsx   # React form component
├── model/
│   ├── [Model]BaseModel.ts     # Base model with attributes
│   ├── [Model]Model.ts         # Main model class
│   ├── [Model]Store.ts         # Store configuration
│   └── validation_rules.ts     # Validation rules
├── pages/
│   ├── [Model]Edit.tsx         # Edit page component
│   ├── [Model]Index.tsx        # List page component
│   └── [Model]New.tsx          # New record page component
├── columns.tsx                 # Table column definitions
├── constants.ts                # Model constants export
└── filters.ts                  # Query filters

src/pages/[models]/             # Route files
├── index.tsx                   # /models route
├── new/index.tsx              # /models/new route
└── edit/[id].tsx              # /models/edit/[id] route
```

**After scaffolding:**

1. Customize the BaseModel attributes
2. Add business logic to the main Model class
3. Define validation rules
4. Configure status constants
5. Register in the main Store

## 6. Custom Endpoints and Service Pattern

### Service Structure

For complex business logic, create service files following this pattern:

```typescript
// models/[model]/services/_[feature].ts (private functions)
const _calculateUserScore = (user: UserModel): number => {
  // Private implementation
  return user.points * user.multiplier;
};

const _validateUserData = (data: any): boolean => {
  // Private validation logic
  return data.email && data.name;
};

export { _calculateUserScore, _validateUserData };
```

```typescript
// models/[model]/services/UserService.ts (public interface)
import { _calculateUserScore, _validateUserData } from "./_userLogic";

export const UserService = {
  calculateScore: (user: UserModel) => _calculateUserScore(user),
  validateData: (data: any) => _validateUserData(data),

  async promoteUser(user: UserModel): Promise<boolean> {
    if (user.score > 1000) {
      user.role = USER_ROLES.PREMIUM;
      return (await user.save()).success;
    }
    return false;
  },
};
```

### Benefits of This Pattern

- **Encapsulation**: Private functions (`_prefix`) prevent external usage
- **Testability**: Each function can be tested independently
- **Organization**: Related functionality grouped together
- **Maintainability**: Clear separation between public API and implementation

## 7. Attributes (@attr) and Options

### Attribute Types

```typescript
export type AttrType =
  | "bool" // Boolean values
  | "string" // String values
  | "number" // Numeric values
  | "decimal" // Decimal/float values
  | "json" // Complex objects
  | "ts-dayjs" // Timestamps (deprecated)
  | "uuid" // UUID strings
  | "date-dayjs"; // Dayjs date objects
```

### Attribute Options

```typescript
export interface AttrOptions {
  readOnly?: boolean; // Prevents serialization for saves, used on join fields
  nullable?: boolean; // Allows null values only on non UUID fields that need nullable
}
```

### Usage Examples

```typescript
export class UserBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") email: string = "";
  @attr("number") age: number = 0;
  @attr("bool") active: boolean = true;

  //
  @attr("date-dayjs", { readOnly: true }) created_at: dayjs.Dayjs | null = null;
  @attr("json", { nullable: true }) preferences: UserPreferences | null = null;
}
```

### Serialization Behavior

- **New models**: Only non-empty attributes are serialized
- **Existing models**: Only dirty (changed) attributes are serialized
- **readOnly attributes**: Never serialized for saves
- **Nullable attributes**: Null values are preserved during serialization

### Nested Objects (JSON attributes)

- Be sure the class extends ValidationClass if its ever meant to be edited
- Example:

```typescript
class UserPreferences extends ValidationClass {
  theme: string = "light";
  notifications: boolean = true;
  language: string = "en";
}

export class UserModel extends BaseModel {
  @attr("json", { classType: UserPreferences })
  preferences: UserPreferences = new UserPreferences();

  constructor(store: IStore<UserModel>) {
    super(store);
    this.addObserve(this);
    this.addObserve(this.preferences, this, "preferences"); // Make nested object observable
  }
}
```

## Development Best Practices

1. **Always extend BaseModel** for standard fields and behaviors
2. **Use MobX observables** by calling `addObserve()` in constructors
3. **Define validation rules** for all user-input fields
4. **Create constants** for status values and enums
5. **Use services** for complex business logic
6. **Test serialization** with both new and existing model instances
7. **Leverage caching** but understand TTL implications
8. **Handle errors** from async operations appropriately

## Common Patterns

### Status Management

```typescript
get statusLabel(): string {
  const constant = findConstant(constants.user.status, this.status);
  return constant.label;
}
```

### Form Integration

```typescript
// Models work seamlessly with form libraries
const form = useForm({
  defaultValues: user.toBaseObject(),
  validationSchema: user.validationRules,
});
```

### Reactive UI Updates

```typescript
// MobX integration provides automatic re-rendering
const UserComponent = observer(() => {
  return <div>{user.name}</div>; // Re-renders when user.name changes
});
```

This system provides a robust foundation for data management with built-in caching, validation, serialization, and reactive updates through MobX integration.
