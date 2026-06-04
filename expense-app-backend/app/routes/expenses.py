from fastapi import APIRouter, HTTPException
from app.database import cursor, conn
from app.schemas import Expense, ExpenseResponse

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Hello World"}

@router.get("/expenses", response_model=list[ExpenseResponse])
def get_expenses():
    cursor.execute("SELECT * FROM expenses")
    rows = cursor.fetchall()

    expenses = [
        {"id": row[0], "title": row[1], "amount": row[2], "paid_by": row[3], "date": row[4]}
        for row in rows
    ]

    return expenses

@router.get("/expenses/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int):
    cursor.execute(
        "SELECT * FROM expenses WHERE id = ?",
        (expense_id,)
    )
    row = cursor.fetchone()

    if row:
        return {"id": row[0], "title": row[1], "amount": row[2], "paid_by": row[3], "date": row[4]}

    raise HTTPException(status_code=404, detail="Expense not found")

@router.post("/expenses", response_model=ExpenseResponse)
def create_expense(expense: Expense):
    cursor.execute(
        "INSERT INTO expenses (title, amount, paid_by, date) VALUES (?, ?, ?, ?)",
        (expense.title, expense.amount, expense.paid_by, expense.date)
    )
    conn.commit()

    expense_id = cursor.lastrowid

    return {
        "id": expense_id,
        "title": expense.title,
        "amount": expense.amount,
        "paid_by": expense.paid_by,
        "date": expense.date
    }

@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    cursor.execute("SELECT * FROM expenses WHERE id = ?", (expense_id,))
    row = cursor.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Expense not found")

    cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
    conn.commit()

    return {"message": "Expense deleted"}

@router.put("/expenses/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: int, expense: Expense):
    cursor.execute("SELECT * FROM expenses WHERE id = ?", (expense_id,))
    row = cursor.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    cursor.execute(
        "UPDATE expenses SET title = ?, amount = ?, paid_by = ?, date = ?, WHERE id = ?",
        (expense.title, expense.amount, expense.paid_by, expense.date, expense_id)
    )

    conn.commit

    return {
        "id": expense_id,
        "title": expense.title,
        "amount": expense.amount,
        "paid_by": expense.paid_by,
        "date": expense.date
    }