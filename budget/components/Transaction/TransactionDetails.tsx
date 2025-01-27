import { getAccountById } from "@/lib/db/Accounts";
import { Transaction } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EllipsisVertical } from "lucide-react";


export default async function TransactionDetails(props: { transaction: Transaction }) {
    const account = await getAccountById(props.transaction.accountid);
    return <div className="flex flex-row my-2 items-center min-w-[400px] place-content-between">
        <div className="flex flex-row my-2 items-center">
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="ml-4">
                <div className="font-bold text-lg">{props.transaction.name}</div>
                <div className="font-bold text-xs text-gray-400">{account?.name}</div>
            </div>
        </div>
        <div className="flex flex-row items-center">
            <div className="flex flex-col items-end">
                <div >{parseFloat(props.transaction.value.toFixed(2))}€</div>
                <div className="text-xs text-gray-400">{props.transaction.dueDate.toLocaleDateString()}</div>
            </div>
            <EllipsisVertical className="ml-1" />
        </div>

    </div>
}