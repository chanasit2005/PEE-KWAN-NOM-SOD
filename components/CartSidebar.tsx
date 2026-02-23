
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onProceedToPayment: () => void;
  isLocked: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onProceedToPayment, isLocked }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#fdfaf3]">
          <h2 className="text-xl font-serif text-blue-900">ตะกร้าของคุณ</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">ตะกร้ายังว่างอยู่...</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl">
                <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-xs">{item.name}</h4>
                  <p className="text-blue-900 font-bold text-xs">฿{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 rounded-full border border-slate-300">-</button>
                  <span className="text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 rounded-full border border-slate-300">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-[#fdfaf3] border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-blue-900">
              <span>ยอดรวม</span>
              <span>฿{total}</span>
            </div>
            <button 
              disabled={isLocked}
              onClick={onProceedToPayment}
              className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
                isLocked ? 'bg-slate-300 text-slate-500' : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              {isLocked ? 'ขออภัย ปิดรับคิวชั่วคราว' : 'ไปที่หน้าชำระเงิน'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
