import { connectToDatabase } from "@/lib/db";
import { Budget } from "@/model/model";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const db = await connectToDatabase();
    let requestBody = req.body as Budget;
    await db.collection('Budget').deleteOne({ _id: new ObjectId(requestBody._id) });
    const budgetGroup = await db.collection('BudgetGroup').findOne({ 'budgets': requestBody._id.toString() });
    if (budgetGroup != null) {
      budgetGroup.budgets = budgetGroup.budgets.filter((budget: string) => budget != requestBody._id.toString());
      const data = await db.collection('BudgetGroup').updateOne({ '_id': budgetGroup._id }, { $set: budgetGroup });
    }
    res.status(200).end();
  } else {
    res.status(400).end();
  }
}