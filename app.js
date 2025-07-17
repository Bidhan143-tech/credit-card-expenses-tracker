
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const summary = document.getElementById('summary');

  const getExpenses = () => JSON.parse(localStorage.getItem('expenses') || '[]');

  const saveExpenses = (expenses) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  };

  const addExpense = (expense) => {
    const expenses = getExpenses();
    expenses.push(expense);
    saveExpenses(expenses);
    renderExpenses();
  };

  const renderExpenses = () => {
    const expenses = getExpenses();
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach(exp => {
      const li = document.createElement('li');
      li.textContent = `${exp.date} - ₹${exp.amount} (${exp.card}, ${exp.category}) @ ${exp.merchant}`;
      expenseList.appendChild(li);
      total += parseFloat(exp.amount);
    });

    summary.textContent = `Total: ₹${total.toFixed(2)}`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const expense = {
      date: document.getElementById('date').value,
      card: document.getElementById('card').value,
      merchant: document.getElementById('merchant').value,
      amount: document.getElementById('amount').value,
      category: document.getElementById('category').value,
      notes: document.getElementById('notes').value
    };

    addExpense(expense);
    form.reset();
  });

  renderExpenses();
});
