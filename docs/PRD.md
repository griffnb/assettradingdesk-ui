# Product Requirements Document: Asset Trading Desk

**Version:** 1.0  
**Last Updated:** November 5, 2025  
**Status:** Active Development

---

## 1. Executive Summary

Asset Trading Desk is a **B2B SaaS marketplace platform** that connects buyers and sellers of high-value industrial assets. The platform combines a **public marketplace** for discovering and requesting assets with a powerful **CRM system** for traders to manage deals, relationships, and close transactions.

### Key Value Propositions

- **For Buyers:** Browse a comprehensive catalog of industrial assets, submit equipment requests, and get matched with available inventory
- **For Sellers:** List assets, receive qualified leads through automated matching, and track deals through completion
- **For Traders/Brokers:** Manage client relationships, track opportunities, negotiate deals, and close transactions through a structured pipeline

### Business Model

- Enterprise deals for large organizations
- Individual organization subscriptions
- Authentication and billing managed through Clerk

---

## 2. System Architecture Overview

### 2.1 Multi-Tenant SaaS Platform

Asset Trading Desk operates as a **shared marketplace** where:

- Multiple organizations can sign up independently
- Organizations can interact across boundaries (Org A can buy from Org B)
- Data isolation is manually enforced through queries.
- All organizations share the same asset catalog taxonomy (Industries, Categories, Manufacturers, Models)

### 2.2 Dual Interface Architecture

The platform consists of two primary interfaces:

1. **Customer App** (Public Marketplace)
   - Public-facing website for browsing assets
   - Self-service account creation and management
   - Asset discovery and request submission
   - View and manage personal opportunities

2. **Admin App** (CRM & Platform Administration)
   - Currently: System administration only (internal team)
   - Future: Power user CRM system for traders and brokers
   - Full CRUD operations on all entities
   - Pipeline management and deal tracking
   - Advanced reporting and analytics

---

## 3. Core Entity Model

### 3.1 User Management Hierarchy

#### Organizations

- **Definition:** Top-level tenant representing a business entity with a paid subscription
- **Created When:** A company signs up for the platform
- **Capabilities:** Full platform access, can create users, manage assets and requests
- **Relationship:** Can be linked to a Company entity if that company becomes a platform user

#### Accounts (Users)

- **Definition:** Individual login credentials for platform access
- **Types:**
  - **End Users:** Buyers/sellers managing their own assets/requests
  - **Traders/Brokers:** CRM users managing client relationships
  - **Admins:** Platform administrators (Read-Only Admin, Admin)
- **Roles:**
  - `ROLE_USER (1)` - Standard authenticated user
  - `ROLE_READ_ADMIN (90)` - Read-only administrator access
  - `ROLE_ADMIN (100)` - Full system administrator
- **Relationship:** Belongs to one Organization; may be linked to a Client entity

### 3.2 CRM Entities (Non-Self-Controlled)

These entities represent people and organizations managed **within the CRM**, not necessarily platform users.

#### Companies

- **Definition:** Business entities tracked in the CRM (e.g., "Intel", "Boeing")
- **Purpose:** Organize clients under corporate umbrellas
- **Data:** Name, address, contact info, website, description, metadata
- **Relationship:**
  - Belongs to one Organization (the CRM owner)
  - Can be linked to an Organization entity if they become a platform user
  - Parent of Facilities
  - Parent of Clients

#### Facilities

- **Definition:** Physical locations under a Company (e.g., "Intel Chandler Campus")
- **Purpose:** Track assets and clients at specific locations
- **Data:** Name, address, contact info, description
- **Relationship:**
  - Belongs to one Company
  - Belongs to one Organization (inherited from Company)
  - Parent of Clients

#### Clients

- **Definition:** Individual contacts within Companies/Facilities that traders interact with
- **Purpose:** CRM contact management
- **Data:** Name, title, email, phone, decision-maker status, contact preferences
- **Relationship:**
  - Belongs to one Company
  - Belongs to one Facility (optional)
  - May have a supervisor (another Client)
  - Can be linked to an Account if the client creates a platform login
  - Owns Assets and Requests (when created on their behalf)

**Key Concept:** The CRM allows traders to manage "Companies" and "Clients" who may never log into the platform. When a Client does create an account, they become both a Client (CRM entity) and an Account (platform user).

