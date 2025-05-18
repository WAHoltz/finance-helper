import { twMerge } from 'tailwind-merge';
import { Cashflow, useGetIncomes } from '../hooks/firestore';

export default function TotalIncomes({ className }: { className?: string }) {
  const { isLoading: isIncomesLoading, data: incomesData } = useGetIncomes();

  if (isIncomesLoading) return;

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

  return (
    <div
      className={twMerge(
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
        Total Incomes this Month
      </h3>
      <p>${getTotalIncomes(incomesData)}</p>
    </div>
  );
}
