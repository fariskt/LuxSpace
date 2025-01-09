import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSidebar from "./ProductSidebar";
import { fetchProducts, setCurrentPage } from "../../../features/productSlice";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { ColorRing } from "react-loader-spinner";

const Product = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    category: category || "all",
    price: "",
    color: "",
  });

  const { products, productLength, currentPage, totalPages, loading } =
    useSelector((state) => state.products);

  useEffect(() => {
    const categoryFilter =
      filters.category && filters.category !== "all" ? filters.category : "";
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 10,
        category: categoryFilter,
        name: searchValue,
      })
    );

    window.scrollTo(0, 0);
  }, [filters.category, currentPage, searchValue]);

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
          !searchValue.trim() ||
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
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

  const displayedProducts = applyFilters(products);

  const handlePageChange = (page) => {
    if (productLength > 10) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="mt-20 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <ProductSidebar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleFilterChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          currentPage={currentPage}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6 w-[80%]">
          {displayedProducts.length > 0 ? (
            <>
              <h1 className="absolute ml-4">
                Showing {(currentPage - 1) * 10 + 1}-{" "}
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
              {loading ? (
                <div className="loader-container">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                displayedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </>
          ) : (
            <p className="mt-5 ml-10">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
