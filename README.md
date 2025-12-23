# GET TOWED — Full-Stack Towing Management System 🚗🛻💨  
A production-style **Towing Management System** built end-to-end with **React (JavaScript)**, **Flask (Python)**, and a **Structured Query Language (SQL)** database—designed to support real towing workflows with role-based portals, operational dashboards, and lifecycle tracking.

🔗 **Live Demo:** https://aftab-x5sw.vercel.app/home

---

## Table of Contents
- [What This Project Solves](#what-this-project-solves)
- [Key Highlights](#key-highlights)
- [User Roles & Portals](#user-roles--portals)
- [Product Walkthrough (11 Screenshots)](#product-walkthrough-11-screenshots)
- [System Design Diagrams](#system-design-diagrams)
- [Feature Breakdown](#feature-breakdown)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Database, Migrations, and Seeding](#database-migrations-and-seeding)
- [Running the App Locally](#running-the-app-locally)
- [API + Frontend Integration Notes](#api--frontend-integration-notes)
- [Testing & Verification](#testing--verification)
- [Security & Data Integrity Notes](#security--data-integrity-notes)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)
- [License](#license)

---

## What This Project Solves
When a vehicle is towed, vehicle owners often waste time figuring out:
- **Where** the vehicle was towed  
- **Why** the vehicle was towed  
- **How much** is owed  
- **Which towing company** to contact  
- **How to pay** and confirm payment status  
- **How to dispute** an incorrect tow  

Meanwhile, towing companies need a reliable operations tool to:
- Log towing events quickly and consistently  
- Reduce manual lookups and phone calls  
- Track payments, receipts, and disputes  
- Maintain a centralized admin view of drivers, vehicles, and towing companies  

✅ **GET TOWED** solves this with a role-based platform:
- **Vehicle Owner Portal (Public)**
- **Towing Company Driver Portal**
- **Admin Operations Panel**

---

## Key Highlights
- **True full-stack delivery:** React frontend + Flask backend + SQL database  
- **Role-based user flows:** public users (vehicle owners) + drivers + admin operations  
- **Operational maturity:** Admin panel for CRUD across users, vehicles, towing companies, payments, receipts, disputes, and retrieval status  
- **Database-driven workflows:** persisted records, consistent status transitions (Paid / Pending / Failed), and lifecycle tracking  
- **Deployment-ready:** live demo accessible for walkthrough and evaluation  
- **Engineering structure:** backend modules, migrations, seed script, and organized frontend components  

---

## User Roles & Portals

### 1) Vehicle Owner (Public User)
**Goal:** Find tow details instantly and complete fine payment.
- Search by **license plate**
- View tow details: **reason, location, date, fine amount**
- View towing company email for direct contact
- Pay fine (demo payment flow) and persist payment status
- File a dispute query (plead query) that appears in the admin dashboard

### 2) Towing Company Driver (Company Portal)
**Goal:** Log towing events into the system so owners can find their vehicles.
- Sign up / log in (towing companies only)
- Add a new tow record:
  - Vehicle ID, plate number, tow reason, location, tow date, fine amount, towing company name and email
- Confirm record is inserted by viewing the updated vehicle list

### 3) Admin (Operations Panel)
**Goal:** Manage the platform like a real internal operations tool.
- Manage users/drivers
- Manage vehicles (edit/delete)
- Manage towing companies (create/edit/delete)
- Track payments (Paid / Pending / Failed)
- Track receipts
- Review dispute queries
- Track vehicle retrieval records

## 📸 Product Walkthrough (Screenshots)

> **How to use this section:**  
> 1) Create a folder: `docs/screenshots/`  
> 2) Upload your images there using the **same filenames** below  
> 3) This README will automatically render them in the correct order

---

### ✅ Screenshot 01 — Vehicle Owner Portal: Plate Lookup + Tow Details
**File:** `docs/screenshots/towed-1.png`  
Shows the **public owner flow** where a vehicle owner searches by plate and immediately sees the **tow record** (reason, location, date, fine, towing company + email). This demonstrates **read-path correctness** from the SQL database to the React user interface.

<img width="1594" height="872" alt="towed-1" src="https://github.com/user-attachments/assets/8419692e-41a5-4705-95db-5e691d3f4d52" />

---

### ✅ Screenshot 02 — Vehicle Owner Portal: Tow Details + Payment Section
**File:** `docs/screenshots/towed-2.png`  
Shows the **payment section** enabled after a successful plate search. This highlights the **end-to-end workflow** (lookup → render → pay) and validates that payment actions are modeled as **database-backed operations**.

<img width="1499" height="836" alt="towed-2" src="https://github.com/user-attachments/assets/81ed83e4-b501-4f8f-b94f-b74b617a4d62" />

---

### ✅ Screenshot 03 — Vehicle Owner Portal: File a Dispute (Query Submission)
**File:** `docs/screenshots/Towed- 3.png`  
Shows the **dispute/query filing interface** where owners can submit a structured complaint for a tow record. This proves the system supports an **operations queue** style workflow that persists queries into SQL for later review.

<img width="1994" height="791" alt="Towed- 3" src="https://github.com/user-attachments/assets/6ada1fa7-ec06-4af7-83c0-4561cbdcc968" />

---

### ✅ Screenshot 04 — Towing Company Access: Sign Up (Authenticated Portal)
**File:** `docs/screenshots/Towed- 4.png`  
Shows towing-company-only account creation. This demonstrates the system separates **public users** from **operational towing users**, a realistic access-control boundary for internal tooling.

<img width="1602" height="806" alt="Towed- 4" src="https://github.com/user-attachments/assets/8cf45470-054e-4eda-89d0-7783ee040460" />


---

### ✅ Screenshot 05 — Towing Company Access: Log In (Restricted Operations)
**File:** `docs/screenshots/towed-5.png`  
Shows the login gate required before inserting or viewing towing records. This highlights controlled access to write paths (create tow records) and prevents unauthorized updates to operational data.

<img width="3444" height="800" alt="towed-5" src="https://github.com/user-attachments/assets/818cb31a-49ad-4656-823d-14c20e42d84e" />


---

### ✅ Screenshot 06 — Towing Company Portal: Insert Tow Record (Create Operation)
**File:** `docs/screenshots/towed-6.png`  
Shows the structured input form used to create a tow record (Vehicle ID, plate number, reason, location, date, fine, towing company + email). This demonstrates a **full create workflow** (React form → Flask route → SQL persistence).

<img width="1661" height="835" alt="towed-6" src="https://github.com/user-attachments/assets/92b15daa-2a0c-40a8-a860-7f4c1e7c83a5" />

<img width="1657" height="813" alt="towed-7" src="https://github.com/user-attachments/assets/bb5f3c50-4a0f-4e21-8d22-0ec45228cc6e" />

---

### ✅ Screenshot 07 — Towing Company Portal: SQL-Backed Table View (Read Operation)
**File:** `docs/screenshots/towed-7.png`  
Shows the towing-company view where inserted vehicles appear as a table. This confirms the create action is persisted correctly and immediately visible, validating **write + read consistency** across the stack.


<img width="1657" height="813" alt="towed-7" src="https://github.com/user-attachments/assets/e274d46b-da3e-49b7-8ccc-e90133f417a5" /> 

---

### ✅ Screenshot 08 — Admin Panel: User Management (List View)
**File:** `docs/screenshots/towed-8.png`  
Shows the admin dashboard listing users. This demonstrates the system has a **centralized operations panel** for governance and system control, supporting real-world workflows like audits, user lifecycle management, and administrative oversight.

<img width="1658" height="807" alt="towed-8" src="https://github.com/user-attachments/assets/2a0d3c17-2bbc-4b17-9be9-0bd16d19734f" />

---

### ✅ Screenshot 09 — Admin Panel: Create User (Admin Mutation Workflow)
**File:** `docs/screenshots/towed-9.png`  
Shows the admin create user form, proving the platform supports controlled admin-only system mutations and operational onboarding flows through a structured interface.

<img width="1665" height="824" alt="towed-9" src="https://github.com/user-attachments/assets/bfeb1797-c649-42b1-ba35-3c7bfbff065d" />

---

### ✅ Screenshot 10 — Admin Panel: Payments Dashboard (Status Tracking)
**File:** `docs/screenshots/towed-10.png`  
Shows payment records with explicit operational states (**Paid / Pending / Failed**). This demonstrates a realistic payment lifecycle modeling approach where each transaction is stored and trackable for operations and auditing.


<img width="1668" height="793" alt="towed-10" src="https://github.com/user-attachments/assets/025c3b38-0905-46bf-bcef-0aa314e4cd77" />

---

### ✅ Screenshot 11 — Admin Panel: Payments Dashboard (Operational Visibility)
**File:** `docs/screenshots/towed-11.png`  
A second view of payment admin operations (alternate view/scroll). This reinforces the platform’s **status-driven operations model** and shows that transaction records are visible and manageable within the admin interface.


<img width="1668" height="793" alt="towed-11" src="https://github.com/user-attachments/assets/6523d4f3-1d35-4fab-bd84-5cf8a35b80d6" />

---


# 🧠 System Design Diagrams
> Export PlantUML diagrams to `docs/diagrams/` as **SVG** for crisp rendering in GitHub.

## 1) System Architecture (Full-Stack)
<img width="1458" height="945" alt="System Architecture D" src="https://github.com/user-attachments/assets/57014a75-0a5e-408e-a076-628a9705d50c" />
 

## 2) Database / Data Model (ER Diagram)
<img width="1193" height="1291" alt="Data Model - ERD-  Database Design" src="https://github.com/user-attachments/assets/0b99311c-e5be-4159-b921-6dc50e5b9fa5" />
 

## 3) Sequence: Vehicle Owner Search + Payment
<img width="1101" height="1061" alt="Vehicle Owner Search and  Fine Payment" src="https://github.com/user-attachments/assets/b413d787-672d-45b3-9906-70900c0dd95b" />


## 4) Sequence: Driver Adds Tow Record → Admin Sees It
<img width="1205" height="888" alt="Driver Adds Tow Record → Admin Sees It" src="https://github.com/user-attachments/assets/c05fc668-1951-4985-a1ba-d7b9465a4934" />
 

## 5) Workflow: Dispute Query → Admin Triage → Retrieval State
 
<img width="808" height="1511" alt="Dispute Query" src="https://github.com/user-attachments/assets/cc196e1d-3e75-4257-a46e-d78371f5aab1" />

---

# ✅ Feature Breakdown

## Public Portal (Vehicle Owners)
- License plate lookup
- Tow detail rendering (reason, location, date, fine amount)
- Towing company email visibility
- Payment submission (demo) with persisted payment status
- Dispute/query submission persisted to SQL database

## Company Portal (Drivers)
- Sign up and login flows
- Tow record insertion form
- Vehicle list to confirm successful inserts

## Admin Operations Panel
Admin views (matching the navigation bar):
- `user_admin_view`
- `vehicle_admin_view`
- `towing_company_admin_view`
- `payment_admin_view`
- `plead_query_admin_view`
- `vehicle_retrieval_admin_view`
- `receipt_admin_view`

---

# 🧱 Tech Stack
### Frontend
- React (JavaScript)
- Modular component design
- Page styling (Cascading Style Sheets (CSS))
- Forms and workflows: Search, Query, Auth, Payment

### Backend
- Python Flask (web framework)
- Modular backend separation:
  - `app.py` (application bootstrap)
  - `views.py` (routes / endpoints)
  - `auth.py` (authentication and role checks)
  - `models.py` (database models)
  - `seed.py` (data seeding)
- Environment configuration via `.env`

### Database
- SQL database (SQLite in `server/instance/app.db`)
- Migrations via Alembic (`server/migrations/`)

---

# 🗂️ Repository Structure

```text
.
├── README.md
├── client/
│   └── client/
│       ├── package.json
│       ├── public/
│       └── src/
│           ├── App.js
│           ├── index.js
│           └── assets/
│               ├── Home.js
│               ├── Navbar.js
│               ├── Search.js
│               ├── Query.js
│               ├── Payment.js
│               ├── PaymentPage.js
│               ├── CheckoutForm.js
│               ├── LogIn.js
│               ├── SignUp.js
│               └── TowingCompany.js
└── server/
    ├── .env
    ├── app.py
    ├── views.py
    ├── auth.py
    ├── models.py
    ├── seed.py
    ├── instance/
    │   └── app.db
    └── migrations/
        ├── alembic.ini
        ├── env.py
        └── versions/
```

---

# 🚀 Local Setup

This repository is structured as a clean, full-stack application with separate frontend and backend directories and a database-backed persistence layer.

## Project Layout (Runtime View)

- **Frontend (React / JavaScript):** `client/client/`
- **Backend (Flask / Python):** `server/`
- **Database (SQL - SQLite):** `server/instance/app.db`
- **Migrations (Alembic):** `server/migrations/`
- **Seed Script (Demo Data):** `server/seed.py`

> ✅ Tip: The fastest path to a working demo is:  
> **Backend → migrate → seed → run** and then **Frontend → run**.

---

## ✅ Prerequisites

Install the following before running locally:

- **Node.js** (recommended **18+**) for the React build/runtime
- **Python** (recommended **3.9+**) for the Flask backend
- **Pipenv** (recommended) because this repo includes `Pipfile` and `Pipfile.lock`
- **SQLite** (no server needed; runs from the `.db` file)

### Confirm Installs

```bash
node -v
npm -v
python --version
pipenv --version
```

---

## 🔐 Environment Variables

The backend reads configuration from:

`server/.env`

Create or update the `.env` file inside the `server/` directory using the template below:

```env
# ---------------------------
# Flask runtime configuration
# ---------------------------
FLASK_ENV=development
FLASK_DEBUG=1

# ---------------------------
# Database configuration
# ---------------------------
# SQLite (default for local development)
DATABASE_URL=sqlite:///instance/app.db

# Optional Postgres (if migrating to production-grade DB)
# DATABASE_URL=postgresql://username:password@localhost:5432/gettowed

# ---------------------------
# Security / sessions
# ---------------------------
SECRET_KEY=change_this_to_a_long_random_string

# ---------------------------
# Frontend base URL (optional)
# ---------------------------
FRONTEND_URL=http://localhost:3000
```

### Notes

- If the backend already defaults to SQLite internally, keep the `DATABASE_URL` aligned with the implementation for consistency.
- `SECRET_KEY` is important for secure session signing and predictable runtime behavior.
- If you add Cross-Origin Resource Sharing (CORS) support locally, `FRONTEND_URL` helps document expected client origin.


### Notes

- If the backend already defaults to SQLite internally, keep the `DATABASE_URL` aligned with the implementation for consistency.
- `SECRET_KEY` is important for secure session signing and predictable runtime behavior.
- If you add Cross-Origin Resource Sharing (CORS) support locally, `FRONTEND_URL` helps document expected client origin.

---

## 🗄️ Database, Migrations, and Seeding

This repository includes a complete database lifecycle setup:

### Included Database Tooling

- ✅ Alembic migrations: `server/migrations/`
- ✅ Seed script: `server/seed.py`
- ✅ SQLite database file: `server/instance/app.db`

### Recommended Local Workflow

1) Apply migrations to ensure schema matches the models  
2) Seed the database to load demo towing companies, vehicles, payments, users, and queries

```bash
cd server
flask db upgrade
python seed.py
```

### Resetting the Database (If Seed Inserts Duplicates)

If `seed.py` inserts rows without checking for existing records, re-running seeding may create duplicates. The clean approach is to remove the database and rebuild it.

#### macOS / Linux

```bash
cd server

# WARNING: This wipes local data
rm -f instance/app.db

flask db upgrade
python seed.py
```

#### Windows (PowerShell)

```powershell
cd server

# WARNING: This wipes local data
Remove-Item -Force instance\app.db

flask db upgrade
python seed.py
```

✅ After this, local data will match the seed script exactly.

---

## ▶️ Running the App Locally

### 1) Start Backend (Flask)

#### Option A — Pipenv (Recommended)

This aligns with the repo’s dependency management.

```bash
cd server
pipenv install
pipenv shell
python app.py
```

#### Option B — Python Virtual Environment (Alternative)

Use this if you prefer `venv` over Pipenv.

```bash
cd server
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows:
# .venv\Scripts\activate

pip install flask flask_sqlalchemy flask_migrate python-dotenv
python app.py
```

Backend typically runs at:

- `http://127.0.0.1:5000`

---

### 2) Start Frontend (React)

```bash
cd client/client
npm install
npm start
```

Frontend typically runs at:

- `http://localhost:3000`

---

## 🔄 API + Frontend Integration Notes

This project follows a standard full-stack request lifecycle:

### Request Lifecycle

1) React UI collects user input (plate search, query submission, payment submission, vehicle insertion)  
2) UI sends request to Flask routes (primarily through `views.py`)  
3) Authentication / access control logic is handled via `auth.py` (where applicable)  
4) Flask reads/writes using SQL-backed models in `models.py`  
5) UI receives structured responses and renders tables/forms accordingly  

### What SQL Persistence Enables

- Driver-added vehicles become immediately searchable by license plate in the public portal
- Owner payments appear in the admin payment dashboard with status visibility
- Dispute queries (plead queries) populate the admin dispute queue for review and resolution workflows

### CORS (Local Development)

If you run frontend + backend separately and hit cross-origin issues:

- Allow origin: `http://localhost:3000`
- Ensure the frontend points to the correct backend base URL

Typical solutions include:

- Adding CORS middleware to Flask
- Using environment-based API base URL in the frontend

---

## ✅ Testing & Verification (End-to-End Validation)

Even without a formal automated test suite, the system can be validated using repeatable scenario checks.

### A) Public Owner Flow (Search → Pay → Confirm)

1) Open the public portal  
2) Search a license plate known to exist (from seeded data)  
3) Confirm the tow details render:
   - plate number, reason, location, date, fine amount, towing company, email  
