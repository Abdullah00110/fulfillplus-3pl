# FulfillPlus — 3PL Orders (Mini Project)

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-REST-092E20?logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A modern redesign of the FulfillPlus "Create Order" screen with **full CRUD**
(Create, Read, Update, Delete), built to mirror the company's real stack.

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Backend      | Python · Django · Django REST Framework |
| Database     | PostgreSQL                          |
| Frontend     | React (Vite) · Tailwind CSS         |
| Extras       | Light/Dark theme toggle, status badges, live stats |

The frontend (React, port **5173**) talks to the backend (Django, port **8000**)
over a REST API — the same frontend/backend separation used in the production stack.

```
React (Vite) :5173  ──REST/JSON──►  Django + DRF :8000  ──►  PostgreSQL
```

---

## Prerequisites (Windows)

1. **Python 3.10+** — you already have this. Check:
   ```
   python --version
   ```
2. **Node.js 18+** — needed for React. Download from https://nodejs.org (LTS).
   Check:
   ```
   node --version
   npm --version
   ```
3. **PostgreSQL 14+** — download the Windows installer:
   https://www.postgresql.org/download/windows/
   During install:
   - Remember the **password** you set for the `postgres` user.
   - Keep the default port **5432**.
   - The installer also gives you **pgAdmin** (a GUI) and **SQL Shell (psql)**.

---

## Step 1 — Create the database

Open **SQL Shell (psql)** from the Start menu. Press Enter for Server/Database/
Port/Username defaults, then type the password you set during install.

At the `postgres=#` prompt, run:

```sql
CREATE DATABASE fulfillplus;
```

You should see `CREATE DATABASE`. Type `\q` to quit.

*(Prefer a GUI? Open pgAdmin → right-click Databases → Create → Database →
name it `fulfillplus`.)*

---

## Step 2 — Backend setup (Django)

Open **Command Prompt** (or PowerShell) inside the project folder:

```bat
cd fulfillplus\backend

:: 1. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate

:: 2. Install dependencies
pip install -r requirements.txt

:: 3. Create your .env file from the example
copy .env.example .env
```

Now open the new **`.env`** file in a text editor and set your PostgreSQL
password (the one from Step 1):

```
DB_NAME=fulfillplus
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=5432
```

Then run the migrations and start the server:

```bat
:: 4. Create the database tables
python manage.py migrate

:: 5. (optional) create an admin login to use /admin/
python manage.py createsuperuser

:: 6. Start the backend
python manage.py runserver
```

Backend is now running at **http://127.0.0.1:8000**

Quick check — open **http://127.0.0.1:8000/api/orders/** in your browser.
You'll see DRF's browsable API page (an empty list at first). 

> Keep this terminal open and running.

---

## Step 3 — Frontend setup (React)

Open a **second** Command Prompt window (leave the backend running):

```bat
cd fulfillplus\frontend

:: 1. Install dependencies
npm install

:: 2. Start the React dev server
npm run dev
```

Now open the URL it prints — **http://localhost:5173**

You should see the modern FulfillPlus order page. Create an order, edit it,
delete it — every action talks to Django and saves to PostgreSQL.

---

## How the CRUD maps to the API

| UI action            | Method | Endpoint              |
|----------------------|--------|-----------------------|
| Load list            | GET    | `/api/orders/`        |
| Create order         | POST   | `/api/orders/`        |
| Update (edit) order  | PUT    | `/api/orders/{id}/`   |
| Delete order         | DELETE | `/api/orders/{id}/`   |

All of this is generated automatically by DRF's `ModelViewSet`
(see `backend/orders/views.py`).

---

## Project structure

```
fulfillplus/
├── backend/                  Django + DRF API
│   ├── config/
│   │   ├── settings.py       DB, CORS, DRF config
│   │   └── urls.py
│   ├── orders/
│   │   ├── models.py         Order model
│   │   ├── serializers.py    JSON <-> model
│   │   ├── views.py          OrderViewSet (all CRUD)
│   │   ├── urls.py           API router
│   │   └── admin.py
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                 React + Vite + Tailwind
    ├── src/
    │   ├── api.js            fetch calls to the API
    │   ├── App.jsx           state + wiring
    │   └── components/
    │       ├── OrderForm.jsx   create / edit form
    │       └── OrderTable.jsx  list + actions
    ├── index.html
    └── package.json
```

---

## Common issues

- **"Could not reach the API" banner in React** → the Django server isn't
  running, or it's not on port 8000. Start it in the backend folder.
- **`password authentication failed`** when running migrate → the password in
  `.env` doesn't match your PostgreSQL password. Fix it in `.env`.
- **`psycopg2` install error** → `requirements.txt` already uses
  `psycopg2-binary` which ships prebuilt; re-run `pip install -r requirements.txt`.
- **CORS error in browser console** → make sure React is on `localhost:5173`
  (the allowed origin in `settings.py`).
