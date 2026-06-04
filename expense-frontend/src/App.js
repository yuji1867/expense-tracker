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
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.title} — ${e.amount} paid by {e.paid_by} on {e.date}
            <button
              onClick={() => deleteExpense(e.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;