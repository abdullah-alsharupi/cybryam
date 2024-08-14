import React from "react";
import { ProductItem } from "..";
import { useCartContext } from "../../context/CartContext";


const ProductList = () => {
  const { products } = useCartContext();

  return (
    <div className='flex-3'>
      <h2 className='mb-[8px]'>Desserts</h2>
      <div className='grid grid-cols-3 gap-[3%] max-sm:flex max-sm:flex-col md:gap-[15px] max-lg:grid-cols-2 max-lg:gap-[10px]'>
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

