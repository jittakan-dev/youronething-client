"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Mockdata from "@data/Mockdata";
const ProductCard = dynamic(() => import("./ProductCard"));
const ProductCardHighlight = dynamic(() => import("./ProductCardHighlight"));
function getCurrentBreakpoint(width, height) {
  if (width >= 260 && width <= 319) {
    return "sz";
  } else if (width >= 320 && width <= 479) {
    return "sx";
  } else if (width >= 479 && width <= 639) {
    return "smr";
  } else if (width >= 639 && width <= 767) {
    return "sm";
  } else if (width >= 767 && width <= 1023 && height < 768) {
    return "md";
  } else if (width >= 767 && width <= 1023 && height >= 768 && height <= 1370) {
    return "mdh";
  } else if (width >= 1023 && width <= 1279 && height < 768) {
    return "lg";
  } else if (
    width >= 1023 &&
    width <= 1279 &&
    height >= 768 &&
    height <= 1370
  ) {
    return "lgh";
  } else if (width >= 1280 && width <= 1535) {
    return "xl";
  } else {
    return "2xl";
  }
}
const ProductCardList = ({ Mockdata, sort, type, order }) => {
  // console.log(sort + "--" + type + "--" + order);
  let filteredData = [...Mockdata];

  if (sort === "All") {
    filteredData.sort((a, b) => a.id - b.id);
  } else if (sort === "Type") {
    if (type !== "SortByType") {
      filteredData = filteredData.filter((item) => item.type === type);
    }
  }

  if (order === "LeastPop") {
    filteredData.sort((a, b) => a.pop - b.pop);
  } else if (order === "MostPop") {
    filteredData.sort((a, b) => b.pop - a.pop);
  }

  if (order === "LowestPrice") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (order === "HighestPrice") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  if (order === "OldestDate") {
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (order === "NewestDate") {
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const numRows = filteredData ? Math.ceil(Mockdata.length / 3) : 0;

  const [currentBreakpoint, setCurrentBreakpoint] = useState("");

  useEffect(() => {
    const updateBreakpoint = () => {
      const { innerWidth, innerHeight } = window;
      const breakpoint = getCurrentBreakpoint(innerWidth, innerHeight);
      setCurrentBreakpoint(breakpoint);
    };
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  return (
    <div className="flex flex-wrap">
      {filteredData && filteredData.length > 0 ? (
        filteredData
          .slice(
            0,
            currentBreakpoint === "md" ||
              currentBreakpoint === "sm" ||
              currentBreakpoint === "smr" ||
              currentBreakpoint === "sx"
              ? 2
              : 3
          )
          .map((item, index) => (
            <div
              key={index}
              className="w-2/6 sx:w-full smr:w-1/2 sm:w-3/6 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6 p-3 sx:p-0"
            >
              {item && (
                <ProductCard
                  id={item.id}
                  title={item.title}
                  title_description={item.title_description}
                  full_description={item.full_description}
                  image_t={item.image_t}
                  image_1={item.image_1}
                  image_2={item.image_2}
                  image_3={item.image_3}
                  image_4={item.image_4}
                  image_h={item.image_h}
                  link={item.link}
                  price={item.price}
                  pop={item.pop}
                  date={item.date}
                  type={item.type}
                />
              )}
            </div>
          ))
      ) : (
        <p>No data available</p>
      )}

      {numRows &&
        Array.from({ length: numRows - 1 }, (_, row) => (
          <React.Fragment key={row}>
            {filteredData &&
              filteredData
                .slice(3 + row * 3, 6 + row * 3)
                .map((item, index) => (
                  <div
                    key={index}
                    className="w-1/4 sx:w-full smr:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/4 p-3 sx:p-0"
                  >
                    {item && (
                      <ProductCard
                        id={item.id}
                        title={item.title}
                        title_description={item.title_description}
                        full_description={item.full_description}
                        image_t={item.image_t}
                        image_1={item.image_1}
                        image_2={item.image_2}
                        image_3={item.image_3}
                        image_4={item.image_4}
                        image_h={item.image_h}
                        link={item.link}
                        price={item.price}
                        pop={item.pop}
                        date={item.date}
                        type={item.type}
                      />
                    )}
                  </div>
                ))}
            {!filteredData && (
              <div className="w-1/4 sx:w-full p-3 sx:p-0">
                <p>No data available</p>
              </div>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

const ProductFeed = () => {
  const [sortTab, setSortTab] = useState("All");
  const [orderValue, setOrderValue] = useState("OrderBy");
  const [typeValue, setTypeValue] = useState("SortByType");
  const [currentBreakpoint, setCurrentBreakpoint] = useState("");

  const handleClick = (tab) => {
    if (tab === "All") {
      setSortTab(tab);
      setTypeValue("SortByType");
    } else {
      setSortTab(tab);
    }
  };

  const handleOrderChange = (event) => {
    setOrderValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
  };

  const highlightedItems = Mockdata
    ? Mockdata.filter((item) => item.highlight === true)
    : 0;

  useEffect(() => {
    const updateBreakpoint = () => {
      const { innerWidth, innerHeight } = window;
      const breakpoint = getCurrentBreakpoint(innerWidth, innerHeight);
      setCurrentBreakpoint(breakpoint);
    };
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);
  return (
    <>
      {/* BG-parallax */}
      <div className="h-full w-full top-0 bg-tacao">
        {highlightedItems && highlightedItems.length > 0 ? (
          highlightedItems.map((item, index) => (
            <div key={index} className="w-full">
              {item && (
                <ProductCardHighlight
                  id={item.id}
                  title={item.title}
                  title_description={item.title_description}
                  full_description={item.full_description}
                  image_t={item.image_t}
                  image_p={item.image_p}
                  image_1={item.image_1}
                  image_2={item.image_2}
                  image_3={item.image_3}
                  image_4={item.image_4}
                  image_h={item.image_h}
                  link={item.link}
                  price={item.price}
                  viewport={currentBreakpoint}
                />
              )}
            </div>
          ))
        ) : (
          <div>No highlighted items found.</div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full h-auto">
        <div className="flex justify-start items-center w-full py-12 sx:py-4 smr:py-4 sm:py-8 md:py-12 lg:py-12 xl:py-12 2xl:py-12 px-12 sx:px-4 smr:px-4 sm:px-6 md:px-12 lg:px-12 xl:px-12 2xl:px-12">
          <div className="flex justify-start items-center sx:items-start smr:items-center sm:items-center md:items-center lg:items-center xl:items-center 2xl:items-center w-full">
            <div
              className={`mr-3 p-6 sx:p-4 smr:p-4 sm:p-4 md:p-4 lg:p-6 xl:p-6 2xl:p-6 border-2 rounded-md bg-lightGreenGlint cursor-pointer ${
                sortTab === "All"
                  ? "bg-rhapsodyInBlue border-rhapsodyInBlue text-slate-100"
                  : "bg-lightGreenGlint border-rhapsodyInBlue"
              }`}
              onClick={() => handleClick("All")}
            >
              All
            </div>
            <div className="flex sx:flex-col smr:flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row w-full justify-end items-end">
              <div className="w-fit">
                <select
                  name="typeValue"
                  id="typeValue"
                  className={`p-4 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-4 xl:p-4 2xl:p-4 text-xl sx:text-base smr:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl rounded-md border-2 cursor-pointer border-rhapsodyInBlue focus:ring-blue-500 focus:border-blue-500`}
                  value={typeValue}
                  onChange={handleTypeChange}
                  onClick={() => handleClick("Type")}
                >
                  <option value="SortByType">Sort By Type</option>
                  <option value="Apparel">Apparel</option>
                  <option value="ArtandDecoration">Art and Decor</option>
                  <option value="ToyandHobbies">Toy and Hobbies</option>
                  <option value="Garden">Garden</option>
                  <option value="Consumable">Consumable</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grow"></div>
              <div className="w-fit mt-0 sx:mt-4 smr:mt-0 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0">
                <select
                  name="order"
                  id="order"
                  className="p-4 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-4 xl:p-4 2xl:p-4 text-xl sx:text-base smr:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl rounded-md border-2 cursor-pointer border-rhapsodyInBlue focus:ring-blue-500 focus:border-blue-500"
                  value={orderValue}
                  onChange={handleOrderChange}
                >
                  <option value="OrderBy">Order By</option>
                  <option value="LeastPop">Least Popular</option>
                  <option value="MostPop">Most Popular</option>
                  <option value="LowestPrice">Lowest Price</option>
                  <option value="HighestPrice">Hightest Price</option>
                  <option value="OldestDate">Oldest Date</option>
                  <option value="NewestDate">Newest Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-8 sx:px-2 smr:px-2 sm:px-2 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
          <ProductCardList
            Mockdata={Mockdata}
            sort={sortTab}
            type={typeValue}
            order={orderValue}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFeed;
