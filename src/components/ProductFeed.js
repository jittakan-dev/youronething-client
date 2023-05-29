"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Mockdata from "@data/Mockdata";
const ProductCard = dynamic(() => import("./ProductCard"));
const ProductCardHighlight = dynamic(() => import("./ProductCardHighlight"));

const ProductCardList = ({ Mockdata, sort, type, order }) => {
  //console.log(sort + "--" + order + "--" + type);
  const numRows = Mockdata ? Math.ceil(Mockdata.length / 3) : 0;
  return (
    <div className="flex flex-wrap">
      {Mockdata && Mockdata.length > 0 ? (
        Mockdata.slice(0, 3).map((item, index) => (
          <div key={index} className="w-2/6 sx:w-full p-3 sx:p-0">
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
            {Mockdata &&
              Mockdata.slice(3 + row * 3, 6 + row * 3).map((item, index) => (
                <div key={index} className="w-1/4 sx:w-full p-3 sx:p-0">
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
                    />
                  )}
                </div>
              ))}
            {!Mockdata && (
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
  const [activeTab, setActiveTab] = useState("All");

  const [orderValue, setOrderValue] = useState("OrderBy");

  const [typeValue, setTypeValue] = useState("SortByType");

  const handleClick = (tab) => {
    setActiveTab(tab);
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
  return (
    <>
      {/* BG-parallax */}
      <div className="h-full w-full top-0 bg-slate-700">
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
                  image_1={item.image_1}
                  image_2={item.image_2}
                  image_3={item.image_3}
                  image_4={item.image_4}
                  image_h={item.image_h}
                  link={item.link}
                  price={item.price}
                />
              )}
            </div>
          ))
        ) : (
          <div>No highlighted items found.</div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full h-auto">
        <div className="flex justify-start items-center w-full py-12 px-16 sx:p-0">
          <div className="flex justify-start items-center">
            <div
              className={`p-6 my-2 mr-3 border-2 rounded-md border-slate-600 bg-slate-200 cursor-pointer ${
                activeTab === "All"
                  ? "bg-slate-700 border-slate-700 text-slate-100"
                  : "bg-slate-200"
              }`}
              onClick={() => handleClick("All")}
            >
              All
            </div>

            <div
              className={`p-6 my-2 mr-3 border-2 rounded-md border-slate-600 cursor-pointer ${
                activeTab === "Popular"
                  ? "bg-slate-700  border-slate-700 text-slate-100"
                  : "bg-slate-200 border-slate-600"
              }`}
              onClick={() => handleClick("Popular")}
            >
              Popular
            </div>
            <div>
              <select
                name="typeValue"
                id="typeValue"
                className="p-6 rounded-md border-2 cursor-pointer border-slate-600"
                value={typeValue}
                onChange={handleTypeChange}
              >
                <option value="SortByType" className="p-2 text-xl">
                  Sort By Type
                </option>
                <option value="ArtandDecoration" className="p-2 text-xl">
                  Art and Decoration
                </option>
                <option value="ToyandHobbies" className="p-2 text-xl">
                  Toy and Hobbies
                </option>
                <option value="Garden" className="p-2 text-xl">
                  Garden
                </option>
                <option value="Consumable" className="p-2 text-xl">
                  Consumable
                </option>
                <option value="Other" className="p-2 text-xl">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="grow"></div>
          <div>
            <select
              name="order"
              id="order"
              className="p-6 rounded-md border-2 cursor-pointer border-slate-600"
              value={orderValue}
              onChange={handleOrderChange}
            >
              <option value="OrderBy" className="p-2 text-xl">
                Order By
              </option>
              <option value="LowestPrice" className="p-2 text-xl">
                Lowest Price
              </option>
              <option value="HightestPrice" className="p-2 text-xl">
                Hightest Price
              </option>
              <option value="OldestDate" className="p-2 text-xl">
                Oldest Date
              </option>
              <option value="NewestDate" className="p-2 text-xl">
                Newest Date
              </option>
            </select>
          </div>
        </div>
        <div className="w-full px-12 sx:px-4">
          <ProductCardList
            Mockdata={Mockdata}
            sort={activeTab}
            type={typeValue}
            order={orderValue}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFeed;
