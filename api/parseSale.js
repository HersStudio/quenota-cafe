{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ createClient \} from '@supabase/supabase-js';\
\
const supabaseUrl = process.env.SUPABASE_URL;\
const supabaseKey = process.env.SUPABASE_ANON_KEY;\
const anthropicKey = process.env.ANTHROPIC_API_KEY;\
\
const supabase = createClient(supabaseUrl, supabaseKey);\
\
export default async function handler(req, res) \{\
  // Solo POST\
  if (req.method !== 'POST') \{\
    return res.status(405).json(\{ error: 'M\'e9todo no permitido' \});\
  \}\
\
  const \{ mensaje \} = req.body;\
\
  if (!mensaje) \{\
    return res.status(400).json(\{ error: 'Falta el mensaje' \});\
  \}\
\
  try \{\
    // 1\uc0\u65039 \u8419  LLAMAR A CLAUDE PARA PARSEAR\
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', \{\
      method: 'POST',\
      headers: \{\
        'Content-Type': 'application/json',\
        'x-api-key': anthropicKey,\
      \},\
      body: JSON.stringify(\{\
        model: 'claude-opus-4-1-20250805',\
        max_tokens: 500,\
        system: `Eres un asistente que parsea mensajes de ventas de caf\'e9 para Qu\'e9 Nota Caf\'e9.\
\
Tu trabajo: Extraer informaci\'f3n del mensaje y responder SOLO con JSON v\'e1lido (sin markdown).\
\
Productos disponibles:\
- Regional del Valle (250g: $39900, 500g: $72000)\
- Bourbon Rosado (250g: $47900, 500g: $84900)\
- Honey (250g: $47900, 500g: $84900)\
\
Formato de respuesta:\
\{\
  "producto": "nombre exacto del producto",\
  "tamano": "250g o 500g",\
  "cantidad": n\'famero,\
  "confianza": 0-1,\
  "error": null o "mensaje de error"\
\}\
\
Si NO entiendes, responde:\
\{\
  "error": "No pude entender el mensaje",\
  "confianza": 0\
\}\
\
IMPORTANTE: Responde SOLO JSON, sin comillas de bloque, sin explicaciones.`,\
        messages: [\
          \{ \
            role: 'user', \
            content: mensaje \
          \}\
        ],\
      \}),\
    \});\
\
    const claudeData = await claudeResponse.json();\
    \
    if (!claudeData.content || !claudeData.content[0]) \{\
      return res.status(500).json(\{ error: 'Error procesando con Claude' \});\
    \}\
\
    const parsedText = claudeData.content[0].text;\
    \
    // Parsear respuesta JSON\
    let parsed;\
    try \{\
      parsed = JSON.parse(parsedText);\
    \} catch (e) \{\
      return res.status(400).json(\{ \
        error: 'No pude entender la estructura',\
        details: parsedText\
      \});\
    \}\
\
    // Validar confianza\
    if (parsed.error || parsed.confianza < 0.7) \{\
      return res.status(400).json(\{\
        error: parsed.error || 'Confianza insuficiente',\
        confianza: parsed.confianza\
      \});\
    \}\
\
    // 2\uc0\u65039 \u8419  BUSCAR PRODUCTO EN SUPABASE\
    const \{ data: products, error: searchError \} = await supabase\
      .from('productos')\
      .select('*')\
      .ilike('nombre', `%$\{parsed.producto\}%`)\
      .eq('size', parsed.tamano);\
\
    if (searchError || !products || products.length === 0) \{\
      return res.status(404).json(\{\
        error: `Producto no encontrado: $\{parsed.producto\} $\{parsed.tamano\}`,\
        buscado: parsed\
      \});\
    \}\
\
    const producto = products[0];\
\
    // 3\uc0\u65039 \u8419  VERIFICAR STOCK\
    if (producto.stock < parsed.cantidad) \{\
      return res.status(400).json(\{\
        error: `Stock insuficiente. Stock disponible: $\{producto.stock\}`,\
        producto: producto.nombre,\
        tamano: producto.size,\
        stockActual: producto.stock\
      \});\
    \}\
\
    // 4\uc0\u65039 \u8419  ACTUALIZAR STOCK EN PRODUCTOS\
    const nuevoStock = producto.stock - parsed.cantidad;\
    const \{ error: updateError \} = await supabase\
      .from('productos')\
      .update(\{ stock: nuevoStock \})\
      .eq('id', producto.id);\
\
    if (updateError) \{\
      return res.status(500).json(\{ \
        error: 'Error actualizando stock',\
        details: updateError.message \
      \});\
    \}\
\
    // 5\uc0\u65039 \u8419  REGISTRAR VENTA EN TABLA SALES\
    const \{ error: saleError \} = await supabase\
      .from('sales')\
      .insert(\{\
        product_id: producto.id,\
        quantity: parsed.cantidad,\
        product_name: producto.nombre,\
        product_size: producto.size,\
        product_price: producto.price,\
        notes: mensaje\
      \});\
\
    if (saleError) \{\
      return res.status(500).json(\{ \
        error: 'Error registrando venta',\
        details: saleError.message \
      \});\
    \}\
\
    // 6\uc0\u65039 \u8419  RESPUESTA EXITOSA\
    const ingresoTotal = producto.price * parsed.cantidad;\
\
    return res.status(200).json(\{\
      success: true,\
      mensaje: `\uc0\u9989  Venta registrada: $\{parsed.cantidad\}x $\{producto.nombre\} $\{producto.size\}`,\
      producto: \{\
        nombre: producto.nombre,\
        size: producto.size,\
        precio: producto.price,\
        cantidad: parsed.cantidad\
      \},\
      stockRestante: nuevoStock,\
      ingresos: ingresoTotal,\
      timestamp: new Date().toISOString()\
    \});\
\
  \} catch (error) \{\
    console.error('Error en parseSale:', error);\
    return res.status(500).json(\{\
      error: 'Error procesando solicitud',\
      details: error.message\
    \});\
  \}\
\}}