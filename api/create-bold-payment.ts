export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, description, orderId } = req.body;
  const reference = orderId || `QN-${Date.now()}`;
  const amountInCents = Math.round(amount * 100);
  const currency = 'COP';

  // Firma de integridad requerida por Bold
  const secretKey = process.env.BOLD_SECRET_KEY || '';
  const dataToHash = `${reference}${amountInCents}${currency}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(dataToHash);
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');

  const response = await fetch('https://payments.api.bold.co/v2/payment-voucher/link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `x-api-key ${process.env.BOLD_API_KEY}`,
    },
    body: JSON.stringify({
      amount_in_cents: amountInCents,
      currency,
      description: description || 'Pedido Qué Nota Café',
      reference,
      integrity_signature: hashHex,
    }),
  });

  const data = await response.json();
  console.log('Bold status:', response.status, 'Response:', JSON.stringify(data));

  if (!response.ok) return res.status(response.status).json({ error: data });
  return res.status(200).json({ payment_url: data.url || data.payment_url || data.link });
}
