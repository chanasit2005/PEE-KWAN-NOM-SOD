
import React, { useState, useEffect, useRef } from 'react';
import { Order, MenuItem, CartItem, OrderStatus, AppView } from './types';
import { MENU_ITEMS, SHOP_NAME, SHOP_SUBTITLE, ADMIN_PASSCODE } from './constants';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard';
import QueueDisplay from './components/QueueDisplay';
import AdminPanel from './components/AdminPanel';
import PaymentPage from './components/PaymentPage';
import CartPage from './components/CartPage';
import RecommendationModal from './components/RecommendationModal';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isQueueLocked, setIsQueueLocked] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('MENU');
  const [myOrder, setMyOrder] = useState<Order | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);
  
  // Admin Authentication & Notifications
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showNewOrderToast, setShowNewOrderToast] = useState(false);
  const prevOrdersCount = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Refs for scrolling to categories
  const categoryRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    'เครื่องดื่มร้อน': useRef<HTMLElement>(null),
    'เครื่องดื่มเย็น': useRef<HTMLElement>(null),
    'ของทานเล่น': useRef<HTMLElement>(null),
  };

  // Initial Load
  useEffect(() => {
    const savedOrders = localStorage.getItem('pkw_orders_v5');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      setOrders(parsed);
      prevOrdersCount.current = parsed.length;
    }

    const savedMyOrder = localStorage.getItem('pkw_my_order_v5');
    if (savedMyOrder) setMyOrder(JSON.parse(savedMyOrder));

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Prepare notification sound
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  }, []);

  // Save Orders
  useEffect(() => {
    localStorage.setItem('pkw_orders_v5', JSON.stringify(orders));
  }, [orders]);

  // Admin New Order Monitor
  useEffect(() => {
    if (orders.length > prevOrdersCount.current) {
      if (isAdminAuthenticated && currentView === 'ADMIN') {
        setShowNewOrderToast(true);
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
        setTimeout(() => setShowNewOrderToast(false), 5000);
      }
    }
    prevOrdersCount.current = orders.length;
  }, [orders.length, isAdminAuthenticated, currentView]);

  // Save MyOrder
  useEffect(() => {
    if (myOrder) {
      localStorage.setItem('pkw_my_order_v5', JSON.stringify(myOrder));
    } else {
      localStorage.removeItem('pkw_my_order_v5');
    }
  }, [myOrder]);

  // Monitor Order Changes for Reset Logic (Only for Customers in STATUS view)
  useEffect(() => {
    if (myOrder) {
      const serverOrder = orders.find(o => o.id === myOrder.id);
      if (serverOrder && serverOrder.status !== myOrder.status) {
        setMyOrder(serverOrder);

        // Notify if waiting
        if (serverOrder.status === 'WAITING') {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("เครื่องดื่มเสร็จแล้วค่ะ!", { body: `คิว #${serverOrder.queueNumber} พร้อมรับที่หน้ารถพี่ขวัญแล้วน้า` });
          }
          setShowReadyModal(true);
        }

        // Return to original state IMMEDIATELY if READY (Only if not admin and in status view)
        if (serverOrder.status === 'READY' && currentView === 'STATUS') {
          setTimeout(() => {
            setMyOrder(null);
            setCurrentView('MENU');
            localStorage.removeItem('pkw_my_order_v5');
          }, 3000); // Give user time to see the READY state
        }
      }
    }
  }, [orders, myOrder, currentView]);

  const addToCart = (item: MenuItem, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const finalizeOrder = (customerName: string, phoneNumber: string, slipBase64?: string) => {
    if (isQueueLocked) {
      alert("ขออภัย ขณะนี้ร้านปิดรับคิวชั่วคราว");
      return;
    }
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'PREPARING',
      queueNumber: orders.length + 101,
      timestamp: Date.now(),
      customerName,
      phoneNumber,
      paymentSlip: slipBase64
    };
    setOrders(prev => [...prev, newOrder]);
    setMyOrder(newOrder);
    setCart([]);
    setShowSuccessModal(true);
    setCurrentView('STATUS');

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`เย้! สั่งซื้อ ${SHOP_NAME} สำเร็จ`, { body: `คุณได้คิวที่ #${newOrder.queueNumber} รอสักครู่นะคะ` });
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAdminAuth = () => {
    if (adminInput === ADMIN_PASSCODE) {
      setIsAdminAuthenticated(true);
      setShowLogoutToast(false);
    } else {
      alert("รหัสผ่านไม่ถูกต้อง");
      setAdminInput('');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminInput('');
    setShowLogoutToast(true);
    setTimeout(() => setShowLogoutToast(false), 3000);
  };

  const scrollToCategory = (cat: string) => {
    const ref = categoryRefs[cat];
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 120, // Adjusted offset for layout
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf3] text-slate-700 flex flex-col pb-24 relative overflow-x-hidden">
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 p-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-2">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentView('MENU')}
          >
            <div className="w-10 h-10 bg-sky-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md">พ</div>
            <div>
              <h1 className="text-xl font-mali font-bold text-sky-600 leading-tight">{SHOP_NAME}</h1>
              <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">{SHOP_SUBTITLE}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentView('CART')} 
            className="relative p-3 bg-white text-sky-500 rounded-2xl border border-sky-50 hover:bg-sky-50 transition-colors shadow-sm"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-8 w-full animate-in fade-in duration-500">
        {currentView === 'MENU' && (
          <div className="space-y-10">
            {/* AI Recommendation Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
               <div>
                  <h2 className="text-4xl font-mali font-bold text-sky-600 mb-1">ยินดีต้อนรับค่ะ</h2>
                  <p className="text-slate-400 text-sm font-medium">นมสดและขนมปังหอมๆ พร้อมเสิร์ฟแล้ววันนี้</p>
               </div>
               <button 
                onClick={() => setShowRecommendation(true)} 
                className="btn-cute bg-sky-500 text-white px-8 py-3.5 rounded-full font-bold text-base flex items-center gap-3 hover:bg-sky-600 shadow-[0_4px_0px_#0369a1] active:translate-y-1 active:shadow-none"
               >
                 <span>✨</span> ให้ AI ช่วยแนะนำเมนู
               </button>
            </div>

            {/* Category Navigation */}
            <div className="bg-white/50 backdrop-blur-sm p-3 rounded-3xl border border-sky-100 flex justify-center gap-2 overflow-x-auto no-scrollbar py-4 shadow-sm">
              {['เครื่องดื่มร้อน', 'เครื่องดื่มเย็น', 'ของทานเล่น'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className="whitespace-nowrap px-6 py-2.5 rounded-2xl bg-white text-sky-600 text-xs font-bold border border-sky-100 shadow-sm hover:bg-sky-50 hover:border-sky-300 transition-all active:scale-95"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-16">
              {(['เครื่องดื่มร้อน', 'เครื่องดื่มเย็น', 'ของทานเล่น'] as const).map(cat => (
                <section key={cat} ref={categoryRefs[cat]} className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-mali font-bold text-slate-700">{cat}</h3>
                    <div className="h-0.5 flex-1 bg-sky-100 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MENU_ITEMS.filter(item => item.category === cat).map(item => (
                      <MenuCard key={item.id} item={item} onAdd={addToCart} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {currentView === 'CART' && (
          <CartPage 
            cart={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onProceed={() => setCurrentView('PAYMENT')}
            onBack={() => setCurrentView('MENU')}
          />
        )}

        {currentView === 'STATUS' && (
          <QueueDisplay orders={orders} myOrder={myOrder} />
        )}

        {currentView === 'PAYMENT' && (
          <PaymentPage cart={cart} onComplete={finalizeOrder} isLocked={isQueueLocked} onBack={() => setCurrentView('CART')} />
        )}

        {currentView === 'ADMIN' && (
          !isAdminAuthenticated ? (
            <div className="max-w-md mx-auto mt-20 relative">
              {showLogoutToast && (
                <div className="absolute -top-16 left-0 right-0 animate-in slide-in-from-top-4 fade-in duration-500">
                  <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-6 py-3 rounded-2xl text-center font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                    <span>👋</span> ออกจากระบบเรียบร้อยแล้วค่ะ!
                  </div>
                </div>
              )}
              <div className="p-8 bg-white rounded-[2.5rem] border border-sky-50 shadow-sm text-center">
                <h2 className="text-2xl font-mali font-bold text-sky-600 mb-6">ผู้ดูแลระบบ</h2>
                <input 
                  type="password" 
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-sky-50 outline-none mb-6 text-center font-bold tracking-[0.2em]"
                />
                <button 
                  onClick={handleAdminAuth}
                  className="btn-cute w-full bg-sky-500 text-white py-4 rounded-2xl font-bold hover:bg-sky-600 shadow-[0_4px_0px_#0369a1]"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              {showNewOrderToast && (
                <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right-10 fade-in duration-500">
                  <div className="bg-white border-2 border-sky-100 rounded-3xl p-4 shadow-xl flex items-center gap-4 max-w-xs">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 animate-bell">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                       </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-sky-600 font-mali">ออเดอร์ใหม่เข้าแล้วจ้า!</p>
                      <p className="text-[10px] text-slate-400 font-medium">แวะตรวจสอบรายการเลยค่ะ ✨</p>
                    </div>
                    <button onClick={() => setShowNewOrderToast(false)} className="text-slate-300 hover:text-slate-500 transition-colors">✕</button>
                  </div>
                </div>
              )}
              <AdminPanel 
                orders={orders} 
                isLocked={isQueueLocked} 
                onToggleLock={() => setIsQueueLocked(!isQueueLocked)}
                onUpdateStatus={updateOrderStatus}
                onLogout={handleLogout}
              />
            </div>
          )
        )}
      </main>

      <Navbar activeView={currentView} setView={setCurrentView} />

      {showRecommendation && (
        <RecommendationModal 
          onClose={() => setShowRecommendation(false)} 
          onSelect={(flavorName) => {
            const item = MENU_ITEMS.find(i => i.name.includes(flavorName));
            if (item) addToCart(item, 1);
            setShowRecommendation(false);
          }}
        />
      )}

      {/* Success Modal - Pop-up after successful order */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sky-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-12 text-center shadow-2xl max-w-sm w-full border-8 border-sky-50 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-3xl font-mali font-bold text-sky-600 mb-2">สั่งซื้อสำเร็จแล้วน้า!</h2>
            <p className="text-slate-500 font-medium mb-8">
              พี่ขวัญได้รับออเดอร์แล้วค่ะ <br/> 
              รอรับคิวที่ <span className="text-sky-500 font-bold">#{myOrder?.queueNumber}</span> ได้เลย!
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="btn-cute w-full bg-sky-500 text-white py-4 rounded-3xl font-bold text-lg hover:bg-sky-600 shadow-[0_4px_0px_#0369a1] active:translate-y-1 active:shadow-none"
            >
              รับทราบค่ะ ✨
            </button>
          </div>
        </div>
      )}

      {/* Ready Modal - Pop-up when order is ready to serve */}
      {showReadyModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-amber-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-12 text-center shadow-2xl max-w-sm w-full border-8 border-amber-50 animate-in zoom-in duration-500 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-sky-100 rounded-full opacity-50"></div>
            
            <div className="w-24 h-24 bg-amber-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-amber-50 animate-cute-bag">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
            </div>
            
            <h2 className="text-3xl font-mali font-bold text-amber-600 mb-2">ออเดอร์พร้อมแล้วจ้า!</h2>
            <div className="bg-amber-50 rounded-2xl py-3 px-6 inline-block mb-6 border border-amber-100">
              <span className="text-amber-600 font-bold text-2xl font-mali">คิวที่ #{myOrder?.queueNumber}</span>
            </div>
            
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              เครื่องดื่มและขนมปังหอมๆ <br/>
              <span className="text-sky-500 font-bold">พร้อมเสิร์ฟที่หน้ารถพี่ขวัญแล้วน้า</span> <br/>
              แวะมารับได้เลยค่ะ! ✨
            </p>
            
            <button 
              onClick={() => setShowReadyModal(false)}
              className="btn-cute w-full bg-amber-500 text-white py-4 rounded-3xl font-bold text-lg hover:bg-amber-600 shadow-[0_4px_0px_#b45309] active:translate-y-1 active:shadow-none"
            >
              กำลังไปรับค่ะ 🏃‍♀️💨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
