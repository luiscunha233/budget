import { Budget, Transaction } from "@prisma/client";
import BudgetActions from "./BudgetActions";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TransactionDetails from "@/components/Transaction/TransactionDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddTransactionPopover from "@/components/Transaction/AddTransactionPopover";

export default function BudgetTransactions(props: { budget: Budget, transactions: Transaction[] }) {

    props.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());


    return <Card className="flex flex-col w-fit ml-2 my-1">
        <CardTitle className="flex flex-row items-center gap-[150px] m-6 place-content-between">
            <div className="font-bold text-2xl">Transactions</div>
            {props.transactions.length > 0 && <AddTransactionPopover budget={props.budget} />}

        </CardTitle>
        <CardContent className="flex flex-col gap-2">
            {props.transactions.length === 0 &&
                <div>
                    <div className="flex justify-center w-full"><AddTransactionPopover budget={props.budget} noTransactions={true} /></div>
                </div>}
            {props.transactions.length > 0 && <ScrollArea className="h-72 pr-4">
                {props.transactions.map((transaction) => (<TransactionDetails key={transaction.id} transaction={transaction} />))}
            </ScrollArea>}
        </CardContent>
    </Card>
}