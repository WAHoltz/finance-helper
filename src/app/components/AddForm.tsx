import { FormEventHandler, useState } from 'react';
import { addExpense } from '../hooks/firestore';
import { User } from 'firebase/auth';

export default function AddForm({ userId }: { userId: string }) {
  const [expenseName, setExpenseName] = useState('Expense');
  const [expenseAmount, setExpenseAmount] = useState(0.0);
  const [requiredExpense, setRequiredExpense] = useState(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseName(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseAmount(Number(event.target.value));
  };

  const handleRequiredChange = () => {
    if (requiredExpense) {
      setRequiredExpense(false);
    } else {
      setRequiredExpense(true);
    }
    console.log(requiredExpense);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addExpense(
      {
        name: expenseName,
        amount: expenseAmount,
        required: requiredExpense,
      },
      userId
    );
  };

  return (
    <div className="tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit} className="tw:grid-cols-3 tw:gap-1">
        <label htmlFor="expenseName">Expense Name</label>
        <input
          type="text"
          name="expenseName"
          value={expenseName}
          onChange={handleNameChange}
        />
        <label htmlFor="expenseAmount">Expense Amount</label>
        <input
          type="number"
          name="expenseAmount"
          value={expenseAmount}
          onChange={handleAmountChange}
        />
        <label htmlFor="Required?">Required?</label>
        <input
          name="Required?"
          type="checkbox"
          checked={requiredExpense}
          onChange={handleRequiredChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
