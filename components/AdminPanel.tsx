
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface AdminPanelProps {
  orders: Order[];
  isLocked: boolean;
  onToggleLock: () => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ orders, isLocked, onToggleLock, onUpdateStatus, onLogout }) => {
  const [selectedSlip, setSelectedSlip] = useState<string | null>(null);
  const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-sky-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-mali font-bold text-sky-600">แผงควบคุมแอดมิน</h2>
          <p className="text-slate-400 text-sm">จัดการคิวและตรวจสอบสลิป</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleLock}
            className={`btn-cute px-6 py-2.5 rounded-full font-bold text-white text-xs shadow-md transition-all ${
              isLocked ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          >
            {isLocked ? '🔓 เปิดรับคิว' : '🔒 ปิดรับคิว'}
          </button>
          <button 
            onClick={onLogout}
            className="btn-cute px-6 py-2.5 rounded-full font-bold text-slate-400 bg-slate-50 text-xs shadow-sm hover:bg-slate-100 border border-slate-100"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-sky-50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sky-50/50 text-[10px] font-bold text-sky-500 uppercase tracking-widest border-b border-sky-50">
                <th className="px-6 py-5">คิว #</th>
                <th className="px-6 py-5">ข้อมูลลูกค้า</th>
                <th className="px-6 py-5">รายการ</th>
                <th className="px-6 py-5">สลิป</th>
                <th className="px-6 py-5">สถานะ</th>
                <th className="px-6 py-5 text-right">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              {sortedOrders.map(order => (
                <tr key={order.id} className="text-xs hover:bg-sky-50/20 transition-colors">
                  <td className="px-6 py-6 font-bold text-sky-600">#{order.queueNumber}</td>
                  <td className="px-6 py-6">
                    <div className="font-bold text-slate-800">{order.customerName}</div>
                    <div className="text-[10px] text-sky-300 font-bold">{order.phoneNumber}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{new Date(order.timestamp).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {order.paymentSlip ? (
                      <button 
                        onClick={() => setSelectedSlip(order.paymentSlip!)}
                        className="text-[10px] bg-sky-50 text-sky-500 px-3 py-1.5 rounded-full font-bold hover:bg-sky-100 border border-sky-100"
                      >
                        ดูสลิป
                      </button>
                    ) : (
                      <span className="text-[10px] text-rose-400 font-bold bg-rose-50 px-3 py-1.5 rounded-full">ไม่มีสลิป</span>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase ${
                      order.status === 'PREPARING' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
                      order.status === 'WAITING' ? 'bg-sky-50 text-sky-500 border border-sky-100' : 'bg-emerald-50 text-emerald-500 border border-emerald-100'
                    }`}>
                      {order.status === 'PREPARING' ? 'กำลังเตรียม' : order.status === 'WAITING' ? 'รอรับของ' : 'เสร็จแล้ว'}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === 'PREPARING' && (
                        <button onClick={() => onUpdateStatus(order.id, 'WAITING')} className="btn-cute bg-sky-500 text-white px-4 py-2 rounded-full text-[9px] font-bold">แจ้งรอรับ</button>
                      )}
                      {order.status === 'WAITING' && (
                        <button onClick={() => onUpdateStatus(order.id, 'READY')} className="btn-cute bg-emerald-500 text-white px-4 py-2 rounded-full text-[9px] font-bold">ส่งมอบแล้ว</button>
                      )}
                      {order.status === 'READY' && <span className="text-[9px] text-slate-300 font-bold">เสร็จสมบูรณ์</span>}
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-300 italic font-medium">ยังไม่มีรายการสั่งซื้อค่ะ</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSlip && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setSelectedSlip(null)}>
          <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl relative max-w-sm w-full animate-in zoom-in duration-300">
            <button className="absolute -top-4 -right-4 bg-white text-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg border border-slate-100">✕</button>
            <img src={selectedSlip} className="w-full h-auto rounded-2xl max-h-[70vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
