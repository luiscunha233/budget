import { ObjectId, WithId } from "mongodb";

export interface Budget extends WithId<Document> {
    ObjectId:ObjectId,
    category:string,
    name:string,
    type:string,
    goal:number,
    startDate:Date,
    endDate:Date,
} 

export interface Transcation{
    value:number,
    budgetId:ObjectId,
    name:string,
    date:Date,
    isPayed:boolean,
    account:Account
}

export interface Account{
    name:string,
    balance:number,
    type:string
}