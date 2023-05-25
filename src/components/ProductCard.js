//"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  id,
  title,
  title_description,
  full_description,
  image_t,
  // image_1,
  // image_2,
  // image_3,
  // image_4,
  // image_h,
  // link,
  price,
}) => {
  return (
    <Link
      href={"/product/" + id}
      className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
    >
      <div className="relative w-full h-full p-2 bg-borderColor">
        <Image
          src={"/product-images/" + image_t}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto object-contain"
          priority={true}
        />
      </div>
      <div className="flex flex-col justify-center items-start w-full py-4 font-semibold">
        <div className="text-left text-lg">{title}</div>
        <div className="text-left text-base font-normal">
          {title_description}
        </div>
        <div className="text-left">{price}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
