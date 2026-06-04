from pydantic import BaseModel

class Expense(BaseModel):
    title: str
    amount: float
    paid_by: str
    date: str

class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    paid_by: str
    date: str