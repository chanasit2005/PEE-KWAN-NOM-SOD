
import React from 'react';
import { Order, OrderStatus } from '../types';

interface QueueDisplayProps {
  orders: Order[];
  myOrder: Order | null;
}

const QueueDisplay: React.FC<QueueDisplayProps> = ({ orders, myOrder }) => {
  const activeOrders = orders.filter(o => o.status !== 'READY');
  const readyOrders = orders.filter(o => o.status === 'READY').slice(-10).reverse();

  const stages: { status: OrderStatus; label: string; subtext: string; icon: React.ReactNode }[] = [
    {
      status: 'PREPARING',
      label: 'กำลังปรุง',
      subtext: 'พี่ขวัญกำลังจัดเตรียมรายการให้คุณอยู่ค่ะ',
      icon: (
        <div className="animate-cute-pan">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 8h20M4.5 8v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V8M9 11V9M15 11V9M6 4h12" />
          </svg>
        </div>
      )
    },
    {
      status: 'WAITING',
      label: 'พร้อมเสิร์ฟ',
      subtext: 'รายการอาหารพร้อมรับแล้ว แวะมารับได้เลย!',
      icon: (
        <div className="animate-cute-bag">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      )
    },
    {
      status: 'READY',
      label: 'รับเรียบร้อย',
      subtext: 'ขอบคุณที่อุดหนุนนะคะ ทานให้อร่อยค่ะ!',
      icon: (
        <div className="animate-cute-check">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    }
  ];

  const getCurrentStageIndex = (status: OrderStatus) => {
    return stages.findIndex(s => s.status === status);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500 max-w-2xl mx-auto">
      {/* Personalized Status Card */}
      {myOrder && (
        <div className={`rounded-[2rem] p-6 shadow-xl border-4 overflow-hidden relative transition-all duration-700 ${
            myOrder.status === 'READY' ? 'bg-emerald-500 text-white border-white scale-105' : 'bg-white border-sky-50'
        }`}>
          {myOrder.status !== 'READY' && <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-100/30"></div>}
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className={`text-xl font-mali font-bold ${myOrder.status === 'READY' ? 'text-white' : 'text-sky-600'}`}>
                {myOrder.status === 'READY' ? 'รับออเดอร์แล้ว!' : 'สถานะคิวของคุณ'}
              </h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${myOrder.status === 'READY' ? 'text-emerald-100' : 'text-slate-400'}`}>
                คิวที่ #{myOrder.queueNumber} • คุณ {myOrder.customerName}
              </p>
            </div>
            <div className={`${myOrder.status === 'READY' ? 'bg-white text-emerald-600' : 'bg-sky-500 text-white'} px-3 py-1.5 rounded-xl font-bold text-xs shadow-md ${myOrder.status !== 'READY' && 'animate-bounce-slow'}`}>
              {myOrder.status === 'PREPARING' ? 'กำลังทำ' : myOrder.status === 'WAITING' ? 'รอรับ' : 'เสร็จสมบูรณ์'}
            </div>
          </div>

          <div className="relative flex justify-between items-start pt-2 px-2 mb-8">
            <div className={`absolute top-6 left-8 right-8 h-1 rounded-full z-0 ${myOrder.status === 'READY' ? 'bg-white/20' : 'bg-slate-100'}`} />
            
            <div 
              className={`absolute top-6 left-8 h-1 rounded-full z-0 transition-all duration-1000 ease-in-out ${
                  myOrder.status === 'READY' ? 'bg-white shadow-[0_0_8px_white]' : 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]'
              }`} 
              style={{ width: `${(getCurrentStageIndex(myOrder.status) / (stages.length - 1)) * 100}%` }}
            />

            {stages.map((stage, idx) => {
              const isActive = getCurrentStageIndex(myOrder.status) >= idx;
              const isCurrent = getCurrentStageIndex(myOrder.status) === idx;

              return (
                <div key={stage.status} className="relative z-10 flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 border-4 ${
                    isCurrent 
                        ? (myOrder.status === 'READY' ? 'bg-white text-emerald-600 border-emerald-100' : 'bg-sky-500 text-white border-white ring-4 ring-sky-100') 
                        : (isActive 
                            ? (myOrder.status === 'READY' ? 'bg-white text-emerald-600 border-white' : 'bg-sky-100 text-sky-600 border-white') 
                            : (myOrder.status === 'READY' ? 'bg-emerald-400 text-white/50 border-emerald-300' : 'bg-slate-50 text-slate-300 border-white'))
                  } shadow-md`}>
                    {stage.icon}
                  </div>
                  <p className={`mt-3 text-[10px] font-bold ${
                      myOrder.status === 'READY' 
                      ? (isActive ? 'text-white' : 'text-emerald-200') 
                      : (isActive ? 'text-sky-600' : 'text-slate-400')
                  }`}>
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
              myOrder.status === 'READY' ? 'bg-white/10 border-white/20' : 'bg-sky-50/50 border-sky-100'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm font-bold text-lg border ${
                myOrder.status === 'READY' ? 'bg-white text-emerald-600 border-white' : 'bg-white text-sky-500 border-sky-50'
            }`}>พ</div>
            <div className="flex-1">
              <p className={`text-[9px] font-bold uppercase tracking-widest ${myOrder.status === 'READY' ? 'text-emerald-100' : 'text-sky-400'}`}>
                  {myOrder.status === 'READY' ? 'เสร็จสมบูรณ์' : 'สถานะปัจจุบัน'}
              </p>
              <p className={`text-xs font-bold font-mali ${myOrder.status === 'READY' ? 'text-white' : 'text-slate-700'}`}>
                {stages[getCurrentStageIndex(myOrder.status)].subtext}
              </p>
            </div>
          </div>

          {myOrder.status === 'READY' && (
             <div className="mt-4 text-center animate-pulse">
                <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-[0.2em]">กำลังกลับสู่หน้าหลักในครู่เดียว...</p>
             </div>
          )}
        </div>
      )}

      {/* Shared Queue Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2rem] p-6 border-2 border-blue-50 shadow-sm">
          <h3 className="text-lg font-mali font-bold text-sky-600 mb-6 flex items-center gap-3">
             <span className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_#fbbf24]"></span>
             กำลังปรุง
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {activeOrders.map(o => (
              <div key={o.id} className="bg-slate-50 border border-slate-100 py-3 rounded-2xl text-center shadow-sm">
                 <span className="text-sm font-bold text-slate-700">#{o.queueNumber}</span>
              </div>
            ))}
            {activeOrders.length === 0 && <p className="col-span-full text-center text-slate-300 text-xs italic py-6">ยังไม่มีคิวที่กำลังปรุงค่ะ</p>}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border-2 border-emerald-50 shadow-sm">
          <h3 className="text-lg font-mali font-bold text-emerald-500 mb-6 flex items-center gap-3">
             <span className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]"></span>
             พร้อมเสิร์ฟ
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {readyOrders.map(o => (
              <div key={o.id} className="bg-emerald-50 border border-emerald-100 py-3 rounded-2xl text-center shadow-md scale-105 animate-pulse">
                 <span className="text-sm font-bold text-emerald-600">#{o.queueNumber}</span>
              </div>
            ))}
            {readyOrders.length === 0 && <p className="col-span-full text-center text-slate-300 text-xs italic py-6">รอสักครู่นะคะ...</p>}
          </div>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-10">
        * ร้านพี่ขวัญเป็นร้านเคลื่อนที่ (Mobile Shop) ไม่มีที่ตั้งถาวร *
      </p>
    </div>
  );
};

export default QueueDisplay;
