import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, Package, AlertCircle, PlusCircle, Trash2, Send, Loader } from 'lucide-react';

const QuéNotaDashboard = () => {
  const [registros, setRegistros] = useState([]);
  const [mensajeVenta, setMensajeVenta] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Precios base
  const PRECIOS = {
    regional_250: 39900,
    regional_500: 72000,
    bourbon_250: 47900,
    bourbon_500: 84900,
    honey_250: 47900,
    honey_500: 84900
  };

  const PROYECCION = {
    ingreso_semanal: 1670000,
    ganancia_semanal: 1010000,
    punto_equilibrio: 660000
  };

  useEffect(() => {
    const datos = localStorage.getItem('quenota_registros');
    if (datos) {
      setRegistros(JSON.parse(datos));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('quenota_registros', JSON.stringify(registros));
  }, [registros]);

  // Procesar venta con Agente IA
  const procesarVenta = async () => {
    if (!mensajeVenta.trim()) return;

    setProcesando(true);
    setRespuesta(null);

    try {
      const res = await fetch('/api/parseSale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: mensajeVenta })
      });

      const data = await res.json();
      setRespuesta(data);

      // Si fue exitosa, agregar al registro
      if (data.success) {
        const hoy = new Date().toISOString().split('T')[0];
        const registroExistente = registros.find(r => r.fecha === hoy);

        if (registroExistente) {
          // Actualizar registro existente
          setRegistros(registros.map(r =>
            r.fecha === hoy ? {
              ...r,
              gastos: {
                ...r.gastos,
                cafes: (r.gastos.cafes || 0) + Math.round(data.producto.precio * 0.3)
              }
            } : r
          ));
        } else {
          // Crear nuevo registro
          setRegistros([...registros, {
            fecha: hoy,
            bourbon_250: data.producto.size === '250g' && data.producto.nombre.includes('Bourbon') ? data.producto.cantidad : 0,
            bourbon_500: data.producto.size === '500g' && data.producto.nombre.includes('Bourbon') ? data.producto.cantidad : 0,
            regional_250: data.producto.size === '250g' && data.producto.nombre.includes('Regional') ? data.producto.cantidad : 0,
            regional_500: data.producto.size === '500g' && data.producto.nombre.includes('Regional') ? data.producto.cantidad : 0,
            honey_250: data.producto.size === '250g' && data.producto.nombre.includes('Honey') ? data.producto.cantidad : 0,
            honey_500: data.producto.size === '500g' && data.producto.nombre.includes('Honey') ? data.producto.cantidad : 0,
            gastos: {
              cafes: Math.round(data.producto.precio * 0.3),
              gasolina: 0,
              bolsas: 0,
              stickers: 0,
              thank_you_cards: 0,
              luz: 0,
              bolsas_craft: 0
            },
            notas: `Registrado por Agente IA: ${mensajeVenta}`
          }]);
        }

        setMensajeVenta('');
      }
    } catch (error) {
      setRespuesta({ error: 'Error conectando con el agente', details: error.message });
    }

    setProcesando(false);
  };

  // Agregar nuevo registro
  const agregarRegistro = () => {
    const today = new Date().toISOString().split('T')[0];
    const registroHoy = registros.find(r => r.fecha === today);

    if (!registroHoy) {
      setRegistros([...registros, {
        fecha: today,
        bourbon_250: 0,
        bourbon_500: 0,
        regional_250: 0,
        regional_500: 0,
        honey_250: 0,
        honey_500: 0,
        gastos: {
          cafes: 0,
          gasolina: 0,
          bolsas: 0,
          stickers: 0,
          thank_you_cards: 0,
          luz: 0,
          bolsas_craft: 0
        },
        notas: ''
      }]);
    }
  };

  // Actualizar registro
  const actualizarRegistro = (fecha, campo, valor) => {
    setRegistros(registros.map(r => {
      if (r.fecha === fecha) {
        if (campo.startsWith('gastos_')) {
          const gastoCampo = campo.replace('gastos_', '');
          return {
            ...r,
            gastos: {
              ...r.gastos,
              [gastoCampo]: parseInt(valor) || 0
            }
          };
        } else {
          return {
            ...r,
            [campo]: campo === 'notas' ? valor : parseInt(valor) || 0
          };
        }
      }
      return r;
    }));
  };

  // Eliminar registro
  const eliminarRegistro = (fecha) => {
    setRegistros(registros.filter(r => r.fecha !== fecha));
  };

  // Calcular totales
  const calcularTotales = () => {
    let totalIngresos = 0;
    let totalGastos = 0;
    let totalBolsas = 0;
    let gastosDesglosados = {
      cafes: 0,
      gasolina: 0,
      bolsas: 0,
      stickers: 0,
      thank_you_cards: 0,
      luz: 0,
      bolsas_craft: 0
    };

    registros.forEach(r => {
      const ingresos = (r.bourbon_250 * PRECIOS.bourbon_250) +
                      (r.bourbon_500 * PRECIOS.bourbon_500) +
                      (r.regional_250 * PRECIOS.regional_250) +
                      (r.regional_500 * PRECIOS.regional_500) +
                      ((r.honey_250 || 0) * PRECIOS.honey_250) +
                      ((r.honey_500 || 0) * PRECIOS.honey_500);

      const gastosDia = Object.values(r.gastos).reduce((a, b) => a + b, 0);

      totalIngresos += ingresos;
      totalGastos += gastosDia;
      totalBolsas += (r.bourbon_250 || 0) + (r.bourbon_500 || 0) + (r.regional_250 || 0) + (r.regional_500 || 0) + (r.honey_250 || 0) + (r.honey_500 || 0);

      Object.keys(r.gastos).forEach(key => {
        gastosDesglosados[key] += r.gastos[key];
      });
    });

    const totalGanancia = totalIngresos - totalGastos;
    return { totalIngresos, totalGastos, totalGanancia, totalBolsas, gastosDesglosados };
  };

  const calcularDistribucion = () => {
    const { totalGanancia } = calcularTotales();
    return {
      reinversion: totalGanancia * 0.5,
      ahorro: totalGanancia * 0.3,
      sueldos: totalGanancia * 0.2
    };
  };

  const datosGrafico = registros.map(r => {
    const ingresos = (r.bourbon_250 * PRECIOS.bourbon_250) +
                    (r.bourbon_500 * PRECIOS.bourbon_500) +
                    (r.regional_250 * PRECIOS.regional_250) +
                    (r.regional_500 * PRECIOS.regional_500) +
                    ((r.honey_250 || 0) * PRECIOS.honey_250) +
                    ((r.honey_500 || 0) * PRECIOS.honey_500);
    const gastosDia = Object.values(r.gastos).reduce((a, b) => a + b, 0);
    return {
      fecha: new Date(r.fecha).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }),
      ingresos: Math.round(ingresos / 1000),
      gastos: Math.round(gastosDia / 1000),
      ganancia: Math.round((ingresos - gastosDia) / 1000)
    };
  });

  const { totalIngresos, totalGastos, totalGanancia, totalBolsas, gastosDesglosados } = calcularTotales();
  const distribucion = calcularDistribucion();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-amber-50">Cargando...</div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2E8E0' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#C86A3A' }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Qué Nota Café</h1>
              <p className="text-amber-50 text-sm">Dashboard Financiero + Agente IA</p>
            </div>
            <button
              onClick={agregarRegistro}
              className="flex items-center gap-2 bg-white text-amber-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
            >
              <PlusCircle size={20} /> Nuevo Registro
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: '#C86A3A' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">INGRESOS TOTALES</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${(totalIngresos / 1000000).toFixed(2)}M</p>
              </div>
              <DollarSign size={24} className="text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: '#C86A3A' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">GANANCIA NETA</p>
                <p className="text-2xl font-bold text-green-600 mt-1">${(totalGanancia / 1000000).toFixed(2)}M</p>
              </div>
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: '#C86A3A' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">BOLSAS VENDIDAS</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalBolsas}</p>
              </div>
              <Package size={24} className="text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4" style={{ borderLeftColor: '#C86A3A' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">MARGEN PROMEDIO</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalIngresos > 0 ? ((totalGanancia / totalIngresos) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <Target size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        {/* CHAT DE VENTAS CON AGENTE IA */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ color: '#1E1E1E' }}>
            💬 Chat de Ventas (Agente IA)
          </h2>
          
          <div className="space-y-4">
            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={mensajeVenta}
                onChange={(e) => setMensajeVenta(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && procesarVenta()}
                placeholder="Ej: Vendí 2 regional 250g grano"
                disabled={procesando}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              />
              <button
                onClick={procesarVenta}
                disabled={procesando || !mensajeVenta.trim()}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition"
              >
                {procesando ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                {procesando ? 'Procesando...' : 'Enviar'}
              </button>
            </div>

            {/* Respuesta */}
            {respuesta && (
              <div className={`p-4 rounded-lg ${
                respuesta.success ? 'bg-green-50 border-l-4 border-green-600' : 'bg-red-50 border-l-4 border-red-600'
              }`}>
                {respuesta.success ? (
                  <div className="space-y-2">
                    <p className="text-green-800 font-semibold">✅ {respuesta.mensaje}</p>
                    <div className="text-sm text-green-700 space-y-1">
                      <p><strong>Producto:</strong> {respuesta.producto.nombre} {respuesta.producto.size}</p>
                      <p><strong>Cantidad:</strong> {respuesta.producto.cantidad} bolsa(s)</p>
                      <p><strong>Ingresos:</strong> ${respuesta.ingresos.toLocaleString('es-CO')}</p>
                      <p><strong>Stock restante:</strong> {respuesta.stockRestante} unidades</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-800 font-semibold">❌ {respuesta.error}</p>
                    {respuesta.detalles && (
                      <p className="text-sm text-red-700 mt-2">{respuesta.detalles}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sección de entrada de datos MANUAL */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ color: '#1E1E1E' }}>Registrar Ventas Manuales</h2>
          
          {registros.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-amber-400 mb-4" />
              <p className="text-gray-600">No hay registros manuales. Usa el Chat de Ventas o haz click en "Nuevo Registro".</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Tabla de Ventas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">VENTAS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#F2E8E0' }}>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Bourbon 250g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Bourbon 500g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Regional 250g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Regional 500g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Honey 250g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Honey 500g</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Ingresos</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map(r => {
                        const ingresos = (r.bourbon_250 * PRECIOS.bourbon_250) +
                                       (r.bourbon_500 * PRECIOS.bourbon_500) +
                                       (r.regional_250 * PRECIOS.regional_250) +
                                       (r.regional_500 * PRECIOS.regional_500) +
                                       ((r.honey_250 || 0) * PRECIOS.honey_250) +
                                       ((r.honey_500 || 0) * PRECIOS.honey_500);
                        return (
                          <tr key={r.fecha} className="border-b hover:bg-amber-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{new Date(r.fecha).toLocaleDateString('es-CO')}</td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.bourbon_250}
                                onChange={(e) => actualizarRegistro(r.fecha, 'bourbon_250', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.bourbon_500}
                                onChange={(e) => actualizarRegistro(r.fecha, 'bourbon_500', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.regional_250}
                                onChange={(e) => actualizarRegistro(r.fecha, 'regional_250', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.regional_500}
                                onChange={(e) => actualizarRegistro(r.fecha, 'regional_500', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.honey_250 || 0}
                                onChange={(e) => actualizarRegistro(r.fecha, 'honey_250', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.honey_500 || 0}
                                onChange={(e) => actualizarRegistro(r.fecha, 'honey_500', e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center font-semibold text-gray-900">${(ingresos / 1000).toFixed(0)}k</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => eliminarRegistro(r.fecha)}
                                className="text-red-500 hover:text-red-700 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabla de Gastos Desglosados */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">GASTOS DESGLOSADOS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#F2E8E0' }}>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Cafés</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Gasolina</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Bolsas</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Stickers</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Thank You</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Luz</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Bolsas Craft</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map(r => {
                        const totalGasto = Object.values(r.gastos).reduce((a, b) => a + b, 0);
                        return (
                          <tr key={r.fecha} className="border-b hover:bg-amber-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{new Date(r.fecha).toLocaleDateString('es-CO')}</td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.cafes}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_cafes', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.gasolina}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_gasolina', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.bolsas}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_bolsas', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.stickers}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_stickers', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.thank_you_cards}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_thank_you_cards', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.luz}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_luz', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={r.gastos.bolsas_craft}
                                onChange={(e) => actualizarRegistro(r.fecha, 'gastos_bolsas_craft', e.target.value)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-center font-semibold text-red-600">${(totalGasto / 1000).toFixed(0)}k</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gráficos */}
        {datosGrafico.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ingresos vs Gastos Totales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}k`} />
                  <Legend />
                  <Bar dataKey="ingresos" fill="#C86A3A" name="Ingresos" />
                  <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ganancia Diaria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={datosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}k`} />
                  <Legend />
                  <Line type="monotone" dataKey="ganancia" stroke="#16a34a" strokeWidth={2} name="Ganancia" dot={{ fill: '#C86A3A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ANÁLISIS DE GASTOS DESGLOSADOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Desglose de Gastos Totales</h3>
            <div className="space-y-3">
              {[
                { label: 'Cafés/Insumos', valor: gastosDesglosados.cafes, color: '#8B4513' },
                { label: 'Gasolina', valor: gastosDesglosados.gasolina, color: '#FF8C00' },
                { label: 'Bolsas', valor: gastosDesglosados.bolsas, color: '#4169E1' },
                { label: 'Stickers', valor: gastosDesglosados.stickers, color: '#32CD32' },
                { label: 'Thank You Cards', valor: gastosDesglosados.thank_you_cards, color: '#DC143C' },
                { label: 'Luz', valor: gastosDesglosados.luz, color: '#FFD700' },
                { label: 'Bolsas Craft', valor: gastosDesglosados.bolsas_craft, color: '#C86A3A' }
              ].map((item, idx) => {
                const porcentaje = totalGastos > 0 ? ((item.valor / totalGastos) * 100).toFixed(1) : 0;
                return (
                  <div key={idx} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="font-bold text-gray-900">${(item.valor / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${porcentaje}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">{porcentaje}% del total</div>
                  </div>
                );
              })}
              <div className="pt-3 border-t-2" style={{ borderTopColor: '#C86A3A' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">TOTAL GASTOS</span>
                  <span className="font-bold text-2xl text-red-600">${(totalGastos / 1000000).toFixed(2)}M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Ganancias</h3>
            {totalGanancia > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Reinversión (50%)', value: distribucion.reinversion },
                      { name: 'Ahorro (30%)', value: distribucion.ahorro },
                      { name: 'Sueldos (20%)', value: distribucion.sueldos }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(1)}M`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#C86A3A" />
                    <Cell fill="#10b981" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500 py-12">Sin datos de ganancia aún</div>
            )}
          </div>
        </div>

        {/* Resumen Financiero */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen Financiero</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Ingresos Totales:</span>
              <span className="font-bold text-lg">${(totalIngresos / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Gastos Totales:</span>
              <span className="font-bold text-lg text-red-600">${(totalGastos / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b" style={{ borderBottomColor: '#C86A3A', borderBottomWidth: '2px' }}>
              <span className="font-bold text-gray-900">Ganancia Neta:</span>
              <span className="font-bold text-2xl text-green-600">${(totalGanancia / 1000000).toFixed(2)}M</span>
            </div>
            <div className="mt-6 space-y-3 bg-amber-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-700">Reinversión (50%):</span>
                <span className="font-semibold">${(distribucion.reinversion / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Ahorro/Operación (30%):</span>
                <span className="font-semibold">${(distribucion.ahorro / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Sueldos (20%):</span>
                <span className="font-semibold">${(distribucion.sueldos / 1000000).toFixed(2)}M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuéNotaDashboard;