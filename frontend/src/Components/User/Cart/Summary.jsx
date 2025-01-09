import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const { totalAmount, cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  
  const handlePaymentPage = () => {
    if (cart.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <>
      <div className="summary bg-gray-300 py-6 px-6 md:w-[400px] rounded-r-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 mt-8 py-3">
          Summary
        </h2>
        <div className="flex justify-between my-2">
          <p>ITEMS {cart?.length}</p>
          <p className="font-bold">₹ {totalAmount}.00</p>
        </div>
        <p>SHIPPING</p>
        <input
          type="text"
          placeholder="Standard-delivery"
          className="p-2 bg-white"
          disabled
        />
        <h4>GIVE CODE</h4>
        <input
          type="text"
          value="Applied 10% discount"
          disabled
          className="p-2 text-green-600 bg-white"
        />
        <div className="flex justify-between my-4">
          <h4>TOTAL PRICE</h4>
          <h4 className="font-bold">₹ {totalAmount - 100}.00</h4>
        </div>
        <button
          className="bg-black text-white p-2 mt-6"
          onClick={handlePaymentPage}
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default Summary;
