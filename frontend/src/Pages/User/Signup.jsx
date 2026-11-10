import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../features/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUpError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      const res = await dispatch(registerUser({ name, email, password })).unwrap();
      const role = res.data.role;
      if (role === "user") {
        navigate("/login");
      }
    } catch (error) {
      console.log("User registration failed", error);
    }
  };

  useEffect(() => {
    if (signUpError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [signUpError, dispatch]);

  return (
    <div className="flex w-[90%] md:w-[70%] mt-[100px] mx-auto border-2 border-gray-400 rounded-lg justify-around">
      <div className="flex flex-col justify-center">
        <img
          className="hidden md:block h-[450px]"
          src="./signup-img.jpg"
          alt="signup-side-image"
        />
      </div>
      <div className="mt-[70px] px-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">Create account</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-[400px] gap-6"
        >
          <div className="flex border-b border-gray-400 pb-2 mt-12 gap-4 md:w-[400px]">
            <span>
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-[90%]"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex border-b border-gray-400 pb-2 gap-4 md:w-[400px]">
            <span>
              <MdEmail />
            </span>
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="w-[90%]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex border-b pb-2 border-gray-400 gap-4 md:w-[400px]">
            <span>
              <IoMdLock />
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

          <div className="flex border-b pb-2 border-gray-400 gap-4 md:w-[400px]">
            <span>
              <IoIosLock />
            </span>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              className="w-[90%]"
              value={formData.cpassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-400 py-3 px-5 rounded-md text-white"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-8 flex gap-2">
          <h4>Already have an account?</h4>
          <Link to="/login">
            <span className="text-blue-500">Login</span>
          </Link>
        </div>
        {signUpError && <div className="text-red-600">{signUpError}</div>}
      </div>
    </div>
  );
};

export default Signup;