4) Submit payment (demo)  
5) Confirm payment appears in admin payment dashboard with correct status  

✅ Expected outcome: Owner can locate the vehicle record and complete a payment flow that persists status.

---

### B) Driver Flow (Login → Insert Vehicle → Verify)

1) Sign up / log in through towing-company-only portal  
2) Add a new towed vehicle record:
   - vehicle ID, plate number, towing reason, location, tow date, fine, company, company email  
3) Confirm the entry appears in driver vehicle list/table  
4) Search the same plate number in the public portal and verify it appears  

✅ Expected outcome: Driver insertion updates SQL and becomes visible cross-portal.

---

### C) Admin Operations Flow (Manage System State)

1) Open admin panel  
2) Verify the ability to:
   - create users/drivers
   - view/edit/delete vehicles
   - manage towing companies (create/edit/delete)
   - view payment records (Paid/Pending/Failed)
   - view receipts
   - view dispute queries (plead query admin queue)
   - view vehicle retrieval records  

✅ Expected outcome: Admin can operate the system as a centralized back-office tool.

---

## 🛡️ Security & Data Integrity Notes

This system is designed to reflect realistic operational safeguards:

### Access Control

- Driver portal is gated behind login
- Admin operations are centralized in one dashboard-style panel

### Payment State Modeling

