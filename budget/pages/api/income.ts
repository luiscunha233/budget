import type { NextApiRequest, NextApiResponse } from 'next'
 
type Fact = {
  fact: string, length: number
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fact>
) {
  res.status(200).json({ fact: 'Hello from Next.js!',length:0 })
}