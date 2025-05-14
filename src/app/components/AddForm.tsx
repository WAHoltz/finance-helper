import { FormEventHandler, useState } from 'react';
import { addExpense } from '../hooks/firestore';

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
    setExpenseName('Expense');
    setExpenseAmount(0.0);
    setRequiredExpense(true);
  };

  return (
    <div className="tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center">
      <h3 className="tw:font-extrabold">Add Expense</h3>
      <form
        onSubmit={handleSubmit}
        className="tw:flex tw:flex-col tw:items-center"
      >
        <div>
          <label htmlFor="expenseName" className="tw:font-bold">
            Expense Name
          </label>
          <input
            className="tw:ml-8 tw:border-2 tw:rounded-md tw:p-1 tw:bg-gray-400"
            type="text"
            name="expenseName"
            value={expenseName}
            onChange={handleNameChange}
          />
        </div>
        <div className="tw:mt-2">
          <label htmlFor="expenseAmount" className="tw:font-bold">
            Expense Amount
          </label>
          <input
            className="tw:ml-4 tw:border-2 tw:rounded-md tw:p-1 tw:bg-gray-400"
            type="number"
            name="expenseAmount"
            value={expenseAmount}
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <label htmlFor="Required?" className="tw:font-bold">
            Required?
          </label>
          <input
            className="tw:ml-4"
            name="Required?"
            type="checkbox"
            checked={requiredExpense}
            onChange={handleRequiredChange}
          />
        </div>
        <button
          type="submit"
          value="Submit"
          className="tw:border-black tw:border-2 tw:bg-gray-400 tw:px-2 tw:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
