export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, data } = req.body;
  if (type !== 'payment') return res.status(200).end();

  // Obtener detalles del pago
  const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
    headers: { 'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}` }
  });
  const payment = await paymentRes.json();

  if (payment.status !== 'approved') return res.status(200).end();

  // Parsear datos del pedido
  let order: any = {};
  try { order = JSON.parse(payment.external_reference); } catch {}

  // Enviar WhatsApp via Twilio
  const message = `✅ PAGO APROBADO - QUÉ NOTA\n\n☕ ${order.productName || 'Producto'}\n⚖️ Gramaje: ${order.weight || ''}g · ${order.grind || ''}\n💰 Total: $${order.total?.toLocaleString('es-CO') || ''}\n📍 ${order.address || ''}, ${order.neighborhood || ''}, ${order.city || ''}\n👤 ${payment.payer?.first_name || ''} ${payment.payer?.last_name || ''}\n📧 ${payment.payer?.email || ''}\n🔖 Ref: ${order.orderId || ''}`;

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${twilioSid}:${twilioToken}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: 'whatsapp:+14155238886',
      To: 'whatsapp:+573209028644',
      Body: message
    }).toString()
  });

  return res.status(200).end();
}
