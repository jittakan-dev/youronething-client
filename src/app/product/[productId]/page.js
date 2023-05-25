"use client";
import Image from "next/image";
import Mockdata from "@data/Mockdata";
import React, { useState, useEffect, useCallback, useMemo } from "react";

const Page = ({ params: { productId } }) => {
  const [product, setProduct] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // const refreshSelectedProductIds = () => {
  //   JSON.parse(localStorage.getItem("productId"));
  // };

  const [productIds, setProductIds] = useState([]);

  const refreshSelectedProductIds = () => {
    const refreshProductId = JSON.parse(localStorage.getItem("productId"));
    setProductIds(refreshProductId);
  };

  const addProductId = (productId) => {
    console.log("BEFORE" + JSON.parse(localStorage.getItem("productId")));
    refreshSelectedProductIds();
    const updatedProductIds = [...productIds, productId];

    localStorage.setItem("productId", JSON.stringify(updatedProductIds));
    setShowNotification(true);
    refreshSelectedProductIds();
    console.log("AFTER" + JSON.parse(localStorage.getItem("productId")));
    setProductIds(updatedProductIds);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
  };

  const fetchAndSetData = useCallback(async () => {
    try {
      setProduct(Mockdata[productId - 1]);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, [productId]);

  useEffect(() => {
    fetchAndSetData();
    refreshSelectedProductIds();
  }, [fetchAndSetData]);

  return (
    <div className="flex flex-row sx:flex-col-reverse">
      <div className="fixed sx:relative z-10 w-1/2 sx:w-full h-screen max-h-screen">
        <div className="flex flex-col justify-start items-start w-full h-full pt-24 p-10">
          <div className="text-3xl font-bold mb-6">{product.title}</div>
          <div className="text-xl font-semibold mb-6">
            {product.title_description}
          </div>
          <div className="mb-12">{product.full_description}</div>
          <div className="flex w-full">
            <div className="flex-none text-xl font-semibold">
              Price: {product.price}THB
            </div>
            <div className="grow"></div>
            <div className="flex-none text-xl font-semibold">
              <button onClick={() => addProductId(product.id)}>
                Add to Cart
              </button>
            </div>
          </div>
          {/* {showNotification && (
            <div className="py-6">Product is added to cart!</div>
          )} */}
        </div>
      </div>
      <div className="relative flex sx:flex-col 2xl:flex-row justify-center items-center h-full w-full">
        <div className="w-1/2 sx:w-full h-auto bg-green-700"></div>
        <div className="flex flex-col justify-center items-center w-1/2 sx:w-full h-auto">
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            <Image
              src={"/product-images/" + product.image_1}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto object-cover"
              priority={true}
            />
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            <Image
              src={"/product-images/" + product.image_2}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            <Image
              src={"/product-images/" + product.image_3}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full">
            <Image
              src={"/product-images/" + product.image_4}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
