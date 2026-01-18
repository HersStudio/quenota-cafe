import React from 'react';
import { Card } from './ui/card';
import { Package, Coffee } from 'lucide-react';
import type { OrderData } from '../App';

interface OrderSummaryProps {
  orderData: OrderData;
  price: number;
}

export function OrderSummary({ orderData, price }: OrderSummaryProps) {
  const getGrindTypeLabel = (value: string) => {
    const labels: Record<string, string> = {
      'cafetera-tradicional': 'Cafetera tradicional',
      'prensa-francesa': 'Prensa francesa',
      'v60': 'V60',
      'moka': 'Moka',
    };
    return labels[value] || value;
  };

  return (
    <Card className="p-6 bg-gray-100 border-2 border-gray-400">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumen del pedido</h2>

        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-300">
          {/* Product */}
          <div className="flex items-start gap-3">
            <Coffee className="w-5 h-5 text-gray-600 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Café Premium</p>
              <p className="text-sm text-gray-600">Tamaño: {orderData.size}</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-gray-600 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {orderData.type === 'grano' ? 'En grano' : 'Molido'}
              </p>
              {orderData.type === 'molido' && orderData.grindType && (
                <p className="text-sm text-gray-600">
                  Para: {getGrindTypeLabel(orderData.grindType)}
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="pt-3 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                ${price.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 text-center">
            💳 El pago se coordina por WhatsApp mediante transferencia bancaria
          </p>
        </div>
      </div>
    </Card>
  );
}
