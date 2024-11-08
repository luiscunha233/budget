import { connectToDatabase } from '@/lib/db';
import { BudgetGroup } from '@/model/model';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

export interface addBudget {
  budget: string,
  budgetGroup: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const db = await connectToDatabase();
    const reqData = req.body as addBudget;
    const budgetGroup = await db.collection('BudgetGroup').findOne({ '_id': new ObjectId(reqData.budgetGroup as string) });

    if (budgetGroup != null) {

      if (budgetGroup.budgets == null) {
        budgetGroup.budgets = [];
      }

      budgetGroup.budgets.push(reqData.budget);
      const data = await db.collection('BudgetGroup').updateOne({ '_id': new ObjectId(reqData.budgetGroup as string) }, { $set: budgetGroup });
      res.status(200).json(data);
    }else{
      res.status(404).end();
    }

  } else {
    res.status(400).end();
  }
}