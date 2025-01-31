import { Card, CardContent } from "@/components/ui/card";
import { Account, Transaction } from "@prisma/client";
import { TransactionLineChart } from "@/components/Transaction/TransactionLineChart";

export default async function AccountDisplay(props: {
    account: Account
}) {
    const accountBalance = props.account.currentBalance ?? 0;

    return (
        <div className="w-[150px]">
            <Card>
                <CardContent className="flex flex-row gap-4 mt-5 place-content-between items-center">

                    <div className="font-bold text-sm">{props.account.name}</div>
                    <div className={`font-bold text-sm ${accountBalance < 0 ? "text-red-500" : ""}`}>{accountBalance}€</div>
                    <div className="min-w-[200px]">

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}