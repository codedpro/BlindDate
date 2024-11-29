"use client";

import React, { useEffect, useState } from "react";

interface ListProps {
  setIsCityOpen: (isOpen: boolean) => void;
  setCity: (city: string) => void;
  cities: string[];
}

const List: React.FC<ListProps> = ({ setIsCityOpen, setCity, cities }) => {
  const [records, setRecords] = useState<number>(10); // Initial number of records to show
  const [hasMore, setHasMore] = useState<boolean>(true); // Determines if more records can be loaded
  const itemsPerPage = 10; // Number of items to load per page

  useEffect(() => {
    const notFoundElement = document.querySelector(".not-found");
    if (cities.length === 0) {
      notFoundElement?.classList.remove("hidden");
    } else {
      notFoundElement?.classList.add("hidden");
    }
  }, [cities]);

  const loadMore = () => {
    if (records >= cities.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setRecords((prev) => prev + itemsPerPage);
      }, 4000);
    }
  };

  return (
    <>
      {cities.slice(0, records).map((city, index) => (
        <div
          key={index}
          data-value="1566262000"
          className="grid overflow-hidden transition-all duration-200 active:bg-active-secondary opacity-100 grid-rows-1fr city-item fadeShow4"
          style={{
            transition: "opacity 0.3s 0.15s",
            gridTemplateRows: "0.3s",
          }}
        >
          <div
            className="relative flex items-center w-full h-full cursor-pointer ease-in-out overflow-hidden"
            onClick={() => {
              setIsCityOpen(false);
              setCity(city);
            }}
          >
            <div
              className="relative w-full ml-4 pr-4 border-solid border-b-[0.33px] border-wallet-separator py-3"
              style={{
                transition: "padding-top 0.3s",
                paddingBottom: "0.3s",
              }}
            >
              {city}
            </div>
            <div className="absolute top-1.5 right-4 transition-opacity opacity-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="28"
                fill="none"
              >
                <path
                  stroke="#007AFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.33"
                  d="m1.5 15.5 4.332 5.294c.083.102.24.093.311-.018L14 8.5"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </>
  );
};

export default List;
