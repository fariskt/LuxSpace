import React, { useEffect } from "react";
import "./categories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchProducts } from "../../../features/productSlice";

const NewArrival = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, currentPage,categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllCategories())
    dispatch(fetchProducts({ page: currentPage, limit: 10, name: "", category: "" }));    
  }, []);

  const handleProduct = (category) => {
    navigate(`/products/${category}`);
  };

  const categoriesWithProducts = categories.map((category) => ({
    ...category,
    isPresentInProducts: products.some(product => product.category === category),
  }));
  

  

  return (
    <>
      <h1 className="text-2xl font-bold my-10 ml-40">NEW PRODUCTS</h1>

      <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-10 md:[90%] w-[80%] mx-auto">
        {categoriesWithProducts?.map((item, index) => (
          <div key={index} className="arr-div">
            <img
              src={item.img}
              alt="image"
              className="arrival-img"
              onClick={() => handleProduct(item.category)}
            />
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArrival;
