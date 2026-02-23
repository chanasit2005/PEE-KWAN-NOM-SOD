
import React from 'react';
import { CONTACT_PHONE, SHOP_NAME, SHOP_SUBTITLE } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-10 text-center shadow-sm border-4 border-blue-50">
        <div className="w-20 h-20 bg-sky-400 rounded-[2rem] flex items-center justify-center text-white font-bold text-4xl shadow-xl mx-auto mb-6">พ</div>
        <h2 className="text-3xl font-mali font-bold text-sky-600 mb-1">{SHOP_NAME}</h2>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">{SHOP_SUBTITLE}</p>
        
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-3 shadow-sm border border-sky-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">โทรสั่งจอง/สอบถาม</p>
            <a href={`tel:${CONTACT_PHONE}`} className="text-2xl font-bold text-sky-600 mt-1 hover:underline">{CONTACT_PHONE}</a>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-3 shadow-sm border border-sky-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ข้อมูลที่ตั้ง</p>
            <p className="text-slate-600 font-bold font-mali mt-2 max-w-xs">
              ร้านเราเป็นร้านเคลื่อนที่ (Mobile Cart) <br/> 
              ไม่มีที่ตั้งถาวรค่ะ ติดตามจุดจอดได้ทางเพจนะคะ!
            </p>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 font-medium">เปิดให้บริการทุกวัน 17.00 - 22.00 น.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
