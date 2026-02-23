
import React, { useState } from 'react';
import { CartItem } from '../types';
import { PROMPT_PAY_ID, SHOP_NAME } from '../constants';

interface PaymentPageProps {
  cart: CartItem[];
  onComplete: (name: string, phone: string, slip?: string) => void;
  isLocked: boolean;
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ cart, onComplete, isLocked, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [slip, setSlip] = useState<string | null>(null);
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSlip(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    if (!name.trim()) return alert("กรุณาระบุชื่อของคุณด้วยนะคะ");
    if (!phone.trim() || phone.length < 9) return alert("กรุณาระบุเบอร์โทรศัพท์ที่ติดต่อได้ค่ะ");
    if (!slip) return alert("อย่าลืมแนบสลิปเพื่อยืนยันการโอนเงินนะคะ");
    onComplete(name, phone, slip);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-blue-50 rounded-full text-sky-600 hover:bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-mali font-bold text-sky-600">ชำระเงิน</h2>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border-4 border-blue-50 space-y-8">
        {/* QR Section */}
        <div className="bg-sky-500 rounded-[2rem] p-6 text-white text-center space-y-4 shadow-inner">
          <div className="bg-white p-3 inline-block rounded-3xl shadow-md">
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${PROMPT_PAY_ID}`} alt="PromptPay QR" className="w-40 h-40" />
          </div>
          <div>
            <p className="text-xs opacity-80 font-bold uppercase tracking-widest">สแกนชำระเงินผ่าน PromptPay</p>
            <p className="text-2xl font-bold mt-1 tracking-wider">{PROMPT_PAY_ID}</p>
            <p className="text-sm font-mali font-bold">{SHOP_NAME}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl flex justify-between items-center">
             <span className="font-bold">ยอดที่ต้องโอน:</span>
             <span className="text-2xl font-bold">฿{total}</span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">ชื่อเรียกคิว</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-sky-100 outline-none transition-all font-bold"
              placeholder="ระบุชื่อของคุณ..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">เบอร์โทรศัพท์ติดต่อ</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-sky-100 outline-none transition-all font-bold"
              placeholder="08X-XXX-XXXX"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">หลักฐานการโอน (สลิป)</label>
            <div className={`relative border-4 border-dashed rounded-[2rem] p-6 text-center transition-all cursor-pointer ${
              slip ? 'border-sky-300 bg-sky-50' : 'border-slate-100 hover:border-sky-200 bg-slate-50'
            }`}>
              {slip ? (
                <div className="relative">
                  <img src={slip} alt="Payment Slip" className="max-h-48 mx-auto rounded-2xl shadow-sm" />
                  <button onClick={() => setSlip(null)} className="absolute -top-3 -right-3 bg-rose-500 text-white rounded-full p-1 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-sky-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-sm text-slate-400 font-bold">แตะเพื่ออัปโหลดสลิป</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleFinish}
          disabled={isLocked}
          className={`btn-cute w-full py-5 rounded-[2rem] font-bold text-white text-lg transition-all ${
            isLocked ? 'bg-slate-300 shadow-none cursor-not-allowed opacity-50' : 'bg-sky-500 hover:bg-sky-600'
          }`}
        >
          {isLocked ? 'ขออภัย ร้านปิดรับคิวชั่วคราว' : 'ยืนยันสั่งซื้อและรับคิว'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
