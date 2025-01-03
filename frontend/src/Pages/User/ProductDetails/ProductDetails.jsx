import React, { useContext, useEffect} from "react";
import { AppContext } from "../../../context/AppContext";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { TbTruckDelivery } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../slices/productSlice";

const ProductDetails = () => {
  const { cartQuantity, setCartQuantity, addToCart } =
    useContext(CartContext);

  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {productById} = useSelector((state)=> state.products);
  console.log(productById);

  useEffect(()=> {
    dispatch(fetchProductById(productId))
  },[productId, dispatch])
  


  useEffect(() => {
    setCartQuantity(1);
  }, [productId]);

  return (
    <div className="flex justify-between pt-[150px] w-[90%] mx-auto">
      <Toaster sition="top-right" reverseOrder={false} />
      <div className="max-w-[1200px] max-h-[500px] border border-gray-500 rounded-md">
        <img
          src={productById?.img}
          alt="product image"
          className="w-[1100px] h-[400px] object-contain mt-10 hover:scale-105 duration-150"
        />
      </div>
      <div className="flex flex-col ml-14 gap-3 w-[60%]">
        <h1 className="text-4xl font-bold">{productById.name}</h1>
        <div className="flex items-center gap-2 pb-4 border-b">
          <strike className="text-gray-400 text-lg font-bold">
            ₹{Math.trunc(productId.price) + 120}.00
          </strike>
          <h3 className="text-xl font-bold">₹{productById.price}</h3>
        </div>
        <p className="text-green-700">✅ In stock</p>
        <p className="w-[90%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni
          ullam quaerat ex sequi maxime in sapiente ipsa. Facere distinctio
          numquam incidunt eos impedit harum earum
        </p>
        <h5>color : {productById.color}</h5>
        <div className="flex items-center gap-4 my-4 w-full">
          <div className="border border-gray-300 bg-white w-[150px] flex justify-center items-center">
            <button
              className="py-2 px-4 font-extrabold border-r"
              onClick={() =>
                setCartQuantity(cartQuantity > 1 ? cartQuantity - 1 : 1)
              }
            >
              -
            </button>
            <button className="px-4 font-extrabold border-r">
              {cartQuantity}
            </button>
            <button
              className="py-2 px-4 font-extrabold border-l"
              onClick={() => setCartQuantity(cartQuantity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <button
              className="bg-black text-white py-3 w-[240px]"
              onClick={() => addToCart(data)}
            >
              ADD TO CART
            </button>
          </div>
          <div>
            <button className="p-[12px] border text-2xl">
              <MdOutlineFavoriteBorder />
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <input type="checkbox" name="" id="" className="h-4 w-4" />
          <span>I agree with terms and conditions</span>
        </div>
        <div className="my-4 w-full">
          <button
            onClick={() => handlePayment(data)}
            className="w-[90%] border border-gray-400 p-4 bg-gray-800 text-white"
          >
            BUY NOW
          </button>
        </div>
        <div className="flex gap-4 items-center border mt-2 border-gray-300 rounded-lg">
          <p className="text-4xl m-2 pl-2">
            <TbTruckDelivery />
          </p>
          <p className="border-l py-4 pl-4">
            Experience fast, secure delivery you can trust, every time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
