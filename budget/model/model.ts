import { ObjectId, WithId } from "mongodb";

export interface Budget extends WithId<Document> {
    name: string,
    goal: number,
    date: Date
}

export interface BudgetGroup extends WithId<Document> {
    name: string,
    budgets: ObjectId[],
    type: string
}

export interface Transaction extends WithId<Document> {
    value: number,
    bill: boolean,
    budgetId: ObjectId,
    name: string,
    date: Date,
    isPayed: boolean,
    account: ObjectId,
    recurrency: string
}

export interface Account extends WithId<Document> {
    name: string,
    balance: number,
    type: string
}