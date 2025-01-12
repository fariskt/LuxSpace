import React, { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, logoutUser } from "../../../features/authSlice";
import { clearCart, fetchUserCart } from "../../../features/cartSlice";
import { fetchUserWishList } from "../../../features/wishlistSlice";

const Navbar = () => {
  const { accessToken, authUser ,isUserAuthenticated} = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    setShowProfile(false);
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    if (isUserAuthenticated && accessToken) {
      dispatch(fetchUserDetails());            
    }
  }, [dispatch , authUser?._id]);

  useEffect(() => {
    if (authUser?._id) {
      dispatch(fetchUserCart(authUser?._id));
    }
    if (authUser && accessToken) {
      dispatch(fetchUserWishList(authUser?._id));
    }
  }, [authUser?._id]);

  return (
    <nav className="fixed w-full z-50 h-20 flex items-center justify-between px-4 md:px-12 top-0 bg-white shadow-sm">
      <a href="/" className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold">LuxSpace</h2>
      </a>
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex md:flex-row md:gap-8">
          <Link to="/products">
            <li>Products</li>
          </Link>
          <li
            onClick={() =>
              document
                .getElementById("footer")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </li>
        </ul>

        <div className="flex gap-6 items-center">
          <Link to="/cart" className=" relative">
            <span className="text-2xl">
              <BsCart2 />
            </span>
            {cart?.length > 0 && (
              <sup className="bg-black text-center text-white text-xs h-4 w-4  rounded-full absolute ml-6">
                {cart.length}
              </sup>
            )}
          </Link>

          {isUserAuthenticated ? (
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleProfileToggle}
                className={`text-2xl ${
                  showProfile
                    ? "bg-gray-300 border border-gray-900 rounded-full p-1"
                    : "p-1 border rounded-full"
                }`}
              >
                <CgProfile />
              </button>
              {showProfile && authUser && (
                <div className="absolute flex flex-col gap-4 mt-10 mr-28 bg-gray-500 text-white rounded-md py-4 w-44 px-4 shadow-lg">
                  <small className="text-sm text-center bg-gray-400 rounded-md p-1">
                    {authUser.name.toUpperCase()}
                  </small>
                  <Link to="/orders">
                    <h4
                      className="cursor-pointer"
                      onClick={() => setShowProfile(false)}
                    >
                      View Orders
                    </h4>
                  </Link>
                  <Link to="/wishlist">
                    <h4
                      className="cursor-pointer"
                      onClick={() => setShowProfile(false)}
                    >
                      Wishlist
                    </h4>
                  </Link>
                  <button
                    className="bg-red-600 text-white rounded-md p-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button className="bg-black text-white py-2 px-3 rounded-lg">
                Sign up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
