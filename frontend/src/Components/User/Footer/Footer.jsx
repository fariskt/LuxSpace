import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div id="footer" className="border-t border-gray-300 bg-black text-white mt-20 py-20 px-16 flex flex-col md:flex-row justify-between w-full mx-auto">
        <div className="flex flex-col w-1/3 gap-4 text-gray-200">
          <Link to='/'><h1 className="text-4xl text-white font-bold mb-2">LuxSpace</h1></Link>
          <div className="flex items-center gap-3">
            <span>
              <CiLocationOn />
            </span>
            <h5>India , Kerala</h5>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <CiMail />
            </span>
            <h5>company@gmail.com</h5>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <IoCallOutline />
            </span>
            <h4>+91 9999888777</h4>
          </div>
        </div>
        <div className="w-1/3 flex flex-col md:flex-col gap-4">
          <h4 className="text-md font-bold mt-4">INFORMATION</h4>
          <div className="text-gray-300 flex flex-col gap-4">
            <Link to="">
              <h5>Contact us</h5>
            </Link>
            <Link to="">
              <h5>Track Delivery</h5>
            </Link>
            <Link  to="">
              <h5>Conditions</h5>
            </Link>
            <Link to=''>
              <h5>Help</h5>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3 text-md font-bold">
          <h4>About us</h4>
          <p className=" font-[500] text-gray-300 mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            ipsam, ea nam non, cum dolores ratione provident blanditiis ab enim
          </p>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Footer;

{
  /* <div>
        <div className="logo">
          <span>fb</span>
          <span>insta</span>
          <span>twiiter</span>
          <span>etc</span>
        </div>
      </div> */
}