Payments are modeled with explicit status transitions for operational clarity:

- `PENDING → PAID` (successful completion)
- `PENDING → FAILED` (failure path)

### Dispute Workflow Persistence

Disputes are modeled as an operations queue, enabling structured triage:

- `OPEN → IN_PROGRESS → CLOSED` (recommended lifecycle)

### Database-Backed Trust

Critical workflows are always persisted in Structured Query Language (SQL):

- Vehicle creation/insertion
- Payment creation and status tracking
- Dispute/query creation

✅ This ensures traceability and consistent cross-portal visibility.

---

## 🔭 Future Enhancements

Planned improvements to take the platform closer to production-grade readiness:

### Payments

- Integrate a real payment processor (Stripe) with server-side verification
- Generate verified receipts and confirmation messages
- Protect against duplicate payment submissions

### Authorization & Control

- Enforce full Role-Based Access Control (RBAC) across all sensitive routes
- Harden admin-only endpoints and validate all writes server-side

### Auditing & Observability

- Add audit logs for admin edits (who/what/when)
- Add error reporting and structured logs for troubleshooting

### Workflow Expansion

- Email notifications for:
  - disputes filed
  - disputes resolved
  - payment success/failure
- Vehicle retrieval workflow improvements:
  - retrieval verification steps
  - checklists and status history

### Search & User Experience (UX)

- Partial license plate search
- Pagination for vehicle tables
- Rate limiting to protect lookup endpoints
- Map improvements: pinned tow lot location + directions

### Data Validation

- Stronger backend validation for vehicle fields, payment fields, and dispute fields
- Consistent error responses for frontend rendering

---

## 👤 Credits

### Project Owner & Developer

Built end-to-end: React frontend, Flask backend, SQL schema modeling, migrations, seed logic, and operations dashboard workflows

---

## 📄 License

This project is released for educational and portfolio use.  
If publishing as an open-source project, add a formal license file (MIT License is commonly used for repositories like this).


