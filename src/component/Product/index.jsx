import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { useCartContext } from "../../context/CartContext";

const ProductItem = ({ product }) => {
  const {
    addItemToCart,
    isProductInCart,
    getCartItem,
    incrementQuantity,
    decrementQuantity,
  } = useCartContext();

  return (
    <div className="flex flex-col">
      <div className="flex-3">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <source media="(max-width: 767px)" srcSet={product.image.mobile} />
          <img
            src={product.image.thumbnail}
            alt={product.name}
            loading="lazy"
            className={`w-[100%] h-[100%] rounded-[10px] border-solid border-[1px]  ${isProductInCart(product.name)?"border-solid border-[3px] border-red-700":"border-rose-200"}`}
          />
        </picture>
      </div>

      <div className="relative flex-1">
        {isProductInCart(product.name) ? (
          <div
            className="w-3/5 bg-red-700 py-2.5 px-[15px] absolute top-[-36%] left-[20%] rounded-[20px] flex justify-between items-center "
          >
            <div
              className="w-5 h-5 bg-red-800 border-[1px] border-solid text-rose-100 border-rose-100 rounded-full flex justify-center items-center cursor-pointer hover:border-red-400 hover:bg-rose-100 hover:text-black"
              onClick={() => decrementQuantity(product.name)}
            >
              <AiOutlineMinus size={12} />
            </div>
            <p className="text-rose-100">{getCartItem(product.name).quantity}</p>
            <div
              className="w-5 h-5 bg-red-800 border-[1px] border-solid text-rose-100 border-rose-100 rounded-full flex justify-center items-center cursor-pointer hover:border-red-400 hover:bg-rose-100 hover:text-black"
              onClick={() => incrementQuantity(product.name)}
            >
              <AiOutlinePlus size={12} />
            </div>
          </div>
        ) : (
          <div
            className="w-3/5 bg-white py-2.5 absolute top-[-36%] left-[20%] rounded-[20px] border border-rose-300 flex justify-center gap-1.25 cursor-pointer hover:border-red-400 hover:bg-red-500"
            onClick={() => addItemToCart(product)}
          >
            <MdAddShoppingCart size={20} className="mx-[5px]" />
            <span className="font-medium">Add to Cart</span>
          </div>
        )}
        <p className="font-medium mt-[25px] text-[14px] text-rose-400">{product.category}</p>
        <p className="font-bold">{product.name}</p>
        <p className="text-red-700 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductItem;