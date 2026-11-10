import React, { useContext, useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../features/productSlice";
import { addToCart, fetchUserCart } from "../../../features/cartSlice";
import { addToWishlist, fetchUserWishList } from "../../../features/wishlistSlice";
import { IoIosHeart } from "react-icons/io";
import { ColorRing, Oval } from "react-loader-spinner";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.auth);
  const { cartLoading, cart } = useSelector((state) => state.cart);
  const { wishlistLoading, wishlist} = useSelector((state) => state.wishlist);
  
  const { productById, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  const isInCart = cart?.some(
    (item) => item?.productId?._id === productById?._id
  );
  const isInWishList = wishlist?.some(
    (item) => item?.productId?._id === productById?._id
  );

  const handleAddCart = (product) => {
    if (authUser && !isInCart) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }))
        .unwrap()
        .then(() => {
          dispatch(fetchUserCart(authUser?._id));
          toast.success("Product added to the cart");
        });
    } else if (!authUser) {
      toast.error("Please login to the account");
    }
  };

  const handleAddToWishlist = (product) => {
    if (authUser) {
      dispatch(
        addToWishlist({ userId: authUser?._id, productId: product?._id })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchUserWishList(authUser?._id))
          toast.success("Item added to the wishlist");
        })
        .catch(() => toast.error("Item already in wishlist"));
    } else {
      toast.error("Please login to account");
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-between pt-[150px] w-[90%] mx-auto min-h-screen">
      {loading ? (
        <div className="loader-container">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <div className="md:max-w-[1200px] md:max-h-[500px] border border-gray-500 rounded-md">
            <img
              src={productById?.img}
              alt="product image"
              className="md:w-[1100px] md:h-[400px] object-contain mt-10 hover:scale-105 duration-150"
            />
          </div>
          <div className="flex flex-col md:ml-14 gap-3 md:w-[60%]">
            <h1 className="text-xl md:text-4xl font-bold mt-8">
              {productById.name}
            </h1>
            <div className="flex text-left gap-2 pb-4 border-b">
              <strike className="text-gray-400 text-lg font-bold">
                ₹{Math.trunc(productById.price) + 120}.00
              </strike>
              <h3 className="text-xl font-bold text-left">
                ₹{productById.price}
              </h3>
            </div>
            <p className="text-green-700">
              {productById.stock < 1 ? "No stock" : "✅ In stock"}
            </p>
            <p className="w-[90%]">{productById?.description}</p>
            <h5>Color: {productById.color}</h5>
            <div className="flex items-center gap-4 my-4 w-full">
              <div>
                <Link to={isInCart && "/cart"}>
                  <button
                    className={`${
                      cartLoading
                        ? "bg-gray-800 text-white"
                        : "bg-black text-white"
                    } py-3 w-[240px]`}
                    onClick={() => handleAddCart(productById)}
                  >
                    {cartLoading ? (
                      <span className="flex justify-center">
                        <Oval
                          visible={true}
                          height="25"
                          width="40"
                          color="white"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          strokeWidth="5"
                        />
                      </span>
                    ) : isInCart ? (
                      "View in Cart"
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </Link>
              </div>
              <div>
                {wishlistLoading ? (
                  <span className="flex justify-center border border-gray-900 h-12 w-12 pt-3">
                    <Oval
                      visible={true}
                      height="25"
                      width="40"
                      color="black"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      strokeWidth="5"
                    />
                  </span>
                ) : (
                  <button
                    className="p-[12px] border text-2xl"
                    onClick={() => handleAddToWishlist(productById)}
                  >
                    {isInWishList ? <IoIosHeart/> : <MdOutlineFavoriteBorder /> }
                  </button>
                )}
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
        </>
      )}
    </div>
  );
};

export default ProductDetails;
