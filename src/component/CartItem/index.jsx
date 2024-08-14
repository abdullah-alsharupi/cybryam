import React from "react";
import { useCartContext } from "../../context/CartContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

 const CartItem = ({ cartItem }) => {
  const { handleRemoveCartItem } = useCartContext();

  return (
    <div className='flex justify-between items-center p-[10px,0px] border-solid border-b-rose-100 my-5'>
      <div>
        <p className='font-medium text-base text-black'>{cartItem.name}</p>
        <div className='flex gap-2.5 text-sm mt-1.25'>
          <p className='font-medium text-red-700'>{cartItem.quantity}x</p>
          <p className='font-[400px] text-rose-500'>@ ${cartItem.price.toFixed(2)}</p>
          <p className='font-[500px] text-black'>
            ${(cartItem.price * cartItem.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <AiOutlineCloseCircle
        size={20}
        className='cursor-pointer text-rose-300 hover:text-black'
        onClick={() => handleRemoveCartItem(cartItem.name)}
      />
    </div>
  );
};

export default CartItem;