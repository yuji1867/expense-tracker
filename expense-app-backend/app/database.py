import sqlite3
import os

os.makedirs("data", exist_ok=True)

conn = sqlite3.connect("data/expenses.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL,
    paid_by TEXT,
    date TEXT
)
""")
conn.commit()