import React from "react";
import { useCartContext } from "../../context/CartContext";
import { CartItem } from "..";


const Cart = ({ setIsModalOpen }) => {
  const { cartItems, totalCartItemsCount, totalOrderPrice } = useCartContext();

  return (
    <div className='flex-1 bg-white rounded-[10px] p-5 h-fit max-sm:flex-none'>
      <h4 className='text-red-500'>Your Cart ({totalCartItemsCount})</h4>
      {!totalCartItemsCount ? (
        <div className='flex flex-col justify-center items-center p-6.25'>
          <img
            src={"/assets/images/illustration-empty-cart.svg"}
            alt="empty cart"
            loading="lazy"
          />
          <p className='text-black font-bold text-sm'>
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <CartItem key={index} cartItem={item} />
          ))}
          <div className='flex justify-between my-5'>
            <p className='text-base'>Order Total</p>
            <p className='font-bold text-black'>${totalOrderPrice.toFixed(2)}</p>
          </div>
          <div className='flex gap-1.25 bg-rose-50 justify-center py-2.5 text-sm rounded-[10px]'>
            <img src={"/assets/images/icon-carbon-neutral.svg"} alt="carbon-neutral" loading="lazy" />
            <p>
              This is a <span className='font-medium'>carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            className='w-full mt-5 py-2.5 rounded-[20px] cursor-pointer bg-red text-rose-100 border-none bg-red-700'
            onClick={() => setIsModalOpen(true)}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
