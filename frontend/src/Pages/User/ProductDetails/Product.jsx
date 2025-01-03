import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../../../context/CartContext";
import ProductSidebar from "./ProductSidebar";
import {
  fetchProductByCategory,
  fetchProducts,
  setCurrentPage,
} from "../../../slices/productSlice";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const Product = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart } = useContext(CartContext);

  const { products, filteredProduct, productLength, currentPage, totalPages } =
    useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    category: category || "all",
    price: "",
    color: "",
  });

  useEffect(() => {
    if (category && category !== "all") {
      dispatch(fetchProductByCategory(category));
    } else {
      dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    }
  }, [category, currentPage, dispatch]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    if (filterType === "category") {
      navigate(value === "all" ? "/products" : `/products/${value}`);
    }
  };

  const applyFilters = (products) => {
    return products
      .filter(
        (item) =>
          !filters.color ||
          item.color?.toLowerCase() === filters.color.toLowerCase()
      )
      .sort((a, b) => {
        if (filters.price === "low-to-high") return a.price - b.price;
        if (filters.price === "high-to-low") return b.price - a.price;
        return 0;
      });
  };

  const displayedProducts = applyFilters(
    category === "all" ? products : filteredProduct
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages && productLength > 10) {
      dispatch(setCurrentPage(page));
    }
  };

  console.log(filteredProduct);

  return (
    <div className="mt-20 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <ProductSidebar
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6 w-[80%]">
          {displayedProducts.length > 0 && (
            <>
              <h1 className="absolute ml-4">
                Showing {(currentPage - 1) * 10 + 1}-
                {Math.min(currentPage * 10, productLength)} of {productLength}{" "}
                results
              </h1>
              <div className="absolute right-7 top-24">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  productLength={productLength}
                  handlePageChange={handlePageChange}
                />
              </div>
            </>
          )}
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="mt-5 ml-10">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
