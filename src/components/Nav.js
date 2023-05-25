"use client";
import React from "react";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const clickNav = () => {
    setIsOpen(!isOpen);
    refreshSelectedProductIds();
  };
  const clickNavFalse = () => {
    setIsOpen(false);
    refreshSelectedProductIds();
  };
  const clickCartNav = () => {
    setIsCartOpen(!isCartOpen);
    setIsOpen(false);
    refreshSelectedProductIds();
  };
  const clickCartNavFalse = () => {
    setIsCartOpen(false);
    refreshSelectedProductIds();
  };

  const [productIds, setProductIds] = useState([]);

  const refreshSelectedProductIds = () => {
    try {
      const refreshProductId = JSON.parse(localStorage.getItem("productId"));
      if (refreshProductId && Array.isArray(refreshProductId)) {
        setProductIds(refreshProductId);
      } else {
        setProductIds([]);
      }
    } catch (error) {
      console.error("Error while parsing productIds from localStorage:", error);
      setProductIds([]);
    }
  };

  const deleteProductId = (index) => {
    try {
      const existingProductIds = JSON.parse(localStorage.getItem("productId"));
      if (
        existingProductIds &&
        Array.isArray(existingProductIds) &&
        index >= 0 &&
        index < existingProductIds.length
      ) {
        existingProductIds.splice(index, 1);
        setProductIds(existingProductIds);
        localStorage.setItem("productId", JSON.stringify(existingProductIds));
        console.log(`Deleted productId at index ${index}`);
      } else {
        console.error("Invalid index or null productIds");
      }
    } catch (error) {
      console.error("Error while deleting productId:", error);
    } finally {
      refreshSelectedProductIds();
    }
  };

  useEffect(() => {
    refreshSelectedProductIds();
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-50 w-2/3 sx:w-full h-full overflow-hidden transition-all duration-800 bg-slate-400 ${
          isCartOpen ? "translate-x-0 delay-0" : "translate-x-full delay-500"
        }`}
      >
        <div
          className="flex flex-col w-full h-fit justify-start items-end p-10 cursor-pointer"
          onClick={clickCartNavFalse}
        >
          X
        </div>
        <div className="flex flex-col w-full h-fit justify-center items-center px-20">
          <div className="flex justify-between items-center w-full h-fit py-6 text-xl border-b-2 border-slate-800">
            <p>Your order</p>
            <div>{productIds.length}</div>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-fit py-6 text-xl">
            {productIds.map((productId, index) => (
              <div key={index} className="flex justify-between w-full">
                <div>
                  Key: {index} ItemId: {productId}
                </div>
                <div
                  className="text-2xl cursor-pointer"
                  onClick={() => deleteProductId(index)}
                >
                  -
                </div>
              </div>
            ))}
            <div
              className="flex justify-center items-center p-2 text-center text-white bg-slate-600 cursor-pointer"
              // onClick={clearAllProduct}
            >
              Clear All Products
            </div>
            {/* {Object.entries(productIds).map((productId, index) => (
              <div key={index} className="flex justify-between w-full">
                <div>
                  Key: {index} ItemId: {productId}
                </div>
                <div
                  className="text-2xl cursor-pointer"
                  onClick={() => deleteProduct(index)}
                >
                  -
                </div>
              </div>
            ))} */}
            {/* {
              showDelNotification && ""
              <div className="py-6">Product is deleted successfully!</div>
            } */}
          </div>
          <div className="flex justify-center items-center w-full py-10 px-6 text-xl cursor-pointer bg-slate-600 text-white">
            Checkout - THB
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between items-center fixed top-0 right-0 z-20 w-full h-full overflow-hidden transition-all duration-800 ${
          isCartOpen ? "translate-x-0 delay-0" : "translate-x-full delay-500"
        }`}
      >
        <div
          className={`w-4/12 smr:w-full sx:w-full 2xl:w-4/12  h-full bg-black transition-all  duration-700 ${
            isCartOpen ? "opacity-80 delay-700" : "opacity-0 delay-0"
          }`}
          onClick={clickCartNavFalse}
        ></div>
      </div>
      <div className="flex w-full justify-center fixed z-30 top-0 right-0 items-center py-6 px-8 bg-white bg-opacity-20">
        <div className="flex-grow flex flex-col justify-center items-start text-2xl font-semibold">
          <Link href="/">YourOneThing</Link>
        </div>

        <div
          className="flex-none cursor-pointer text-xl px-10"
          onClick={clickCartNav}
        >
          Cart
        </div>
        <div className="flex-none relative px-3">
          <div
            className={`menu-toggle flex flex-col justify-center items-center w-7 h-auto cursor-pointer ${
              isOpen ? "open" : ""
            }`}
            onClick={clickNav}
          >
            <span
              className={`bar w-full h-1 mb-2 ${
                isOpen ? "bg-slate-300" : "bg-fontfrontColor"
              }`}
            ></span>
            <span
              className={`bar w-full h-1 ${
                isOpen ? "bg-slate-300" : "bg-fontfrontColor"
              }`}
            ></span>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between items-center fixed top-0 right-0 z-20 w-full h-full overflow-hidden transition-all duration-800 ${
          isOpen ? "translate-x-0 delay-0" : "translate-x-full delay-500"
        }`}
      >
        <div
          className={`w-4/12 smr:w-full sx:w-0 2xl:w-4/12  h-full bg-black transition-all  duration-700 ${
            isOpen ? "opacity-80 delay-700" : "opacity-0 delay-0"
          }`}
          onClick={clickNavFalse}
        ></div>
        <div
          className={`w-8/12 smr:w-full sx:w-full 2xl:w-8/12 h-full text-slate-400 bg-frontColor`}
        >
          <div className="flex pl-28 sticky top-1/4 text-3xl">
            <div className="flex flex-col justify-center items-start">
              <li className="hover-underline py-3 cursor-pointer">
                <Link href="/" onClick={clickNav}>
                  OneThings
                </Link>
              </li>
              <li className="hover-underline py-3 cursor-pointer">
                <Link href="/seller" onClick={clickNav}>
                  Seller
                </Link>
              </li>
              <li className="hover-underline py-3 cursor-pointer">
                <Link href="/about" onClick={clickNav}>
                  About
                </Link>
              </li>
              <li className="hover-underline py-3 cursor-pointer">
                <Link href="/faq" onClick={clickNav}>
                  FAQ
                </Link>
              </li>
              <li className="hover-underline py-3 cursor-pointer">
                <Link href="/contact" onClick={clickNav}>
                  Contact
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
