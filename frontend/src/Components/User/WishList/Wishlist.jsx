import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserWishList,
  removeWishlist,
} from "../../../features/wishlistSlice";
import { addToCart } from "../../../features/cartSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { authUser, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && accessToken) {
      dispatch(fetchUserWishList(authUser?._id));
    }
  }, [authUser?._id]);

  const handleAddCart = (id) => {
    dispatch(addToCart({ productId: id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Item added to the cart");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleRemove = (id) => {
    dispatch(removeWishlist({ userId: authUser?._id, productId: id }))
      .unwrap()
      .then(() => {
        dispatch(fetchUserWishList(authUser?._id));
      });
  };

  return (
    <div className="mt-12 py-8 min-h-screen md:w-4/5 lg:w-3/5 mx-auto bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-2xl p-8">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 py-4 mb-8 border-b-4 border-gray-500">
        Wishlist
      </h1>
      {wishlist && wishlist.length ? (
        wishlist.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300 mb-6 "
          >
            <img
              src={item.productId.img}
              className="w-[150px] h-[150px] object-cover rounded-xl "
              alt="Product image"
            />
            <div className="flex flex-col md:flex-grow gap-4">
              <p className="text-lg text-gray-600 font-semibold">
                Category:{" "}
                <span className="text-gray-700">
                  {item.productId.category}
                </span>
              </p>
              <p className="text-xl text-gray-800 font-bold">
                {item.productId.name}
              </p>
              <div className="flex gap-4">
                <button
                  title="Delete"
                  className="text-base bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
                <button
                  className="text-base bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors"
                  onClick={() => handleAddCart(item.productId._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{item.productId.price}.00
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl text-gray-700 mt-16 font-medium">
          Your wishlist is empty. Start adding items!
        </p>
      )}
    </div>
  );
};

export default Wishlist;
