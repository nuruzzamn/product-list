export interface Product {
    id: number;
    name: string;
    buying_price: string;
    selling_price: string;
    stock: number;
    img: string;
    brand_name: string;
    category_name: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ProductListResponse {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  export interface ProductListParams {
    search?: string;
    sort_by?: string;
    order?: 'asc' | 'desc';
    page?: number;
  }