import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, handleLogin } from "../../features/authSlice";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginError, loading } = useSelector((state) => state.auth);

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
      const res = await dispatch(handleLogin(formData)).unwrap();
      const role = res.data.role;
      if (role === "admin") {
        navigate("/admin");
        toast.success(res.message);
      } else if (role === "user") {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed");
      console.log("Invalid password or email", error);
    }
  };

  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [loginError, dispatch]);

  return (
    <div className="flex w-[90%] md:w-[70%] mt-[100px] mx-auto border-2 border-gray-400 rounded-lg justify-around py-12">
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:gap-5">
        <img
          className="h-[400px] "
          src="./login-img.jpg"
          alt="login-side-image"
        />
      </div>
      <div className="mt-[100px] px-6">
        <h1 className="text-4xl font-extrabold">Sign in</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-[400px] gap-8"
        >
          <div className="flex border-b border-gray-400 pb-2 mt-12 gap-8 md:w-[400px]">
            <span>
              <MdEmail />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="md:w-[90%]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex border-b pb-2 border-gray-400 gap-8 md:w-[400px]">
            <span>
              <IoIosLock />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="md:w-[90%]"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-400 py-3 px-5 rounded-md text-white"
            >
              {loading ? (
                <Oval
                  visible={true}
                  height="22"
                  width="40"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  strokeWidth="5"
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="mt-8 flex gap-2">
          <h4>Don't have an account.</h4>
          <Link to="/signup">
            <span className="text-blue-500">create one</span>
          </Link>
        </div>
        {loginError && (
          <div className="absolute md:mt-0 mt-4 text-red-600">{loginError}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
