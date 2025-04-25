"use client";

import { BASE_URL, fetchProducts } from "@/services/api";
import { Product } from "@/types/products";
import { useState, useEffect } from "react";
import Image from "next/image";
import TableSkeleton from "./TableSkeleton";

const ProductsDetails = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [currentPage, search, sortBy, order]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts({
        page: currentPage,
        search,
        sort_by: sortBy,
        order,
      });
      setProducts(response.data);
      setTotalPages(response.last_page);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };


  console.log("products", products);
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* tag: title */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold">Product Management</h1>
        <h2 className="text-md font-normal">
          Browse, search, sort and manage your product inventor
        </h2>
      </div>
      <>
        <div className="mb-6 pt-10">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-96 p-2 border rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-gray-600">
              Showing {currentPage*20 - 19} to {currentPage*20} of {totalPages * 20} products
            </span>
          </div>

          {loading ? (
            // <div>Loading...</div>
            <TableSkeleton/>
          ) : (
            <>
              <table className="w-full border-collapse bg-white py-10">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-600">
                      PRODUCT NAME {sortBy === "name" && (order === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">BUYING PRICE</th>
                    <th className="p-3 text-left font-medium text-gray-600">SELLING PRICE</th>
                    <th className="p-3 text-left font-medium text-gray-600">STOCK</th>
                    <th className="p-3 text-left font-medium text-gray-600">BRAND</th>
                    <th className="p-3 text-left font-medium text-gray-600">CATEGORY</th>
                    <th className="p-3 text-left font-medium text-gray-600">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products?.map((product) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={`${BASE_URL}/${product.img}`}
                            alt={product?.name}
                            fill
                            sizes="(max-width: 48px) 100vw"
                            className="rounded-full object-cover bg-gray-200"
                            priority={false}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.png';
                            }}
                          />
                        </div>
                        <span>{product.name}</span>
                      </td>
                      <td className="p-3">${product.buying_price}</td>
                      <td className="p-3">${product.selling_price}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3">{product.brand_name}</td>
                      <td className="p-3">{product.category_name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex justify-center gap-2">
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default ProductsDetails;
