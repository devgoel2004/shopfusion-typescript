export interface ProductImage {
  public_id: string;
  url: string;
}

export interface Review {
  _id?: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: ProductImage[];
  category: string;
  stock: number;
  numOfReviews: number;
  reviews: Review[];
  user: string;
  createdAt?: string;
}

export interface ProductsState {
  loading: boolean;
  products: Product[];
  error?: string | null;
  productsCount?: number;
  resultPerPage?: number;
  filteredProductsCount?: number;
}

export interface ProductDetailsState {
  loading: boolean;
  product?: Product | null;
  error?: string | null;
}

export interface NewReviewState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

export interface NewProductState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

export interface UpdateProductState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

export interface DeleteProductState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}