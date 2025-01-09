import React, {  useRef } from "react";
import "./Home.css";
import Categories from "../../../Pages/User/Categories/Categories";
import { Link } from "react-router-dom";


const Home = () => {
  const targetRef = useRef(null);
    
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <img
          src="./red-bg.jpg"
          alt=""
          className="absolute top-0 w-full h-screen object-cover -z-10 opacity-80"
        />
        <div className="mt-56 flex flex-col items-center  max-w-3xl">
          <h1 className="text-7xl">
            Transform Your Space with Elegant Furniture
          </h1>
          <p className="mt-5">
            Lorem ipsum dolor quia quod asperiores laudantium eius itaque totam
            cumque
          </p>
          <Link to="/products">
            <button className="ml-10 bg-black text-white py-3 px-6 mt-8 text-center">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
      <p id="product" ref={targetRef}></p>
      <Categories />
    </>
  );
};

export default Home;
