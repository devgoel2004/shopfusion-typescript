export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: number;
}

export interface CartState {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo | {};
}