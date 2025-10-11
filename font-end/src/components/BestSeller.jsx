import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log("All products:", products);
    // Kiểm tra sản phẩm đầu tiên
    if (products.length > 0) {
      console.log("First product:", products[0]);
      console.log("bestSeller property:", products[0].bestSeller);
      console.log("bestseller property:", products[0].bestseller);
    }

    const bestProduct = products.filter((item) => item.bestseller);
    console.log("Filtered bestsellers:", bestProduct);
    setBestSeller(bestProduct.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Forever believes that each person is a unique individual. Gu Thiet Ke
          was born to break the boredom, bring products 'one-of-a-kind'.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
