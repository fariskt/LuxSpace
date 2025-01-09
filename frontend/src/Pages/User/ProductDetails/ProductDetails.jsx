import React, { useContext, useEffect } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../features/productSlice";
import { addToCart } from "../../../features/cartSlice";
import { addToWishlist } from "../../../features/wishlistSlice";

const ProductDetails = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);
  const { productById } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  const handleAddCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Product added to the cart");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist({ userId: authUser?._id, productId: product?._id }))
      .unwrap()
      .then(() => {
        toast.success("Item added to the wishlist");
      })
      .catch(() => toast.error("item already in wishlist"));
  };

  return (
    <div className="flex justify-between pt-[150px] w-[90%] mx-auto">
      <div className="max-w-[1200px] max-h-[500px] border border-gray-500 rounded-md">
        <img
          src={productById?.img}
          alt="product image"
          className="w-[1100px] h-[400px] object-contain mt-10 hover:scale-105 duration-150"
        />
      </div>
      <div className="flex flex-col ml-14 gap-3 w-[60%]">
        <h1 className="text-4xl font-bold">{productById.name}</h1>
        <div className="flex items-center gap-2 pb-4 border-b">
          <strike className="text-gray-400 text-lg font-bold">
            ₹{Math.trunc(productById.price) + 120}.00
          </strike>
          <h3 className="text-xl font-bold">₹{productById.price}</h3>
        </div>
        <p className="text-green-700">
          {productById.stock < 1 ? "No stock" : "✅ In stock"}
        </p>
        <p className="w-[90%]">{productById?.description}</p>
        <h5>color : {productById.color}</h5>
        <div className="flex items-center gap-4 my-4 w-full">
          <div>
            <button
              className="bg-black text-white py-3 w-[240px]"
              onClick={() => handleAddCart(productById)}
            >
              ADD TO CART
            </button>
          </div>
          <div>
            <button
              className="p-[12px] border text-2xl"
              onClick={() => handleAddToWishlist(productById)}
            >
              <MdOutlineFavoriteBorder />
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center border mt-2 border-gray-300 rounded-lg">
          <p className="text-4xl m-2 pl-2">
            <TbTruckDelivery />
          </p>
          <p className="border-l py-4 pl-4">
            Experience fast, secure delivery you can trust, every time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