### 3.3 Asset Catalog Taxonomy

The platform uses a hierarchical taxonomy for organizing equipment:

```
Industry (e.g., "Manufacturing", "Healthcare")
    ↓
Category (hierarchical, e.g., "Medical Imaging" → "MRI Machines")
    ↓
Manufacturer (e.g., "Siemens", "GE Healthcare")
    ↓
Model (e.g., "Siemens Magnetom Vida", "GE Signa Explorer")
    ↓
Asset (individual items)
```

#### Industries

- **Definition:** Top-level categorization of asset types
- **Management:** Admin-created and curated
- **Examples:** Manufacturing, Healthcare, Transportation, Energy

#### Categories

- **Definition:** Hierarchical classification within industries
- **Features:**
  - Support parent-child relationships (subcategories)
  - Automatically generate hierarchy codes for efficient querying
  - Track category slugs for SEO-friendly URLs
- **Management:** Admin-created and curated
- **Examples:** "Medical Imaging" → "MRI Machines" → "High-Field MRI"

#### Manufacturers (Make)

- **Definition:** Companies that produce equipment
- **Features:**
  - Unique slug for URLs
  - Asset count tracking
- **Management:** Admin-created and curated
- **Examples:** Siemens, GE, Caterpillar, John Deere

#### Models

- **Definition:** Specific equipment models from manufacturers
- **Features:**
  - Linked to one Manufacturer and one Category
  - Unique slug for URLs
  - "Hot" flag for trending/popular models
  - Asset count tracking
- **Management:** Admin-created and curated
- **Examples:** "Caterpillar 320 Excavator", "GE Signa MRI Scanner"

### 3.4 Core Transaction Entities

#### Assets

- **Definition:** Physical equipment available for sale or tracking
- **Created By:**
  - Accounts (self-listing)
  - Admins on behalf of Clients (CRM workflow)
- **Key Data:**
  - Link to Model (defines what it is)
  - Owner: Organization, Company, and/or Client
  - Location (free text)
  - Configuration notes
  - Installation status, operational status
  - Year, quantity, serial number
  - **Price** (single value, can change during negotiation)
  - Verification timestamp
  - Pictures via Asset Files
- **Visibility:** Searchable in marketplace
- **Lifecycle:** Can be matched to multiple Requests

#### Requests

- **Definition:** Equipment needs submitted by buyers
- **Created By:**
  - **Automatically:** When an Account views a Model page (indicates interest)
  - **Manually:** By Accounts or Admins
- **Key Data:**
  - Link to Model, Manufacturer, or Category (varying specificity)
  - Requester: Organization, Company, Client, and/or Account
  - Description and configuration requirements
  - **Price Range:** Min and max acceptable price
  - Time frame and expiration
  - Source Request ID (for tracking duplicates/variations)
- **Lifecycle:** Can be matched to multiple Assets

#### Opportunities

- **Definition:** A potential match between an Asset and a Request
- **Creation:** **Automatically generated** by the matching system when:
  - A Request matches an available Asset
  - An Asset matches an existing Request
- **Key Data:**
  - Links to Asset and Request
  - Opportunity Type (enum, currently undefined)
  - Current Asset Price (snapshot/negotiated)
  - Current Request Price (snapshot/negotiated)
  - Quantity
  - References to buyer and seller (Company, Client, Facility, Pipeline)
- **States:**
  - **Active:** Newly created, pending review
  - **Killed:** User dismissed the match (not interested)
  - **Pipeline:** Moved to active deal pipeline
- **Workflow:**
  ```
  Opportunity Created (Auto-Match)
       ↓
  User Reviews
       ↓
  ├─→ Kill (Not Interested) [END]
  └─→ Convert to Pipeline (Interested)
  ```

#### Pipelines

- **Definition:** Active deals in progress between buyer and seller
- **Created By:** Converting an Opportunity into an active deal
- **Key Data:**
  - Name/identifier
  - Links to buyer (Client, Company, Facility, Owner Account)
  - Links to seller (Client, Company, Facility, Owner Account)
  - Organization context
  - **Stage:** Current position in the sales pipeline
