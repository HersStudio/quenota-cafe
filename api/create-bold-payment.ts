import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const body = await new Promise<string>((resolve) => {
    let data = '';
    req.on('data', (chunk: Buffer) => { data += chunk; });
    req.on('end', () => resolve(data));
  });

  const { description, amount, reference } = JSON.parse(body);

  if (!description || !amount || !reference) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing required fields' }));
    return;
  }

  const apiKey = process.env.BOLD_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Bold API key not configured' }));
    return;
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
    reference,
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
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'Invalid response from Bold', raw: responseText }));
    return;
  }

  res.statusCode = response.ok ? 200 : response.status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response.ok ? data : { error: data, status: response.status }));
}
