"use client";
import Link from "next/link";
import Image from "next/image";
import Mockdata from "@data/Mockdata";
import { useState, useCallback, useEffect, useContext } from "react";
import { ProductIdContext } from "../app/ProductIdContext";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDelNotification, setShowDelNotification] = useState(false);
  const { productId, setProductId } = useContext(ProductIdContext);
  let totalprice = 0;
  const handleItemSelection = (selectedIds) => {
    if (!selectedIds) {
      console.error("Selected IDs cannot be null or undefined.");
      return;
    }
    const selectedItemsArray = selectedIds.map((selectedId) => {
      const selectedItem = Mockdata.find((item) => item.id === selectedId);
      if (!selectedItem) {
        console.error(`Item with ID ${selectedId} not found.`);
      }
      return selectedItem;
    });
    setSelectedItems(selectedItemsArray.reverse());
  };

  const refreshSelectedProductIds = useCallback(() => {
    try {
      const refreshProductId = JSON.parse(localStorage.getItem("productId"));
      if (refreshProductId && Array.isArray(refreshProductId)) {
        handleItemSelection(refreshProductId);
      } else {
      }
    } catch (error) {
      console.error("Error while parsing productIds from localStorage:", error);
    }
  }, []);

  const deleteProductId = useCallback(
    (index) => {
      try {
        let storedArray = JSON.parse(localStorage.getItem("productId")) || [];
        storedArray.splice(index, 1);
        localStorage.setItem("productId", JSON.stringify(storedArray));
        setShowDelNotification(true);
        productId > 0 ? setProductId(productId - 1) : setProductId(0);
        refreshSelectedProductIds();
        setTimeout(() => {
          setShowDelNotification(false);
        }, 1000);
      } catch (error) {
        console.error("Error deleting product ID:", error);
      }
    },
    [refreshSelectedProductIds, setProductId, productId]
  );

  const clickNav = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const clickNavFalse = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clickCartNav = useCallback(() => {
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
    setIsOpen(false);
    refreshSelectedProductIds();
  }, [refreshSelectedProductIds]);

  const clickCartNavFalse = useCallback(() => {
    setIsCartOpen(false);
    refreshSelectedProductIds();
  }, [refreshSelectedProductIds]);

  const clickClearLocalStorage = useCallback(() => {
    try {
      localStorage.removeItem("productId");
      handleItemSelection([]);
      setProductId(0);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    refreshSelectedProductIds();
  }, [refreshSelectedProductIds, setProductId]);

  useEffect(() => {
    refreshSelectedProductIds();
    const arrayValue = JSON.parse(localStorage.getItem("productId"));
    localStorage.setItem("productId", JSON.stringify(arrayValue));
    const memberCount = Array.isArray(arrayValue) ? arrayValue.length : 0;
    setProductId(memberCount);
  }, [refreshSelectedProductIds, setProductId]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollOverHeight, setIsScrollOverHeight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsScrollOverHeight(scrollPosition > window.innerHeight);
    }
  }, [scrollPosition]);

  return (
    <>
      {/* Cart */}
      <div
        className={`fixed top-0 right-0 z-50 w-7/12 sx:w-full smr:w-full sm:w-7/12 md:2xl:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 h-full overflow-hidden transition-all duration-800 bg-slate-400 ${
          isCartOpen ? "translate-x-0 delay-0" : "translate-x-full delay-500"
        }`}
      >
        <div
          className="flex flex-col w-full h-fit justify-start items-end py-6 px-10 text-2xl cursor-pointer"
          onClick={clickCartNavFalse}
        >
          X
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center px-20 sx:px-4 smr:px-2 sm:px-10 md:px-16 lg:px-20 xl:px-20 2xl:px-20 overflow-hidden">
          <div className="h-full w-full justify-center items-center px-6 mb-20 overflow-y-scroll">
            <div className="flex justify-between items-center w-full h-fit py-6 text-xl border-b-2 border-slate-800">
              <div className="flex justify-center items-center text-2xl">
                Your order
              </div>
              <div className="flex justify-center items-center py-2 px-4 rounded-xl bg-slate-700 text-slate-200">
                <div>{selectedItems.length}</div>
              </div>
            </div>
            <div
              className="flex justify-end items-center w-full h-fit py-6 text-xl hover:text-red-700 cursor-pointer border-b-2 border-slate-800"
              onClick={clickClearLocalStorage}
            >
              Clear All
            </div>
            <div className="flex flex-col justify-center items-center w-full h-fit py-6 text-xl">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="group flex justify-between w-full border-b-2 border-slate-800 pb-4 mb-4"
                >
                  <Link
                    href={"/product/" + item.id}
                    onClick={clickCartNavFalse}
                  >
                    <Image
                      src={"/product-images/" + item.image_c}
                      alt=""
                      width="0"
                      height="0"
                      sizes="100%"
                      className="w-full h-auto object-cover border-2 rounded-lg border-slate-400 group-hover:border-slate-700"
                      placeholder="blur"
                      blurDataURL={"/web-images/blur.png"}
                    />
                  </Link>
                  <div className="flex flex-col justify-start items-start">
                    <div>
                      <div className="text-xl font-semibold">
                        <p>
                          {index + 1}) {item.title}
                        </p>
                      </div>
                      <div>Price:{item.price}</div>
                      <div className="hidden">{(totalprice += item.price)}</div>
                    </div>
                    <div className="grow"></div>
                    <div
                      className="text-base cursor-pointer self-end hover:text-red-700"
                      onClick={() => deleteProductId(index)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))}
              {showDelNotification && (
                <div className="py-6">Product is deleted successfully!</div>
              )}
            </div>
            <div className="flex justify-center items-center sticky bottom-0 w-full py-10 px-6 text-xl cursor-pointer invisible bg-slate-600 text-white">
              C
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center sticky bottom-0 w-full py-10 px-6 text-xl cursor-pointer bg-slate-600 text-white">
          Checkout - {totalprice}THB
        </div>
      </div>
      {/* Cart */}
      {/* silhouette*/}
      <div
        className={`flex justify-between items-center fixed top-0 right-0 z-20 w-full h-full overflow-hidden transition-all duration-700 ${
          isCartOpen ? "translate-x-0 delay-0" : "translate-x-full delay-400"
        }`}
      >
        <div
          className={`w-5/12 sx:w-0 smr:w-0 sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 h-full bg-black transition-all  duration-600 ${
            isCartOpen ? "opacity-80 delay-600" : "opacity-0 delay-0"
          }`}
          onClick={clickCartNavFalse}
        ></div>
      </div>
      {/* silhouette*/}
      {/* NavBar */}
      <div
        className={`flex w-full justify-center fixed z-30 top-0 right-0 items-center py-6 px-8 ${
          isScrollOverHeight
            ? "bg-slate-700 text-white"
            : "bg-slate-400 bg-opacity-20 "
        }`}
      >
        <div className="flex-grow flex flex-col justify-center items-start text-2xl font-semibold">
          <Link href="/">Y1T</Link>
          {/* <p
            className={`text-base ${isScrollOverHeight ? "text-red-500" : ""}`}
          >
            Scroll position: {scrollPosition}
          </p> */}
        </div>
        <div
          className="flex-none cursor-pointer text-xl sx:text-xl smr:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl px-10 sx:px-4 smr:px-4 sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-10"
          onClick={clickCartNav}
        >
          Cart({productId ? productId : 0})
        </div>
        <div className="flex-none relative px-3 sx:px-2 smr:px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 2xl:px-3">
          <div
            className={`menu-toggle flex flex-col justify-center items-center w-7 h-auto cursor-pointer ${
              isOpen ? "open" : ""
            }`}
            onClick={clickNav}
          >
            <span
              className={`bar w-full h-1 mb-2 ${
                isScrollOverHeight
                  ? isOpen
                    ? "bg-fontfrontColor"
                    : "bg-slate-300"
                  : isOpen
                  ? "bg-slate-300"
                  : "bg-fontfrontColor"
              }`}
            ></span>
            <span
              className={`bar w-full h-1 ${
                isScrollOverHeight
                  ? isOpen
                    ? "bg-slate-300"
                    : "bg-slate-300"
                  : isOpen
                  ? "bg-slate-300"
                  : "bg-fontfrontColor"
              }`}
            ></span>
          </div>
        </div>
      </div>
      {/* NavBar */}
      {/* NavMenu */}
      <div
        className={`flex justify-between items-center fixed top-0 right-0 z-20 w-full h-full overflow-hidden transition-all duration-800 ${
          isOpen ? "translate-x-0 delay-0" : "translate-x-full delay-500"
        }`}
      >
        <div
          className={`w-5/12 sx:w-0 smr:w-0 sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 h-full bg-black transition-all  duration-700 ${
            isOpen ? "opacity-80 delay-700" : "opacity-0 delay-0"
          }`}
          onClick={clickNavFalse}
        ></div>
        <div
          className={`w-7/12 sx:w-full smr:w-full sm:w-7/12 md:2xl:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 h-full text-slate-400 bg-frontColor`}
        >
          <div className="flex pl-28 sx:p-20 smr:p-28 sm:pl-16 md:pl-20 lg:pl-28 xl:pl-28 2xl:pl-28 sticky top-1/4 text-3xl">
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
      {/* NavMenu */}
    </>
  );
}

export default Nav;
