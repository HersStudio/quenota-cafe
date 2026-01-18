import React from 'react';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import type { OrderData } from '../App';

interface WhatsAppButtonProps {
  orderData: OrderData;
  price: number;
  isDisabled: boolean;
}

export function WhatsAppButton({ orderData, price, isDisabled }: WhatsAppButtonProps) {
  const getGrindTypeLabel = (value: string) => {
    const labels: Record<string, string> = {
      'cafetera-tradicional': 'Cafetera tradicional',
      'prensa-francesa': 'Prensa francesa',
      'v60': 'V60',
      'moka': 'Moka',
    };
    return labels[value] || value;
  };

  const generateWhatsAppMessage = () => {
    const grindInfo = orderData.type === 'molido' && orderData.grindType 
      ? `\nTipo de molienda: ${getGrindTypeLabel(orderData.grindType)}`
      : '';

    const notesInfo = orderData.notes.trim() 
      ? `\nObservaciones: ${orderData.notes}`
      : '';

    return `🛒 *NUEVO PEDIDO DE CAFÉ*

📦 *Producto:* Café Premium
📏 *Tamaño:* ${orderData.size}
☕ *Presentación:* ${orderData.type === 'grano' ? 'En grano' : 'Molido'}${grindInfo}
💰 *Total:* $${price.toLocaleString('es-CO')} COP

👤 *DATOS DEL CLIENTE*
Nombre: ${orderData.customerName} ${orderData.customerLastName}
Teléfono: ${orderData.phone}
Email: ${orderData.email}

📍 *DIRECCIÓN DE ENTREGA*
${orderData.address}
Ciudad: ${orderData.city}
Barrio: ${orderData.neighborhood}${notesInfo}`;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    // Replace with your actual WhatsApp business number (include country code without +)
    const phoneNumber = '573001234567'; // Example: Colombia number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-gray-300 -mx-4">
      <Button
        onClick={handleWhatsAppClick}
        disabled={isDisabled}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        Finalizar pedido por WhatsApp
      </Button>
      {isDisabled && (
        <p className="text-sm text-red-600 text-center mt-2">
          Por favor completa todos los campos requeridos (*)
        </p>
      )}
    </div>
  );
}
