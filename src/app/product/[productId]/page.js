"use client";
import Image from "next/image";
import { useContext, useEffect, useState, useCallback } from "react";
import Mockdata from "@data/Mockdata";
import { ProductIdContext } from "../../ProductIdContext";

const Page = ({ params: { productId } }) => {
  const [product, setProduct] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const { setProductId } = useContext(ProductIdContext);
  const [loading, setLoading] = useState(false);

  const addProductId = (productId) => {
    try {
      if (productId) {
        const storedArray = JSON.parse(localStorage.getItem("productId")) || [];
        storedArray.push(productId);
        localStorage.setItem("productId", JSON.stringify(storedArray));
        const memberCount = storedArray.length;
        setProductId(memberCount);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1000);
      } else {
        throw new Error("Invalid productId");
      }
    } catch (error) {
      console.error("Error adding productId:", error);
    }
  };

  const fetchAndSetData = useCallback(async () => {
    try {
      setLoading(true);
      setProduct(Mockdata[productId - 1]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchAndSetData();
    const storedArray = JSON.parse(localStorage.getItem("productId")) || [];
    localStorage.setItem("productId", JSON.stringify(storedArray));
    const memberCount = storedArray.length;
    setProductId(memberCount);
  }, [fetchAndSetData, setProductId]);

  const [expandedImgSrc, setExpandedImgSrc] = useState("");
  const [imgText, setImgText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const myFunction = (imgs) => {
    setExpandedImgSrc(imgs.src);
    setImgText(imgs.alt);
    setIsExpanded(true);
  };

  const closeExpandedImage = () => {
    setIsExpanded(false);
  };

  return (
    <div className="flex flex-row sx:flex-col-reverse h-auto min-h-screen">
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
        <div className="w-1/2 sx:w-full h-auto"></div>
        <div className="flex flex-col justify-start items-start w-1/2 sx:w-full h-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="w-auto h-auto">
              <div className="h-auto w-full mb-4 sx:mb-2">
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
              <div className="h-auto w-full mb-4 sx:mb-2">
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
              <div className="h-auto w-full mb-4 sx:mb-2">
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
              <div className="h-auto w-full">
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
