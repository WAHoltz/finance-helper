import { twMerge } from 'tailwind-merge';
import { Cashflow, useGetExpenses } from '../hooks/firestore';

export default function TotalExpenses({ className }: { className?: string }) {
  const { isLoading: isExpensesLoading, data: expensesData } = useGetExpenses();

  if (isExpensesLoading) return;

  function getTotalRequiredExpenses(expenses: Cashflow[]) {
    let totalAmount = 0;
    const now = Date.now();
    const currentDate = new Date(now);
    const currentMonth = currentDate.getMonth();

    expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.timestamp);
        return expenseDate.getMonth() === currentMonth && expense.required;
      })
      .map((expense) => (totalAmount += expense.amount));

    if (totalAmount === 0) return 0;
    return Number.parseFloat(totalAmount.toString()).toFixed(2);
  }

  function getTotalNonrequiredExpenses(expenses: Cashflow[]) {
    let totalAmount = 0;
    const now = Date.now();
    const currentDate = new Date(now);
    const currentMonth = currentDate.getMonth();

    expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.timestamp);
        return expenseDate.getMonth() === currentMonth && !expense.required;
      })
      .map((expense) => (totalAmount += expense.amount));

    if (totalAmount === 0) return 0;
    return Number.parseFloat(totalAmount.toString()).toFixed(2);
  }

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold tw:border-b-2 tw:border-gray-800 tw:w-full tw:text-center">
        Total Expenses this Month
      </h3>
      <div className="tw:grid tw:grid-cols-2 tw:flex-row">
        <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:col-span-1 tw:border-gray-800 tw:border-r-2">
          <h4 className="tw:font-bold tw:text-nowrap tw:text-sm">
            Required Expenses this Month
          </h4>
          <p>${getTotalRequiredExpenses(expensesData)}</p>
        </div>
        <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:col-span-1 tw:text-sm tw:text-center">
          <h4 className="tw:font-bold">Non-Required Expenses this Month</h4>
          <p>${getTotalNonrequiredExpenses(expensesData)}</p>
        </div>
      </div>
    </div>
  );
}
