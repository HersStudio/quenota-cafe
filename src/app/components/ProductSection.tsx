import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Package } from 'lucide-react';
import type { OrderData } from '../App';

interface ProductSectionProps {
  orderData: OrderData;
  updateOrderData: (field: keyof OrderData, value: string) => void;
  hideImage?: boolean;
}

export function ProductSection({ orderData, updateOrderData, hideImage = false }: ProductSectionProps) {
  const handleTypeChange = (value: 'grano' | 'molido') => {
    updateOrderData('type', value);
    if (value === 'grano') {
      updateOrderData('grindType', '');
    }
  };

  return (
    <Card className="p-6 bg-white border-2 border-gray-300">
      <div className="space-y-6">
        {/* Product Image - Only show on mobile or when hideImage is false */}
        {!hideImage && (
          <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1761936513644-cbc5f3207139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiYWclMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzY3NzcwMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Café Premium"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Product Name */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[Neuething_Sans]">Café Premium</h1>
          <p className="text-xl text-gray-700 font-[Neuething_Sans]">
            ${orderData.size === '250g' ? '25.000' : '45.000'} COP
          </p>
        </div>

        {/* Size Selector */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-900 font-[Neuething_Sans] font-bold">Tamaño</Label>
          <RadioGroup 
            value={orderData.size} 
            onValueChange={(value) => updateOrderData('size', value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="250g" id="size-250" />
              <Label htmlFor="size-250" className="cursor-pointer flex-1 p-3 border-2 border-gray-300 rounded-lg text-center hover:border-gray-400 font-[Neuething_Sans]">
                250 g
              </Label>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="500g" id="size-500" />
              <Label htmlFor="size-500" className="cursor-pointer flex-1 p-3 border-2 border-gray-300 rounded-lg text-center hover:border-gray-400">
                500 g
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Type Selector */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-900">Presentación</Label>
          <RadioGroup 
            value={orderData.type} 
            onValueChange={handleTypeChange}
          >
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg">
              <RadioGroupItem value="grano" id="type-grano" />
              <Label htmlFor="type-grano" className="cursor-pointer flex-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                En grano
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg">
              <RadioGroupItem value="molido" id="type-molido" />
              <Label htmlFor="type-molido" className="cursor-pointer flex-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                Molido
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Conditional Grind Type Selector */}
        {orderData.type === 'molido' && (
          <div className="space-y-3 pt-2">
            <Label htmlFor="grind-type" className="text-lg font-semibold text-gray-900">
              ¿Para qué tipo de preparación?
            </Label>
            <Select value={orderData.grindType} onValueChange={(value) => updateOrderData('grindType', value)}>
              <SelectTrigger id="grind-type" className="w-full border-2 border-gray-300">
                <SelectValue placeholder="Selecciona el tipo de molienda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cafetera-tradicional">Cafetera tradicional</SelectItem>
                <SelectItem value="prensa-francesa">Prensa francesa</SelectItem>
                <SelectItem value="v60">V60</SelectItem>
                <SelectItem value="moka">Moka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </Card>
  );
}