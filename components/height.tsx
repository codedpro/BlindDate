"use client";

import Wheel from "@/components/wheel";
import { useStore } from "@/store/use-hooks";
import { useRouter, useSearchParams } from "next/navigation";

const Height = () => {
  const { height, setHeight, setSelectedHeight } = useStore();
  const router = useRouter();

  return (
    <>
      <div className="absolute text-center top-7 text-white w-full z-10">
        <h1>قد</h1>
        <p className="opacity-70 text-sm">قدت چنده؟</p>
      </div>

      <div className="absolute flex flex-col w-full h-full top-0 left-0 justify-evenly items-center bg-black">
        <div className="w-[70px] h-[180px] ml-10">
          <Wheel
            initIdx={21}
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
          disabled={
            // @ts-ignore
            height === null || (height as { value: number }).value < 150
          }
          className="w-3/4 p-3 bg-primary-brand rounded text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={() => {
            // @ts-ignore
            if ((height as { value: number })?.value !== null) {
              // @ts-ignore
              setSelectedHeight((height as { value: number }).value);
              const currentParams = window.location.hash.substring(1);

              router.push(`/onBoard/favorites#${currentParams}`);
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
