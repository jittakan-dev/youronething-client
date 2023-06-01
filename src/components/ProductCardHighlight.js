"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const ProductCardHighlight = ({
  id,
  title,
  title_description,
  image_p,
  image_h,
  price,
  viewport,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const cardOffsetTop = cardRef.current.offsetTop;
        const parallaxOffset = (cardOffsetTop - scrollTop) * 0.8;

        cardRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const getDynamicImageSrc = () => {
    let dynamicSrc = "/product-images/" + image_h;
    if (
      viewport === "md" ||
      viewport === "sm" ||
      viewport === "smr" ||
      viewport === "sx"
    ) {
      dynamicSrc = "/product-images/" + image_p;
    }
    return dynamicSrc;
  };
  return (
    <Link
      href={`/product/${id}`}
      className="flex flex-col justify-center items-center w-full h-screen max-h-screen cursor-pointer"
      ref={cardRef}
    >
      <div className="absolute w-auto h-auto bottom-0 flex flex-col justify-end items-center ml-24 z-20">
        <div className="p-24 sx:p-10">
          <div className="flex flex-col">
            <span className="text-4xl sx:text-3xl">{title}</span>

            <span className="text-xl sx:text-lg">{title_description}</span>
          </div>
          <br />
          <span className="text-xl sx:text-lg">{price} THB</span>
        </div>
      </div>
      <div className="h-auto w-full">
        {image_h && (
          <Image
            src={getDynamicImageSrc()}
            alt=""
            sizes="100vw"
            className="w-full h-auto"
            placeholder="blur"
            fill="true"
            blurDataURL={"/web-images/blur.png"}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    </Link>
  );
};

export default ProductCardHighlight;
