
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem, quantity: number) => void;
  isLocked?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAdd, isLocked }) => {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAdd(item, qty);
    setQty(1); // Reset local quantity after adding to cart
  };

  return (
    <div className="group bg-white rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 border-sky-50 flex flex-col relative p-2">
      <div className="relative h-36 sm:h-44 overflow-hidden rounded-[1.8rem]">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-md text-sky-500 text-[10px] font-bold px-3 py-1 rounded-full border border-sky-100 uppercase tracking-widest shadow-sm">
            {item.category.split(' ')[0]}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-mali font-bold text-base sm:text-lg text-slate-800 leading-tight mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-sky-500 font-bold text-lg mb-4">฿{item.price}</p>
        
        <div className="flex flex-col gap-3 mt-auto">
          {/* Enhanced Quantity Selector */}
          <div className="flex items-center justify-between bg-slate-50/80 rounded-2xl p-1.5 border border-slate-100">
             <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-sky-500 hover:bg-white transition-all font-bold text-xl active:scale-90"
             >
               −
             </button>
             <span className="text-base font-bold text-slate-800 w-8 text-center">{qty}</span>
             <button 
              onClick={() => setQty(qty + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-sky-500 hover:bg-white transition-all font-bold text-xl active:scale-90"
             >
               +
             </button>
          </div>
          
          <button 
            onClick={handleAdd}
            disabled={isLocked}
            className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
              isLocked 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-sky-500 text-white hover:bg-sky-600 shadow-[0_4px_0px_#0369a1] active:translate-y-1 active:shadow-none'
            }`}
          >
            {isLocked ? 'ปิดรับคิว' : 'เพิ่มลงตะกร้า'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
