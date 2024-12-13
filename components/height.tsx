"use client";

import Wheel from "@/components/wheel";
import { useStore } from "@/store/use-hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Height = () => {
  const { height, setHeight, setSelectedHeight, appData } = useStore();
  const router = useRouter();

  useEffect (() => {
    console.log(appData, height)
  }, [height,appData])
  return (
    <>
      <div className="absolute text-center top-7 text-white w-full z-10">
        <h1>قد</h1>
        <p className="opacity-70 text-sm">قدت چنده؟</p>
      </div>

      <div className="absolute flex flex-col w-full h-full top-0 left-0 justify-evenly items-center bg-black">
        <div className="w-[70px] h-[180px] ml-10"> 
          <Wheel
            initIdx={180}
            length={221}
            minValue={149}
            maxValue={220}
            width={20}
            loop
            label="cm"
            state={height}
            setState={setHeight}
          />
        </div>

        <button
          disabled={height === null || height < 150}
          className="w-3/4 p-3 bg-primary-brand rounded text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={() => {
            if (height !== null) {
              setSelectedHeight(height);
              router.push(`/onBoard/favorites/#${appData}`);
            }
          }}
        >
          بعدی
        </button>
      </div>
    </>
  );
};

export default Height;
