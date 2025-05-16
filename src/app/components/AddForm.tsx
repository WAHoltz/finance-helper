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
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold">
        Add {type === 'expenses' ? 'Expense' : 'Income'}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="tw:flex tw:flex-col tw:items-center"
      >
        <div>
          <label htmlFor="expenseName" className="tw:font-bold">
            {type === 'expenses' ? 'Expense' : 'Income'} Name
          </label>
          <input
            className="tw:ml-8 tw:border-2 tw:rounded-md tw:p-1 tw:bg-gray-400"
            type="text"
            name="expenseName"
            placeholder={type === 'expenses' ? 'Expense' : 'Income'}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="tw:mt-2">
          <label htmlFor="expenseAmount" className="tw:font-bold">
            {type === 'expenses' ? 'Expense' : 'Income'}
            Amount
          </label>
          <input
            className="tw:ml-4 tw:border-2 tw:rounded-md tw:p-1 tw:bg-gray-400"
            placeholder="0.00"
            type="number"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        {type === 'expenses' && (
          <div>
            <label htmlFor="Required?" className="tw:font-bold">
              Required?
            </label>
            <input
              className="tw:ml-4"
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
          className="tw:border-black tw:border-x-2 tw:border-t-2 tw:mt-2 tw:bg-gray-400 tw:px-2 tw:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
