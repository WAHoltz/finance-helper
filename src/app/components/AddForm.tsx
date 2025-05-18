import { FormEventHandler, useState } from 'react';
import { addExpense, addIncome } from '../hooks/firestore';
import { twMerge } from 'tailwind-merge';

export default function AddForm({
  userId,
  type,
  className,
}: {
  userId: string;
  type: 'expenses' | 'incomes';
  className?: string;
}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [required, setRequired] = useState(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleRequiredChange = () => {
    if (required) {
      setRequired(false);
    } else {
      setRequired(true);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name === '') {
      alert('Must choose a different name!');
      return;
    }

    if (amount === 0.0) {
      alert('Must choose a different amount!');
      return;
    }

    if (type === 'expenses') {
      addExpense(
        {
          name: name,
          amount: amount,
          required: required,
          timestamp: Date.now(),
        },
        userId
      );
    } else if (type === 'incomes') {
      addIncome(
        {
          name: name,
          amount: amount,
          required: required,
          timestamp: Date.now(),
        },
        userId
      );
    }
    setName('');
    setAmount(0.0);
    setRequired(true);
  };

  return (
    <div
      className={twMerge(
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold w-full max-sm:border-b-2 max-sm:border-gray-800 text-center">
        Add {type === 'expenses' ? 'Expense' : 'Income'}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
          <label htmlFor="expenseName" className="font-bold">
            {type === 'expenses' ? 'Expense' : 'Income'} Name
          </label>
          <input
            className="sm:ml-8 border-2 rounded-md p-1 bg-gray-400"
            type="text"
            name="expenseName"
            placeholder={type === 'expenses' ? 'Expense' : 'Income'}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="sm:mt-2 max-sm:flex max-sm:flex-col max-sm:items-center">
          <label htmlFor="expenseAmount" className="font-bold">
            {type === 'expenses' ? 'Expense' : 'Income'}
            Amount
          </label>
          <input
            className="sm:ml-4 border-2 rounded-md p-1 bg-gray-400"
            placeholder="0.00"
            type="number"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        {type === 'expenses' && (
          <div>
            <label htmlFor="Required?" className="font-bold">
              Required?
            </label>
            <input
              className="ml-4"
              name="Required?"
              type="checkbox"
              checked={required}
              onChange={handleRequiredChange}
            />
          </div>
        )}
        <button
          type="submit"
          value="Submit"
          className="border-black border-x-2 border-t-2 mt-2 bg-gray-400 px-2 cursor-pointer hover:bg-gray-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
