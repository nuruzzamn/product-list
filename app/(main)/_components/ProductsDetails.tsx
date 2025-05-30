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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold">Product Management</h1>
        <h2 className="text-sm sm:text-md font-normal">
          Browse, search, sort and manage your product inventor
        </h2>
      </div>
      <>
        <div className="mb-6 pt-6 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-full sm:w-96 p-2 border rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-sm sm:text-base text-gray-600">
              Showing {currentPage*20 - 19} to {currentPage*20} of {totalPages * 20} products
            </span>
          </div>

          {loading ? (
            <TableSkeleton/>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white py-10 min-w-[800px]">
                  <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("name");
                            setOrder(sortBy === "name" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          PRODUCT NAME {sortBy === "name" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("buying_price");
                            setOrder(sortBy === "buying_price" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          BUYING PRICE {sortBy === "buying_price" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("selling_price");
                            setOrder(sortBy === "selling_price" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          SELLING PRICE {sortBy === "selling_price" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("stock");
                            setOrder(sortBy === "stock" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          STOCK {sortBy === "stock" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("brand_name");
                            setOrder(sortBy === "brand_name" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          BRAND {sortBy === "brand_name" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("category_name");
                            setOrder(sortBy === "category_name" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          CATEGORY {sortBy === "category_name" && (order === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="p-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSortBy("status");
                            setOrder(sortBy === "status" && order === "asc" ? "desc" : "asc");
                          }}
                        >
                          STATUS {sortBy === "status" && (order === "asc" ? "↑" : "↓")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products?.map((product) => (
                        <tr key={product.id} className="border-t hover:bg-gray-50">
                          <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
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
                            <span className="text-sm sm:text-base">{product.name}</span>
                          </td>
                          <td className="p-2 sm:p-3 text-sm sm:text-base">${product.buying_price}</td>
                          <td className="p-2 sm:p-3 text-sm sm:text-base">${product.selling_price}</td>
                          <td className="p-2 sm:p-3 text-sm sm:text-base">{product.stock}</td>
                          <td className="p-2 sm:p-3 text-sm sm:text-base">{product.brand_name}</td>
                          <td className="p-2 sm:p-3 text-sm sm:text-base">{product.category_name}</td>
                          <td className="p-2 sm:p-3">
                            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
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
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center gap-2">
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 border rounded text-sm sm:text-base disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 border rounded text-sm sm:text-base disabled:opacity-50"
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
