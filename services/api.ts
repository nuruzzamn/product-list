import { ProductListParams, ProductListResponse } from "@/types/products";

const BASE_URL = 'https://laravelpoint.com/api';

export async function fetchProducts(params: ProductListParams): Promise<ProductListResponse> {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params.order) queryParams.append('order', params.order);
  if (params.page) queryParams.append('page', params.page.toString());

  const response = await fetch(`${BASE_URL}/ProductList?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}