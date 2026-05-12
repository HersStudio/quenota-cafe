export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { description, amount, reference } = await req.json();

  if (!description || !amount || !reference) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const apiKey = process.env.BOLD_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Bold API key not configured' }), { status: 500 });
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
    return new Response(JSON.stringify({ error: 'Invalid response from Bold', raw: responseText }), { status: 502 });
  }

  return new Response(
    JSON.stringify(response.ok ? data : { error: data, status: response.status }),
    { status: response.ok ? 200 : response.status, headers: { 'Content-Type': 'application/json' } },
  );
}
