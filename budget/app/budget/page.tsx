import { test } from "@/server-functions/Accounts"
import { Transaction } from "@prisma/client";

export default async function BudgetPage() {
    let results = await test();
    return <div>{results.map((data:any) => <p>{JSON.stringify(data)}</p>)}</div>;
}