- **Pipeline Stages:**
  1. **New** - Deal just created
  2. **Qualification** - Verifying fit and interest
  3. **Specifications** - Defining technical requirements
  4. **Negotiation** - Pricing and terms discussion
  5. **Paperwork** - Contracts and documentation
  6. **Closed** - Deal successfully completed
  7. **Lost** - Deal fell through
- **Purpose:** Track deal progression, manage negotiations, forecast revenue

---

## 4. Core Workflows

### 4.1 Buyer Journey (Customer App)

#### A. Discovery & Browsing

1. User browses asset catalog by Industry → Category → Manufacturer → Model
2. User views specific Model page
3. **System automatically creates a Request** for that Model (indicates interest)
4. User can refine Request (add specs, price range, timeframe)

#### B. Direct Request Submission

1. User navigates to "Submit Request" flow
2. User selects Model/Manufacturer/Category
3. User enters specifications, price range, timeframe
4. Request is created and enters matching system

#### C. Opportunity Management

1. Matching system identifies Assets that fit user's Requests
2. System creates Opportunities and notifies user
3. User reviews Opportunities:
   - **Kill:** Not interested, Opportunity closed
   - **Convert to Pipeline:** Interested, creates Pipeline entry
4. If converted, deal moves to trader/CRM workflow

### 4.2 Seller Journey (Customer App)

#### A. Asset Listing

1. User creates account (or logs in)
2. User navigates to "List Asset" flow
3. User selects Model from catalog
4. User enters:
   - Location, configuration, condition
   - Year, serial number, quantity
   - Price
   - Photos
5. Asset is created and enters matching system

#### B. Opportunity Management

1. Matching system identifies Requests that fit user's Assets
2. System creates Opportunities and notifies user
3. User reviews Opportunities (same workflow as buyers)

### 4.3 Trader/CRM Workflow (Admin App - Future)

#### A. Client Management

1. Create Companies (e.g., "Intel", "Boeing")
2. Create Facilities under Companies
3. Create Clients (contacts) under Companies/Facilities
4. Track which Clients are decision-makers
5. Link Clients to Accounts if they create platform logins

#### B. Asset/Request Management on Behalf of Clients

1. Trader creates Asset or Request
2. Associates it with Client, Company, Facility
3. Asset/Request enters matching system
4. Opportunities are created

#### C. Pipeline Management

1. View all active Pipelines
2. Filter by stage, client, company, owner
3. Update Pipeline stage as deal progresses
4. Track pricing changes during negotiation
5. Add notes and communication history
6. Close deals or mark as lost

#### D. Opportunity Review

1. View Opportunities for managed Clients
2. Kill irrelevant matches
3. Convert promising matches to Pipelines
4. Assign Pipelines to account owners (traders)

### 4.4 Automated Matching System

The matching engine runs continuously:

```
New Asset Created
    ↓
Search for matching Requests
    ↓
For each match:
    - Check Model compatibility
    - Check price range overlap
    - Check timeframe compatibility
    ↓
Create Opportunities

New Request Created
    ↓
Search for matching Assets
    ↓
For each match:
    - Check Model compatibility
    - Check price range overlap
    - Check availability
    ↓
Create Opportunities
```

**Matching Criteria:**

- Model must match (or Request allows broader match via Manufacturer/Category)
- Asset price within Request price range (if specified)
- Request not expired
- Asset still available
- Many-to-many: One Asset can match multiple Requests, one Request can match multiple Assets

---

## 5. Role-Based Access Control

### 5.1 Admin Endpoints (`/admin/*`)

Require elevated permissions (Admin or Read-Only Admin):

| Role                   | Permissions                                     |
| ---------------------- | ----------------------------------------------- |
| `ROLE_ADMIN (100)`     | Full CRUD on all entities, system configuration |
| `ROLE_READ_ADMIN (90)` | Read-only access to all entities                |

**Available Endpoints (per entity):**

- `GET /admin/{entity}` - List with advanced filtering
- `GET /admin/{entity}/{id}` - Get single record
- `POST /admin/{entity}` - Create new record
- `PUT /admin/{entity}/{id}` - Update record
- `GET /admin/{entity}/count` - Get total count

### 5.2 Public Authenticated Endpoints (`/{entity}`)

Require authentication (`ROLE_ANY_AUTHORIZED`):

