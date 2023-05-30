import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  id,
  title,
  title_description,
  image_t,
  price,
  pop,
  date,
  type,
}) => {
  return (
    <Link
      href={"/product/" + id}
      className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
    >
      <div className="relative w-full h-full bg-borderColor">
        {image_t && (
          <Image
            src={"/product-images/" + image_t}
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
      <div className="flex flex-col justify-center items-start w-full py-4 font-semibold">
        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex flex-col justify-center items-start">
            <div className="text-left text-lg">{title}</div>
            <div className="text-left text-base font-normal">
              {title_description}
            </div>
          </div>
          <div className="grow"></div>
          <div className="text-left">{price} THB</div>
        </div>
        <div className="flex flex-row justify-end items-center w-full font-normal mt-2 pt-2 border-t-2 border-slate-700">
          <div className="text-left">Pop : {pop}</div>
        </div>
        <div className="flex flex-row justify-center items-center w-full  font-normal">
          <div className="flex flex-col justify-center items-start">
            <div className="text-left">{type}</div>
          </div>
          <div className="grow"></div>
          <div className="text-left">Date : {date}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
