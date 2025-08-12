export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
} 