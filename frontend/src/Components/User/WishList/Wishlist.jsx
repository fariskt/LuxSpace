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
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(fetchUserWishList(authUser?._id));
    }
  }, []);

  const handleAddCart = (product) => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Item added to the cart");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleRemove = (product) => {
    dispatch(
      removeWishlist({ userId: authUser._id, productId: product._id })
    ).unwrap().then(() => {
      dispatch(fetchUserWishList(authUser?._id));
    });
  };

  return (
    <div className="mt-28 pt-4 min-h-screen w-1/2 mx-auto rounded-md border p-2">
      <h1 className="text-center text-2xl py-4">WishList</h1>
      {wishlist && wishlist.length
        ? wishlist.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-center gap-8 py-4 items-center  bg-gray-200  border border-gray-50"
            >
              <img
                src={item.productId.img}
                className="w-[100px] h-[100px]"
                alt="an image"
              />
              <div className="flex flex-col gap-2 md:w-[400px]">
                <p>Type: {item.productId.category}</p>
                <p>Name : {item.productId.name}</p>
                <div className="flex justify-between">
                  <button
                    title="delete"
                    className="text-sm bg-red-500  text-white w-fit p-1"
                    onClick={() => handleRemove(item.productId)}
                  >
                    remove
                  </button>
                  <button
                    className="text-sm bg-green-500  text-white w-fit p-1"
                    onClick={() => handleAddCart(item.productId)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
              <div>
                <p className="w-[100px]">₹ {item.productId.price}.00</p>
              </div>
            </div>
          ))
        : "No wishlist found"}
    </div>
  );
};

export default Wishlist;
