import { twMerge } from 'tailwind-merge';
import { Cashflow, useGetExpenses, useGetIncomes } from '../hooks/firestore';

export default function TotalCashflow({ className }: { className?: string }) {
  const { isLoading: isIncomesLoading, data: incomesData } = useGetIncomes();
  const { isLoading: isExpensesLoading, data: expensesData } = useGetExpenses();

  if (isIncomesLoading || isExpensesLoading) return;

  function getTotalIncomes(incomes: Cashflow[]) {
    let totalAmount = 0;
    const now = Date.now();
    const currentDate = new Date(now);
    const currentMonth = currentDate.getMonth();

    incomes
      .filter((income) => {
        const incomeDate = new Date(income.timestamp);
        return incomeDate.getMonth() === currentMonth;
      })
      .map((income) => (totalAmount += income.amount));

    if (totalAmount === 0) return 0;
    return Number.parseFloat(totalAmount.toString()).toFixed(2);
  }

  function getTotalExpenses(expenses: Cashflow[]) {
    let totalAmount = 0;
    const now = Date.now();
    const currentDate = new Date(now);
    const currentMonth = currentDate.getMonth();

    expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.timestamp);
        return expenseDate.getMonth() === currentMonth;
      })
      .map((expense) => (totalAmount += expense.amount));

    if (totalAmount === 0) return 0;
    return Number.parseFloat(totalAmount.toString()).toFixed(2);
  }

  function getTotalCashflow(incomes: Cashflow[], expenses: Cashflow[]) {
    return Number.parseFloat(
      (
        Number(getTotalIncomes(incomes)) - Number(getTotalExpenses(expenses))
      ).toString()
    ).toFixed(2);
  }

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold tw:border-b-2 tw:border-gray-800 tw:w-full tw:text-center">
        Total Cashflow this Month
      </h3>
      <p>${getTotalCashflow(incomesData, expensesData)}</p>
    </div>
  );
}
