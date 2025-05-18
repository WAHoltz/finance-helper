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
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
        Total Expenses this Month
      </h3>
      <div className="grid grid-cols-2 flex-row">
        <div className="flex flex-col items-center justify-center col-span-1 border-gray-800 border-r-2 text-center">
          <h4 className="font-bold overflow-wrap text-sm">
            Required Expenses this Month
          </h4>
          <p>${getTotalRequiredExpenses(expensesData)}</p>
        </div>
        <div className="flex flex-col items-center justify-center col-span-1 text-sm text-center">
          <h4 className="font-bold">Non-Required Expenses this Month</h4>
          <p>${getTotalNonrequiredExpenses(expensesData)}</p>
        </div>
      </div>
    </div>
  );
}
