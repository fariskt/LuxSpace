import React, { useEffect } from "react";
import "./categories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts , fetchProductByCategory} from "../../../slices/productSlice";

const NewArrival = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error, currentPage } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({page : currentPage, limit: 10}));
    }
  }, [status]);

  if(status === "loading") return <div>Loading...</div>
  if(status === "failed") return <div>Error : {error}</div>


  const handleProduct = (category) => {
    navigate(`/products/${category}`);
    // dispatch(fetchProductByCategory(category))
  };

  const categories = Object.values(
    products.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = item;
      }
      return acc;
    }, {})
  );

  return (
    <>
      <h1 className="text-2xl font-bold my-10 ml-40">NEW PRODUCTS</h1>

      <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-10 md:[90%] w-[80%] mx-auto">
        {categories.map((item, index) => (
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
