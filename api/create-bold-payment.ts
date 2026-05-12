import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description, amount, reference } = req.body;

  if (!description || !amount || !reference) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.BOLD_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Bold API key not configured' });
  }

  const response = await fetch('https://payments.api.bold.co/v2/payment-voucher/link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `x-api-key ${apiKey}`,
    },
    body: JSON.stringify({
      amount_type: 'CLOSE',
      amount: {
        currency: 'COP',
        total_amount: amount,
        tip_amount: 0,
      },
      description,
      reference,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: data });
  }

  return res.status(200).json(data);
}
