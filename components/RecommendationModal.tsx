
import React, { useState } from 'react';
import { getSoyRecommendation } from '../services/geminiService';

interface RecommendationModalProps {
  onClose: () => void;
  onSelect: (flavor: string) => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ onClose, onSelect }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ flavor: string; reason: string } | null>(null);

  const handleAsk = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    const recommendation = await getSoyRecommendation(mood);
    setResult(recommendation);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-sky-900/30 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-blue-50 animate-in zoom-in duration-300">
        <div className="bg-sky-500 p-8 text-white text-center space-y-2">
          <h3 className="text-3xl font-mali font-bold">พี่ขวัญแนะนำ</h3>
          <p className="text-sky-100 text-sm font-medium">ให้ AI ของเราช่วยหาเมนูที่ถูกใจคุณนะคะ</p>
        </div>
        
        <div className="p-8 space-y-6">
          {!result ? (
            <>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">วันนี้รู้สึกอย่างไรบ้างคะ?</label>
                <textarea 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="เช่น อยากทานอะไรสดชื่นๆ หลังเลิกงาน..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-5 py-5 focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none font-medium h-32"
                />
              </div>
              <button 
                onClick={handleAsk}
                disabled={loading || !mood.trim()}
                className="btn-cute w-full bg-sky-500 text-white py-4 rounded-full font-bold shadow-xl hover:bg-sky-600 disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
              >
                {loading ? (
                  <><span className="animate-spin">🌀</span><span>กำลังประมวลผล...</span></>
                ) : (
                  <><span>✨</span><span>หาเมนูที่ใช่</span></>
                )}
              </button>
            </>
          ) : (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <p className="text-sky-400 text-xs font-bold uppercase tracking-widest">แนะนำเมนูนี้เลยค่ะ!</p>
                <h4 className="text-3xl font-mali font-bold text-sky-600">{result.flavor}</h4>
              </div>
              <div className="bg-sky-50 p-6 rounded-[2rem] border-2 border-sky-100 text-left relative">
                <span className="absolute -top-3 left-6 bg-white px-3 text-[10px] font-bold text-sky-400 uppercase">เพราะว่า</span>
                <p className="text-slate-600 leading-relaxed font-medium italic">
                  "{result.reason}"
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onSelect(result.flavor)}
                  className="btn-cute bg-sky-500 text-white py-3.5 rounded-full font-bold hover:bg-sky-600"
                >
                  เลือกเมนูนี้
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="btn-cute bg-white border-2 border-sky-200 text-sky-600 py-3.5 rounded-full font-bold hover:bg-sky-50"
                >
                  ถามใหม่อีกที
                </button>
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecommendationModal;
