import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [date, setDate] = useState("");

  // GET all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // run once when page loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // POST new expense
  const addExpense = async () => {
    if (!title || !amount || !paidBy || !date) return;

    await fetch("http://127.0.0.1:8000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        amount: parseFloat(amount),
        paid_by: paidBy,
        date: date
      }),
    });

    setTitle("");
    setAmount("");
    setPaidBy("");
    setDate("");
    fetchExpenses(); // refresh list
  };

  const deleteExpense = async (id) => {
    await fetch(`http://127.0.0.1:8000/expenses/${id}`, {
      method: "DELETE",
    });

    fetchExpenses(); // refresh list after delete
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>

      <div>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Power">Power</option>
          <option value="Internet">Internet</option>
          <option value="Phone">Phone</option>
          <option value="Car Bills">Car</option>
          <option value="Transport">Transport</option>
          <option value="Insurance">Insurance</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Other">Other</option>
        </select>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Paid by"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        />

        <input
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addExpense}>Add</button>
      </div>

      <hr />

      <h3>Expenses</h3>

      <div className="expense-header">
        <div>Title</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Paid by</div>
      </div>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div className="expense-row" key={expense.id}>
            <div>{expense.title}</div>
            <div>${expense.amount}</div>
            <div>{expense.date}</div>
            <div>{expense.paid_by}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;