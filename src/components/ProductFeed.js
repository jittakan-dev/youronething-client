import React from "react";
import dynamic from "next/dynamic";
import Mockdata from "@data/Mockdata";
const ProductCard = dynamic(() => import("./ProductCard"));
const ProductCardHighlight = dynamic(() => import("./ProductCardHighlight"));

const ProductCardList = ({ Mockdata }) => {
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
  const highlightedItems = Mockdata
    ? Mockdata.filter((item) => item.highlight === true)
    : 0;
  return (
    <>
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
        <div className="flex flex-col justify-center items-center w-full p-12 sx:p-0">
          All Newest Popular
        </div>
        <div className="w-full px-12 sx:px-4">
          <ProductCardList Mockdata={Mockdata} />
        </div>
      </div>
    </>
  );
};

export default ProductFeed;
