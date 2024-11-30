import React, { useEffect } from "react";


interface ListProps {
  setIsCityOpen: (isOpen: boolean) => void;
  setCity: (city: string) => void;
  cities: string[];
  records: number;
  setHasMore: (hasMore: boolean) => void;
  setrecords: (records: number) => void;
  itemsPerPage: number;
}

function List({
  setIsCityOpen,
  setCity,
  cities,
  records,
  setHasMore,
  setrecords,
  itemsPerPage,
}: ListProps) {
  useEffect(() => {
    if (cities.length === 0) {
      document.querySelector(".not-found")?.classList.remove("hidden");
    } else {
      document.querySelector(".not-found")?.classList.add("hidden");
    }
  }, [cities]);

  const loadMore = () => {
    if (records === cities.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setrecords(records + itemsPerPage);
      }, 4000);
    }
  };

  return (
    <>
      <div
        data-value="1566262000"
        className="grid overflow-hidden transition-all duration-200 active:bg-active-secondary opacity-100 grid-rows-1fr city-item fadeShow4"
        style={{
          transition: "opacity 0.3s 0.15s",
          gridTemplateRows: "0.3s",
        }}
      >
        <div
          className="relative flex items-center w-full h-full cursor-pointer ease-in-out overflow-hidden"
          onClick={(e) => {
            setIsCityOpen(false);
            const target = e.target as HTMLElement; // Typecasting e.target
            setCity(target.innerText);
          }}
        >
          <div
            className="relative w-full ml-4 pr-4 border-solid border-b-[0.33px] border-wallet-separator py-3"
            style={{
              transition: "padding-top 0.3s",
              paddingBottom: "0.3s",
            }}
          ></div>
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
    </>
  );
}

export default List;
