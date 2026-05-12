export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description, amount, orderId } = req.body;

  if (!description || !amount || !orderId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.BOLD_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Bold API key not configured' });
  }

  const amountInCents = Math.round(amount * 100);

  const boldPayload = {
    amount_type: 'CLOSE',
    amount: {
      currency: 'COP',
      total_amount: amountInCents,
      tip_amount: 0,
    },
    description,
    reference: orderId,
  };

  console.log('[Bold] Request payload:', JSON.stringify(boldPayload));

  const response = await fetch('https://payments.api.bold.co/v2/payment-voucher/link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `x-api-key ${apiKey}`,
    },
    body: JSON.stringify(boldPayload),
  });

  const responseText = await response.text();
  console.log('[Bold] Status:', response.status);
  console.log('[Bold] Response:', responseText);

  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    return res.status(502).json({ error: 'Invalid response from Bold', raw: responseText });
  }

  if (!response.ok) {
    return res.status(response.status).json({ error: data, status: response.status });
  }

  const paymentUrl = data.url || data.payment_url || data.redirect_url;
  return res.status(200).json({ payment_url: paymentUrl, ...data });
}
