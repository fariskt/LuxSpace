import React, { useContext, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loginError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData));
    } catch (error) {
      console.log("Invalid password or email", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Success")
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex w-[70%] mt-[100px] mx-auto border-2 border-gray-400 rounded-lg justify-around py-12">
      <Toaster position={"top-center"} reverseOrder={false} />
      <div className="flex flex-col items-center justify-center gap-5">
        <img
          className="h-[400px] "
          src="./login-img.jpg"
          alt="login-side-image"
        />
      </div>
      <div className="mt-[100px] px-6">
        <h1 className="text-4xl font-extrabold">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-[400px] gap-8">
          <div className="flex border-b border-gray-400 pb-2 mt-12 gap-8 w-[400px]">
            <span>
              <MdEmail />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-[90%]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex border-b pb-2 border-gray-400 gap-8 w-[400px]">
            <span>
              <IoIosLock />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-[90%]"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-400 py-3 px-5 rounded-md text-white"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-8 flex gap-2">
          <h4>Don't have an account.</h4>
          <Link to="/signup">
            <span className="text-blue-500">create one</span>
          </Link>
        </div>
        {loginError && <div className="text-red-600">{loginError}</div>}
      </div>
    </div>
  );
};

export default Login;
