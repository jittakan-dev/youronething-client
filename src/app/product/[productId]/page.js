"use client";
import Image from "next/image";
import Mockdata from "@data/Mockdata";
import React, { useState, useEffect, useCallback, useMemo } from "react";

const Page = ({ params: { productId } }) => {
  const [product, setProduct] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const storedProductId = localStorage.getItem("productId");
    if (storedProductId) {
    }
  }, []);

  const addProductId = (productId) => {
    try {
      const storedArray = JSON.parse(localStorage.getItem("productId")) || [];

      if (productId !== null && productId !== undefined) {
        storedArray.push(productId);
      } else {
        throw new Error("Invalid productId");
      }

      localStorage.setItem("productId", JSON.stringify(storedArray));

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding productId:", error);
    }
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
          {showNotification && (
            <div className="py-6">Product is added to cart!</div>
          )}
        </div>
      </div>
      <div className="relative flex sx:flex-col 2xl:flex-row justify-center items-center h-full w-full">
        <div className="w-1/2 sx:w-full h-auto bg-green-700"></div>
        <div className="flex flex-col justify-center items-center w-1/2 sx:w-full h-auto">
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            {product.image_1 && (
              <Image
                src={"/product-images/" + product.image_1}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL={"/web-images/blur.png"}
              />
            )}
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            {product.image_2 && (
              <Image
                src={"/product-images/" + product.image_2}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL={"/web-images/blur.png"}
              />
            )}
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full mb-4 sx:mb-2">
            {product.image_3 && (
              <Image
                src={"/product-images/" + product.image_3}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL={"/web-images/blur.png"}
              />
            )}
          </div>
          <div className="min-h-screen sx:min-h-fit h-auto w-full">
            {product.image_4 && (
              <Image
                src={"/product-images/" + product.image_4}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL={"/web-images/blur.png"}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
