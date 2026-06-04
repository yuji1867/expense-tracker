# Expense Tracker

This full-stack web application is used to track expenses with dollar amounts and dates.
Built using React, SQLite and FastAPI.

## Features

- View a list of expenses
- Create new expenses
- Delete expenses
- Update expenses
- SQLite storage

## Technologies Used

### Backend
- Python
- SQLite
- FastAPI

### Frontend
- React
- Javascript

## API Endpoints

### Get all expenses

```http
GET /expenses
```

### Get one expense

```http
GET /expenses/{expense_id}
```

### Create expense

```http
POST /expenses
```

### Update expense

```http
PUT /expenses/{expense_id}
```

### Delete expense

```http
DELETE /expenses/{expense_id}
```

---

## Running the Backend

In backend folder:

```bash
cd expense-backend
```

Activate virtual environment:

```bash
venv\Scripts\activate
```

Start FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

Navigate to frontend folder:

```bash
cd expense-frontend
```

Start React development server:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## What I Learned

- Building REST APIs using FastAPI
- CRUD operations with SQL databases
- Connecting a React frontend to a Python backend
- Using SQLite for data storage
- Structuring a full-stack application