- Same endpoint structure as admin routes
- Filtered to user's organization context
- Restricted field visibility (via `public:"view|edit"` tags)
- Cannot see internal-only fields

### 5.3 Data Isolation (Future)

Currently, the platform operates as a **shared marketplace**:

- All users can see all marketplace data (Assets, Requests in discovery)
- CRM data (Companies, Clients, Pipelines) is organization-scoped
- Future enhancement: Full multi-tenant data isolation per organization

---

## 6. Technical Architecture

### 6.1 Backend (Go)

- **Framework:** Custom Go REST API
- **Database:** PostgreSQL with migrations
- **ORM:** Custom model system with code generation
- **Authentication:** Clerk (external SaaS)
- **API Pattern:** RESTful with auto-generated CRUD endpoints

**Key Design Patterns:**

- Thread-safe models with internal mutexes
- Code generation for boilerplate (models, controllers, migrations)
- Struct tags control database schema and API visibility
- Query builder with URL parameter auto-parsing
- Role-based middleware with `RoleHandler`

### 6.2 Frontend

#### Customer App (React + Vite)

- **Framework:** React with React Router
- **State Management:** MobX
- **Styling:** Tailwind CSS + shadcn/ui components
- **Build Tool:** Vite
- **Purpose:** Public marketplace interface

#### Admin App (React + Vite)

- **Framework:** React with React Router
- **State Management:** MobX
- **Styling:** Tailwind CSS + shadcn/ui components
- **Build Tool:** Vite
- **Purpose:** CRM and administration interface

### 6.3 Shared Libraries

- **Models Package:** Shared TypeScript models with MobX decorators
- **UI Package:** Reusable shadcn/ui components
- **Utils Package:** Common utilities (logging, encoding, validation)
- **Common Lib Package:** Shared hooks, services, and types

### 6.4 Code Generation

The platform heavily uses code generation:

**Go Backend:**

```bash
#code-tools make_object ModelName    # Internal model
#code-tools make_public_object ModelName  # Public-facing model
```

Generates:

- Model structs with typed fields
- Database migrations
- CRUD controllers
- Repository query methods

**TypeScript Frontend:**

```bash
#ui_code_tools plop_vite_pod model_name model_names
```

Generates:

- Model classes
- Service classes
- CRUD pages (Index, New, Edit, Details)
- Forms and modals
- Routes

---

## 7. Key Features & Capabilities

### 7.1 Asset Catalog Management

- **Hierarchical taxonomy** (Industry → Category → Manufacturer → Model)
- **SEO-friendly URLs** via slug generation
- **Asset counts** tracked at each taxonomy level
- **Hot models** flagging for trending equipment
- **Rich metadata** support for custom fields

### 7.2 Smart Matching Engine

- **Automatic Request creation** from browsing behavior
- **Many-to-many matching** (1 Asset → N Requests, 1 Request → N Assets)
- **Multi-dimensional matching:**
  - Model compatibility
  - Price range overlap
  - Timeframe alignment
  - Location preferences (future)
- **Opportunity generation** with buyer/seller context

### 7.3 Pipeline Management

- **7-stage sales pipeline** (New → Qualification → Specs → Negotiation → Paperwork → Closed/Lost)
- **Deal tracking** with buyer/seller relationships
- **Price negotiation** tracking (current vs. original pricing)
- **Assignment** to account owners
- **Filtering and reporting** by stage, client, company

### 7.4 CRM Capabilities

- **Company/Facility/Client hierarchy**
- **Decision-maker tracking**
- **Contact information management**
- **Client-to-Account linking** (when CRM contacts become users)
- **Supervisor relationships**
- **Asset/Request management on behalf of clients**

### 7.5 Multi-Organization Support

- **Shared marketplace** across all organizations
- **Cross-organization matching** (Org A buys from Org B)
- **Subscription management** via Clerk
- **Organization-scoped CRM data**
- **Future:** Full data isolation option

### 7.6 File Management

- **Asset Files** (photos, documents)
- **Multiple files per asset**
- **Image optimization** and CDN delivery (future)

### 7.7 Audit & Change Tracking

