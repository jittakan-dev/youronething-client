"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const ProductCardHighlight = ({
  id,
  title,
  title_description,
  image_h,
  price,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const cardOffsetTop = cardRef.current.offsetTop;
        const parallaxOffset = (cardOffsetTop - scrollTop) * 0.5; // Adjust the parallax effect speed here

        cardRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href={`/product/${id}`}
      className="flex flex-col justify-center items-center w-full h-screen max-h-screen cursor-pointer"
      ref={cardRef}
    >
      <div className="absolute w-auto h-auto bottom-0 flex flex-col justify-end items-center ml-24">
        <div className="p-24 sx:p-10">
          <span className="text-4xl sx:text-3xl">{title}</span>
          <br />
          <br />
          <span className="text-xl sx:text-lg">{title_description}</span>
        </div>
      </div>
      <Image
        src={"/product-images/" + image_h}
        alt="Landscape picture"
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-full object-cover"
        priority={true}
      />
    </Link>
  );
};

export default ProductCardHighlight;
