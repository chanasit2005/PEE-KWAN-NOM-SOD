import React from 'react';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onProceed: () => void;
  onBack: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onProceed, onBack }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-blue-50 rounded-2xl text-sky-600 hover:bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-mali font-bold text-sky-600">ตะกร้าของคุณ</h2>
      </div>

      <div className="bg-white rounded-[2rem] border-4 border-blue-50 p-5 shadow-sm min-h-[350px] flex flex-col">
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-slate-400">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
             </div>
             <p className="text-sm italic font-medium">ตะกร้ายังว่างอยู่เลยค่ะ...</p>
             <button onClick={onBack} className="text-sky-500 font-bold underline text-sm">ไปเลือกเมนูอร่อยๆ กัน!</button>
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-sky-50/40 rounded-2xl border border-sky-100">
                <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-mali font-bold text-slate-800 text-xs">{item.name}</h4>
                  <p className="text-sky-600 font-bold text-xs">฿{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center bg-white rounded-xl p-0.5 border border-sky-100 shadow-sm">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-50 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xl text-sky-700">{item.quantity}</span>
                  {/* Fix: changed ) to > to close the button tag correctly */}
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-50 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-blue-50 space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-slate-400 font-bold text-xs">ยอดรวมทั้งสิ้น</span>
              <span className="text-2xl font-mali font-bold text-sky-600">฿{total}</span>
            </div>
            <button 
              onClick={onProceed}
              className="btn-cute w-full bg-sky-500 text-white py-3.5 rounded-2xl font-bold text-base hover:bg-sky-600 shadow-[0_4px_0px_#0369a1]"
            >
              ดำเนินการชำระเงิน
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;