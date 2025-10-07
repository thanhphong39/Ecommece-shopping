import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async () => {
      products.map(item=>{
        if(item._id === productId){
          setProductData(item);
          setImage(item.image[0]);
          return null;
        }
      })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId])

  return productData ? (
    <div className="border-t border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product Data}*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image}*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* product details}*/}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  } `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="border-gray-300 mt-8 sm:w-4/5 " />
          <div className="text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery available</p>
            <p>Get free delivery for orders above {currency}3000</p>
          </div>
        </div>
      </div>

      {/* Discrption}*/}
      <div className="mt-20">
        <div className="flex ">
          <b className="border border-gray-300 px-5 py-3 text-sm">Description</b>
          <p className="border border-gray-300 px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="border-gray-200 flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            E-commerce is the activity of buying or selling of products and
            services over electronic systems such as the Internet and other
            computer networks. The term was coined in the 1960s and 1970s to
            describe the digital exchange of data via Electronic Data
            Interchange.
          </p>
          <p>
            Today, e-commerce typically refers to the sale of physical products
            online, but it can also describe any kind of commercial transaction
            that is facilitated through the internet. E-commerce operates in all
            four of the major market segments: business to business, business to
            consumer, consumer to consumer, and consumer to business.
          </p>
        </div>
      </div>
    
    {/* display relate product}*/}

    <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product