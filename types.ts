
export type OrderStatus = 'PREPARING' | 'WAITING' | 'READY';
export type AppView = 'MENU' | 'STATUS' | 'ADMIN' | 'PAYMENT' | 'CART';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'เครื่องดื่มร้อน' | 'เครื่องดื่มเย็น' | 'ของทานเล่น';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  queueNumber: number;
  timestamp: number;
  customerName: string;
  phoneNumber: string; // Required phone number
  paymentSlip?: string; // Base64 string of the uploaded image
}

export interface AppState {
  orders: Order[];
  currentOrder: Order | null;
  cart: CartItem[];
  isQueueLocked: boolean;
  currentView: AppView;
}