- **Change logs** on critical entities (Accounts, Organizations, Companies, etc.)
- **CreatedBy/UpdatedBy tracking** on all records
- **Disabled/Deleted soft delete** pattern
- **Timestamp tracking** (created, updated, verified)

---

## 8. API Design Principles

### 8.1 RESTful Endpoints

All entities follow consistent patterns:

**Admin Endpoints:**

```
GET    /admin/{entity}           # List with filters
GET    /admin/{entity}/{id}      # Get single
POST   /admin/{entity}           # Create
PUT    /admin/{entity}/{id}      # Update
GET    /admin/{entity}/count     # Count
```

**Public Endpoints:**

```
GET    /{entity}                 # List (org-scoped)
GET    /{entity}/{id}            # Get single (org-scoped)
POST   /{entity}                 # Create (org-scoped)
PUT    /{entity}/{id}            # Update (org-scoped)
```

### 8.2 Query Parameters

Auto-parsed from URL query strings:

| Pattern      | Example                       | SQL Result                            |
| ------------ | ----------------------------- | ------------------------------------- |
| Exact match  | `?name=John`                  | `WHERE name = 'John'`                 |
| IN clause    | `?name[]=John&name[]=Jane`    | `WHERE name IN('John','Jane')`        |
| Not equal    | `?not:name=John`              | `WHERE name != 'John'`                |
| Like search  | `?q:name=John`                | `WHERE LOWER(name) ILIKE '%john%'`    |
| Greater than | `?gt:price=100`               | `WHERE price > 100`                   |
| Less than    | `?lt:price=500`               | `WHERE price < 500`                   |
| Between      | `?between:price=100\|500`     | `WHERE price >= 100 AND price <= 500` |
| Ordering     | `?order=name,created_at desc` | `ORDER BY name ASC, created_at DESC`  |
| Pagination   | `?limit=20&offset=40`         | `LIMIT 20 OFFSET 40`                  |

### 8.3 Response Formatting

**Success Response:**

```json
{
  "data": {
    /* entity or array */
  },
  "success": true
}
```

**Error Response:**

```json
{
  "error": "Human-readable error message",
  "success": false
}
```

### 8.4 Field Visibility Control

Fields use `public:"view|edit"` tags:

- **view:** Field returned in GET responses to public endpoints
- **edit:** Field can be modified in POST/PUT requests on public endpoints
- **No tag:** Internal field, never exposed to public endpoints

---

## 9. Data Model Relationships Summary

```
Organization (Tenant/Subscription)
    ├── Accounts (Users/Logins)
    ├── Companies (CRM - businesses we track)
    │   ├── Facilities (Locations)
    │   │   └── Clients (Contacts)
    │   └── Clients (Contacts not tied to facility)
    ├── Assets (Equipment for sale)
    ├── Requests (Equipment wanted)
    └── Pipelines (Active deals)

Industry (Global)
    └── Categories (Hierarchical)
        └── Manufacturers (Global)
            └── Models (Global)
                └── Assets (Org-specific instances)

Asset ←→ Request (Many-to-Many via Opportunities)
Opportunity → Pipeline (One-to-One when converted)

Client ←→ Account (Optional link when client becomes user)
Company ←→ Organization (Optional link when company becomes customer)
```

---

## 10. Future Enhancements & Considerations

### 10.1 Near-Term

1. **Pricing Visibility Rules**
   - Configuration for public vs. private pricing
   - Role-based price visibility
   - Negotiation history tracking

2. **Admin → Trader CRM**
   - Open Admin app to power users (traders)
   - Per-user permissions within organizations
   - Deal assignment and quotas
   - Communication tracking

3. **Enhanced Matching**
   - Location-based proximity matching
   - Compatible models/substitutes
   - Historical price analysis
   - Match quality scoring

4. **Notification System**
   - Opportunity alerts
   - Pipeline stage changes
   - Price change notifications
   - Deal milestones

### 10.2 Medium-Term

1. **True Multi-Tenancy**
   - Full data isolation per organization
   - White-labeling options
   - Custom domains

2. **Advanced Analytics**
   - Pipeline velocity metrics
   - Conversion rate tracking
   - Asset pricing trends
   - Market demand analysis

3. **Transaction Management**
   - Invoice generation
   - Payment processing
   - Escrow services
   - Shipping/logistics coordination

