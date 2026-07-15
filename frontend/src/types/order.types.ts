import type { ShippingInfo } from "./cartItem.types";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: string;
}

export interface PaymentInfo {
  id: string;
  status: string;
}

export interface Order {
  _id: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  user: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  createdAt?: string;
}

export interface OrdersState {
  loading: boolean;
  orders?: Order[];
  order?: Order | null;
  error?: string | null;
  success?: boolean;
}