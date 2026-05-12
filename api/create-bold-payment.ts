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

  console.log('[Bold] Request URL:', 'https://payments.api.bold.co/v2/payment-voucher/link');
  console.log('[Bold] Request headers:', JSON.stringify({
    'Content-Type': 'application/json',
    'Authorization': `x-api-key ${apiKey.substring(0, 8)}...`,
  }));
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
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => { responseHeaders[key] = value; });

  console.log('[Bold] Response status:', response.status);
  console.log('[Bold] Response headers:', JSON.stringify(responseHeaders));
  console.log('[Bold] Response body:', responseText);

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: 'Bold API error',
        status: response.status,
        headers: responseHeaders,
        body: responseText,
      }),
      { status: response.status, headers: { 'Content-Type': 'application/json' } },
    );
  }

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
