
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  activeView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setView }) => {
  const items: { id: AppView, label: string, icon: React.ReactNode }[] = [
    { id: 'MENU', label: 'เมนูหลัก', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'STATUS', label: 'สถานะคิว', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'ADMIN', label: 'แอดมิน', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-4 border-blue-50 flex justify-around items-center p-3 z-50 shadow-2xl rounded-t-[2.5rem]">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col items-center gap-1 p-2 min-w-[80px] rounded-2xl transition-all ${
            activeView === item.id || (item.id === 'MENU' && activeView === 'CART') || (item.id === 'MENU' && activeView === 'PAYMENT')
              ? 'text-sky-600 bg-sky-50 font-bold scale-110' 
              : 'text-slate-400'
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-mali">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
