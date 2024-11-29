// Height.tsx
"use client";

import Wheel from "./wheel";
import { useUserStore, useAppStore } from "@/store"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Height: React.FC = () => {
  const { height, setHeight, setSelectedHeight } = useUserStore();
  const { appData } = useAppStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const router = useRouter();

  return (
    <>
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          top: "28px",
          color: "#fff",
          width: "100%",
          zIndex: 1,
        }}
      >
        <h1>قد</h1>
        <p
          style={{
            opacity: "70%",
            fontSize: "small",
          }}
        >
          قدت چنده؟
        </p>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          width: "100%",
          top: "0px",
          left: "0px",
          justifyContent: "space-evenly",
          alignItems: "center",
          background: "#000",
        }}
      >
        <div
          className={`${isLoading ? "z-[-1]" : ""}`}
          style={{ width: 70, height: 180, marginLeft: "40px" }}
        >
          <Wheel
            initIdx={height || 180}
            length={221}
            width={20}
            loop
            label="cm"
            onValueChange={(value) => {
              setHeight(value);
            }}
          />
        </div>

        <div
          className={` ${!isLoading ? "hidden" : ""} Spinner_wrapper__wnbCd`}
          style={{ position: "absolute", top: "30%" }}
        >
          <div className="Spinner_container__6yh3a">
            <svg className="Spinner_circular__lPlDK" viewBox="25 25 50 50">
              <circle
                className="Spinner_path__auhlW"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeMiterlimit="10"
              ></circle>
            </svg>
          </div>
        </div>

        <button
          disabled={height == null || height < 150 || isLoading}
          className="p-4 text-black mt-3 hover:bg-white hover:text-black transition duration-100 font-bold"
          style={{ backgroundColor: "white", width: "40%" }}
          onClick={() => {
            if (height != null) {
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
