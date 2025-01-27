import { Budget, Transaction } from "@prisma/client";
import BudgetActions from "./BudgetActions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TransactionDetails from "@/components/Transaction/TransactionDetails";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BudgetTransactions(props: { budget: Budget, transactions: Transaction[] }) {

props.transactions.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());


    return <Card className="flex flex-col w-fit ml-2 my-1">
        <CardTitle className="flex flex-row items-center gap-2 m-6 place-content-between">
            <div className="font-bold text-2xl">Transactions</div>
            <BudgetActions budget={props.budget} />
        </CardTitle>
        <CardContent className="flex flex-col gap-2">
            <ScrollArea className="h-72 pr-4">
            {props.transactions.map((transaction) => (<TransactionDetails key={transaction.id} transaction={transaction} />))}
            </ScrollArea>
        </CardContent>
    </Card>
}