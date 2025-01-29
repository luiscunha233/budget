

export default function BudgetSpentProgressBar(props: { budgetSpent: number, budgetGoal: number }) {
    const percentage = (props.budgetSpent / props.budgetGoal) * 100;

    return <div className="w-full my-1">
        {percentage <= 100 &&
            <div className="flex flex-row items-center gap-2">
                <div className="h-1 mt-1 w-[100%] bg-gray-600 rounded-full">
                    <div className="h-1 bg-green-500 rounded-full z-1" style={{ width: `${percentage}%` }} />
                </div>
                <div className="text-xs text-gray-400 min-w-[4ch] text-right">{parseFloat(percentage.toFixed(1))}%</div>
            </div>
        }
        {percentage > 100 &&
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row w-full h-1 mt-1">
                    <div className="h-1  bg-green-500 rounded-l-lg" style={{ width: `${100 - (percentage - 100)}%` }} />
                    <div className="h-1  bg-red-500 rounded-r-lg" style={{ width: `${percentage - 100}%` }} />
                </div>
                <div className="text-xs text-red-400 min-w-[4ch] text-right">{parseFloat(percentage.toFixed(1))}%</div>
            </div>
        }
    </div>
}