4. **Mobile Applications**
   - iOS/Android apps
   - Push notifications
   - Quick deal updates

### 10.3 Long-Term

1. **AI-Powered Features**
   - Intelligent price recommendations
   - Demand forecasting
   - Automated negotiation assistance
   - Natural language search

2. **Marketplace Extensions**
   - Auction functionality
   - Lease/rental options
   - Parts and accessories marketplace
   - Service provider directory

3. **Integration Ecosystem**
   - ERP integrations
   - Accounting software
   - Logistics providers
   - Industry-specific tools

---

## 11. Success Metrics

### 11.1 User Engagement

- Active users (daily/weekly/monthly)
- Assets listed per organization
- Requests submitted per user
- Opportunity conversion rate (Opportunity → Pipeline)
- Pipeline win rate (Pipeline → Closed)

### 11.2 Marketplace Health

- Total assets available
- Total active requests
- Average time to first match
- Match quality (acceptance vs. rejection)
- Cross-organization transaction rate

### 11.3 Business Metrics

- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Net Promoter Score (NPS)

### 11.4 Operational Metrics

- Pipeline velocity (days per stage)
- Average deal size
- Assets per seller
- Requests per buyer
- API response times
- System uptime

---

## 12. Glossary

| Term             | Definition                                                   |
| ---------------- | ------------------------------------------------------------ |
| **Account**      | User login credentials for platform access                   |
| **Asset**        | Physical equipment available for sale or trade               |
| **Category**     | Hierarchical classification of equipment types               |
| **Client**       | CRM contact (may or may not have platform access)            |
| **Company**      | Business entity in CRM (may or may not be platform customer) |
| **Facility**     | Physical location under a Company                            |
| **Industry**     | Top-level taxonomy category                                  |
| **Manufacturer** | Company that produces equipment                              |
| **Model**        | Specific equipment model from a manufacturer                 |
| **Opportunity**  | Auto-generated potential match between Asset and Request     |
| **Organization** | Paying customer (tenant) with platform subscription          |
| **Pipeline**     | Active deal in progress through sales stages                 |
| **Request**      | Equipment need submitted by buyer                            |
| **Trader**       | CRM user managing client relationships and deals             |

---

## Appendix A: Model Field Reference

### Account

- Identity: ID, URN, Email (unique)
- Profile: FirstName, LastName, Phone
- Organization: OrganizationID
- Role: Role (User, Admin, Read-Only Admin)
- Subscription: PlanID, ExternalID (Clerk)
- Testing: TestUserType

### Asset

- Identity: ID, URN
- Taxonomy: ModelID → (ManufacturerID, CategoryID, IndustryID via joins)
- Ownership: OrganizationID, CompanyID, ClientID
- Details: Description, Location, ConfigurationNotes
- Status: InstallStatus, OperationalStatus
- Commercial: Price, Quantity, Year, SerialNumber
- Verification: VerifiedAtTs
- Media: AssetFiles (many)

### Request

- Identity: ID, URN
- Taxonomy: ModelID, ManufacturerID, CategoryID (flexible specificity)
- Ownership: OrganizationID, CompanyID, ClientID, AccountID
- Details: Description, ConfigurationNotes
- Commercial: MinPrice, MaxPrice, TimeFrame
- Lifecycle: ExpireAtTS, SourceRequestID

### Opportunity

- Identity: ID, URN
- Matching: AssetID, RequestID
- Type: OpportunityType
- Pricing: CurrentAssetPrice, CurrentRequestPrice, Quantity
- Context: OrganizationID, CompanyID, ClientID, PipelineID

### Pipeline

- Identity: ID, URN, Name
- Stage: Stage (1-7)
- Buyer: BuyerOwnerAccountID, BuyerClientID
- Seller: SellerOwnerAccountID, SellerClientID
- Context: OrganizationID

### Company

- Identity: ID, URN, Name
- Location: Country, Address
- Contact: Phone, Email, Website
- Description: Description, MetaData

### Client

- Identity: ID, URN, Name
- Hierarchy: CompanyID, FacilityID, SupervisorClientID
- Profile: Title, Email, Phone, Mobile
- Status: IsDecisionMaker
- Linking: SourceAccountID (if client becomes user)

---

**End of Document**
