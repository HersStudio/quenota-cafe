export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, description, orderId } = req.body;

  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [{
        title: description || 'Pedido Qué Nota Café',
        quantity: 1,
        unit_price: amount,
        currency_id: 'COP',
      }],
      external_reference: orderId || `QN-${Date.now()}`,
      back_urls: {
        success: 'https://quenotacafe.com',
        failure: 'https://quenotacafe.com',
        pending: 'https://quenotacafe.com',
      },
      auto_return: 'approved',
    }),
  });

  const data = await response.json();
  console.log('MP response:', JSON.stringify(data));

  if (!response.ok) return res.status(response.status).json({ error: data });
  return res.status(200).json({ payment_url: data.init_point });
}
