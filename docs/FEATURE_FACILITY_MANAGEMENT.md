# Feature: Facility Management

## Overview

Add a new section "FacilityManagement" to the customer UI where users can create and update facilities in their organization. This feature will include a table view for listing facilities and a form for creating/editing facility records.

## Backend Model Reference

**Location**: `/Users/griffnb/projects/asset-trading-desk/assettradingdesk-go/internal/models/facility/facility.go`

### Fields

- `organization_id` (UUID, nullable, indexed)
- `company_id` (UUID, nullable, indexed)
- `name` (text)
- `country` (text)
- `address` (jsonb, type: common.Address)
  - `raw_address` (string)
  - `city` (string)
  - `state` (string)
  - `zip` (string)
- `phone` (text)
- `description` (text)
- `metadata` (jsonb, type: MetaData)
  - `wafer_sizes` (array of constants.WaferSize)

## Todo List

### 1. Align Frontend Model with Backend

- [ ] Update `FacilityBaseModel` to match backend structure
  - [x] Address structure already matches (raw_address, city, state, zip)
  - [ ] Remove `company_types` from `FacilityMetaData` (not in backend)
  - [ ] Change `wafer_sizes` type from `number[]` to match backend constants

### 2. Create Facility Form Component

- [ ] Create `FacilityForm.tsx` in `/packages/ui/src/customer/settings/`
- [ ] Use `FormFieldText` for basic text fields (name, country, phone)
- [ ] Use `FormFieldTextArea` for description
- [ ] Add address fields (raw_address, city, state, zip)
- [ ] Add metadata fields (wafer_sizes)
- [ ] Use Card/CardContent layout similar to AssetCreationForm
- [ ] Handle create/edit modes
- [ ] Add save/cancel actions

### 3. Create Facility Table Component

- [ ] Create `FacilityManagement.tsx` in `/packages/ui/src/customer/settings/`
- [ ] Use CompactServerTable or StandardTableWrap
- [ ] Define table columns: name, country, phone, description
- [ ] Add "New Facility" button
- [ ] Add edit/delete actions per row
- [ ] Integrate with FacilityModel query

### 4. Add Navigation

- [ ] Update `CustomerAuthLeftNav.tsx`
- [ ] Add "Facilities" link under "Account Management" section
- [ ] Use appropriate icon (Building2 or Factory)
- [ ] Route to `/manage/facilities`

### 5. Routing

- [ ] Add route for `/manage/facilities` (index/table view)
- [ ] Add route for `/manage/facilities/new` (create form)
- [ ] Add route for `/manage/facilities/:id` (edit form)

## Implementation Plan

### Phase 1: Model Alignment

**Files to modify:**

- `/packages/models/src/models/facility/model/FacilityBaseModel.ts`

**Changes:**

- Update `FacilityMetaData` class to remove `company_types` field
- Ensure `wafer_sizes` is properly typed

### Phase 2: Form Component

**Files to create:**

- `/packages/ui/src/customer/settings/FacilityForm.tsx`

**Design:**

- Two-column layout with Card components
- Left column: Name, Country, Phone, Address fields
- Right column: Description, Metadata
- Save/Cancel buttons in footer
- Validation using `isObjectValid`

### Phase 3: Table Component

**Files to create:**

- `/packages/ui/src/customer/settings/FacilityManagement.tsx`

**Design:**

- Use CompactServerTable with TableState
- Columns: Name, Country, Phone, Actions
- "New Facility" button in header
- Row actions: Edit, Delete
- Click row to navigate to edit form

### Phase 4: Navigation & Routing

**Files to modify:**

- `/packages/ui/src/customer/auth/nav/CustomerAuthLeftNav.tsx`
- Customer app routing configuration

**Changes:**

- Add facilities nav item to managementItems array
- Configure routes in customer app

## Technical Notes

### Address Structure

The backend uses `common.Address` which matches the frontend `FacilityAddress`:

- `raw_address` ✓
- `city` ✓
- `state` ✓
- `zip` ✓

### MetaData Discrepancy

- **Backend**: Only has `wafer_sizes` (array of `constants.WaferSize`)
- **Frontend**: Has `wafer_sizes` (number[]) and `company_types` (number[])
- **Action**: Remove `company_types` from frontend model

### Table Component Decision

Based on research, we have two options:

1. **CompactServerTable**: Simpler, uses StandardTableWrap with hideFilters=true
2. **Shadcn Table**: Direct use like CustomerDashboardListingsTable

**Recommendation**: Use CompactServerTable for consistency with admin patterns.

## References

- Similar form: `/packages/ui/src/customer/assets/management/AssetCreationForm.tsx`
- Table example: `/packages/ui/src/customer/dashboard/CustomerDashboardListingsTable.tsx`
- Nav component: `/packages/ui/src/customer/auth/nav/CustomerAuthLeftNav.tsx`
