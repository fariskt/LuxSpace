import React, { useContext, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../slices/authSlice";


const Navbar = () => {
  const { isAuthenticated ,user} = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const { cart } = useContext(CartContext);

  const [showProfile, setShowProfile] = useState(false);


  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };



  const handleLogout = ()=> {
    dispatch(logoutUser())
    setShowProfile(false)
  }
  

  return (
    <nav className="fixed w-full z-50 h-20 flex items-center justify-between px-4 md:px-12 top-0 bg-white shadow-sm">
      <Link to="/" className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold">LuxSpace</h2>
      </Link>

      <div className="flex items-center gap-8">
        <ul className="hidden md:flex md:flex-row md:gap-8">
          <Link to="/">Home</Link>
          <Link to='/products'>
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
            {cart?.products?.length > 0 && (
              <sup className="bg-black text-center text-white text-xs h-4 w-4  rounded-full absolute ml-6">
                {cart.products.length}
              </sup>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleProfileToggle}
                className={`text-2xl ${
                  showProfile ? "bg-gray-300 border border-gray-900 rounded-full p-1" : "p-1 border rounded-full"
                }`}
              >
                <CgProfile />
              </button>
              {showProfile && (
                <div className="absolute flex flex-col gap-4 mt-10 mr-28 bg-gray-500 text-white rounded-md py-4 w-44 px-4 shadow-lg">
                  <small className="text-sm text-center bg-gray-400 rounded-md p-1">
                    {user.name.toUpperCase()}
                  </small>
                  <h4 className="cursor-pointer">View Profile</h4>
                  <Link to="/orders">
                    <h4
                      className="cursor-pointer"
                      onClick={() => setShowProfile(false)}
                    >
                      Orders
                    </h4>
                  </Link>
                  <h4 className="cursor-pointer">Settings</h4>
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
