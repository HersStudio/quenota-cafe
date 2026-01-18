import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import type { OrderData } from '../App';

interface CustomerFormProps {
  orderData: OrderData;
  updateOrderData: (field: keyof OrderData, value: string) => void;
}

export function CustomerForm({ orderData, updateOrderData }: CustomerFormProps) {
  return (
    <Card className="p-6 bg-white border-2 border-gray-300">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Datos de entrega</h2>

        {/* Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Nombre *
            </Label>
            <Input
              id="customerName"
              type="text"
              value={orderData.customerName}
              onChange={(e) => updateOrderData('customerName', e.target.value)}
              placeholder="Tu nombre"
              required
              className="border-2 border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerLastName" className="text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Apellido *
            </Label>
            <Input
              id="customerLastName"
              type="text"
              value={orderData.customerLastName}
              onChange={(e) => updateOrderData('customerLastName', e.target.value)}
              placeholder="Tu apellido"
              required
              className="border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-900 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Número de celular *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={orderData.phone}
            onChange={(e) => updateOrderData('phone', e.target.value)}
            placeholder="300 123 4567"
            required
            className="border-2 border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-900 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Correo electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            value={orderData.email}
            onChange={(e) => updateOrderData('email', e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
            className="border-2 border-gray-300"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Dirección de entrega *
          </Label>
          <Input
            id="address"
            type="text"
            value={orderData.address}
            onChange={(e) => updateOrderData('address', e.target.value)}
            placeholder="Calle 123 # 45-67"
            required
            className="border-2 border-gray-300"
          />
        </div>

        {/* City & Neighborhood */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-900">
              Ciudad *
            </Label>
            <Input
              id="city"
              type="text"
              value={orderData.city}
              onChange={(e) => updateOrderData('city', e.target.value)}
              placeholder="Tu ciudad"
              required
              className="border-2 border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood" className="text-gray-900">
              Barrio *
            </Label>
            <Input
              id="neighborhood"
              type="text"
              value={orderData.neighborhood}
              onChange={(e) => updateOrderData('neighborhood', e.target.value)}
              placeholder="Tu barrio"
              required
              className="border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-gray-900">
            Apto / Torre / Conjunto / Observaciones (opcional)
          </Label>
          <Textarea
            id="notes"
            value={orderData.notes}
            onChange={(e) => updateOrderData('notes', e.target.value)}
            placeholder="Ej: Apto 301, Torre B, llamar al llegar..."
            rows={3}
            className="border-2 border-gray-300 resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
