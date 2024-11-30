"use client";
import { useStore } from "@/store/use-hooks";
import axios from "axios";
import NavBar from "@/app/components/navBar";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";

const HomePage = () => {
  const {
    name,
    selectedAge,
    city,
    selectedHeight,
    bio,
    setCurrentTime,
    img1,
    currentTime,
    img2,
    img3,
    img4,
    key,
    gender,
    appData,
    favorites,
    setToken,
    inDate,
  } = useStore();

  const router = useRouter();

  function changeTime(stamp: number): string {
    var date = new Date(stamp * 1000);

    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = date.getMinutes();

    // Seconds part from the timestamp
    var seconds = date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  }

  async function getTime() {
    try {
      const time = await axios.get("https://api.keybit.ir/time/");

      // If time.data.timestamp.en is a number (like a Unix timestamp)
      setCurrentTime(changeTime(time.data.timestamp.en));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // async function setDate() {
  //   const sdata = {
  //     app_data: appData,
  //     key,
  //     gender: `${gender == "male" ? 0 : 1}`,
  //     age: selectedAge,
  //     city,
  //   };

  //   try {
  //     const sendDataa = await axios.post(
  //       "https://api.blinddatepersian.site/index.php/SetDate",
  //       JSON.stringify(sdata),

  //       { "Content-Type": "application/json" }
  //     );

  //     console.log(JSON.stringify(data));

  //     toast("درخواست شما ثبت شد. ساعت 11 شب آنلاین شوید", {
  //       autoClose: 4000,
  //       position: "top-center",
  //       theme: "dark",
  //     });
  //   } catch (err) {
  //     toast("مشکلی پیش آمد", {
  //       autoClose: 4000,
  //       position: "top-center",
  //       theme: "dark",
  //     });
  //   }
  // }

  // useEffect(() => {
  //   // if (
  //   //   (name,
  //   //   selectedAge ||
  //   //     city ||
  //   //     selectedHeight ||
  //   //     bio ||
  //   //     img1 ||
  //   //     img2 ||
  //   //     img3 ||
  //   //     img4 ||
  //   //     setImg1 ||
  //   //     setImg2 ||
  //   //     setImg3 ||
  //   //     setImg4)
  //   // ) {
  //   //   async function getData(params) {
  //   //     try {
  //   //       const data = {
  //   //         appData,
  //   //       };
  //   //       const sendData = await axios.post("url", JSON.stringify(data));
  //   //       setSelectedAge(sendData.age)
  //   //       setBio(sendData.bio)
  //   //       setCity(sendData.city)
  //   //       setSelectedHeight(sendData.height)
  //   //     } catch (err) {
  //   //       console.log(err);
  //   //     }
  //   //   }
  //   // }

  // });

  async function setDate() {
    const data = {
      app_data: appData,
      key,
      gender: gender === "male" ? 0 : 1,
      age: selectedAge,
      city,
    };

    try {
      const sendDataa = await axios.post(
        "https://api.blinddatepersian.site/index.php/SetDate",
        JSON.stringify(data)
      );

      if (sendDataa.data.status == false) {
        return toast("قبلا درخواست دادی", {
          autoClose: 4000,
          position: "top-center",
          theme: "dark",
        });
      }

      toast("درخواست شما ثبت شد. ساعت 11 شب آنلاین شوید", {
        autoClose: 4000,
        position: "top-center",
        theme: "dark",
      });
    } catch (err) {
      console.error("Error:", err); // خطا را چاپ کنید
      toast("مشکلی پیش آمد", {
        autoClose: 4000,
        position: "top-center",
        theme: "dark",
      });
    }
  }

  async function getRoomKey() {
    try {
      const data = {
        app_data: appData,
        key,
      };

      const getKey = await axios.post(
        "https://api.blinddatepersian.site/index.php/GetKeyRoom",
        JSON.stringify(data)
      );

      if (getKey.data.token !== "null") {
        setToken(getKey.data.token);
      } else {
        return toast(
          "متاسفانه پارتنر مناسبی برای شما پیدا نشد.دوباره درخواست خود را ارسال کنید",
          {
            autoClose: 6000,
            position: "top-center",
            theme: "dark",
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (Number(currentTime) === 23 || Number(currentTime) === 0) getRoomKey();
  }, [currentTime]);

  useEffect(() => {
    if (bio == "") router.push(`/#${appData}`);
  }, []);

  return (
    <>
      <div
        className="text-3xl overflow-auto flex flex-col  h-screen "
        style={{
          height: "92vh",
          backgroundColor: "#0C0F14",
          color: "white",
          paddingBottom: "15px",
        }}
      >
        <div
          className="header flex justify-between w-full "
          style={{
            height: "max-content",
            padding: "12px 0.8rem",
            backgroundColor: "black !important",
            alignItems: "center",
          }}
        >
          <div
            className=""
            style={{
              fontSize: "smaller",
              backgroundImage: "url(/icons/logo.svg)",
              width: "45px",
              height: "45px",
            }}
          ></div>
          {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#FCFCFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#FCFCFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#FCFCFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
          <p
            style={{
              fontFamily: "cursive !important",
              fontStyle: "italic",
            }}
          >
            BlindDate
          </p>
        </div>

        <div className="w-full flex flex-col UploadImages_photosContainer__AAIqS2">
          <label>
            <img
              src={img1 || "/path/to/default-image.jpg"}
              className="w-full uploaded-img"
            />
          </label>
          <label>
            <img
              src={img2 || "/path/to/default-image.jpg"}
              className="w-full uploaded-img"
            />
          </label>
          <label>
            <img
              src={img3 || "/path/to/default-image.jpg"}
              className="w-full uploaded-img"
            />
          </label>
          <label>
            <img
              src={img4 || "/path/to/default-image.jpg"}
              className="w-full uploaded-img"
            />
          </label>
        </div>

        <div
          className="w-full  "
          dir="rtl"
          style={{
            paddingRight: "15px",
            paddingTop: "0px",
            paddingBottom: "8px",
            fontSize: "24px",
            transform: "translateY(10px)",
            display: "flex",
            justifyContent: "start",
            gap: "20px",
          }}
        >
          <div className="">
            {name}، {selectedAge} ساله
          </div>
          <div
            className={`profile-icon profile-icon-man ${
              Number(selectedAge) >= 20
                ? "profile-icon-man"
                : "profile-icon-boy"
            }`}
          ></div>
        </div>
        <div
          className="flex  p-4 text-small"
          style={{ justifyContent: "end", gap: "1rem", paddingBottom: "12px" }}
        >
          <div className="flex items-center gap-1">
            {`${selectedHeight} cm`}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4697 19V5C21.4697 3 20.4697 2 18.4697 2H14.4697C12.4697 2 11.4697 3 11.4697 5V19C11.4697 21 12.4697 22 14.4697 22H18.4697C20.4697 22 21.4697 21 21.4697 19Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.4697 6H16.4697"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.4697 18H15.4697"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.4697 13.95L16.4697 14"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.4697 10H14.4697"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5.49027 2C3.86027 2 2.53027 3.33 2.53027 4.95V17.91C2.53027 18.36 2.72027 19.04 2.95027 19.43L3.77027 20.79C4.71027 22.36 6.26027 22.36 7.20027 20.79L8.02027 19.43C8.25027 19.04 8.44027 18.36 8.44027 17.91V4.95C8.44027 3.33 7.11027 2 5.49027 2Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8.44027 7H2.53027"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            {city}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
              />
              <path
                d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
        <div className="favorites w-full p-4 text-end">
          <p>علاقه مندی ها </p>
          <div className="favorites-list">
            {favorites.map((f) => (
              <div key={f} className="favorites-list-item">
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="bio p-4" style={{ textAlign: "end", paddingTop: 0 }}>
          <p style={{ color: "#c1cbd9", fontSize: "12px" }}>بیوگرافی</p>
          <p style={{ fontSize: "14px" }}>{bio}</p>
        </div>

        <button
          onClick={setDate}
          className=""
          style={{
            width: "50%",
            margin: "0 auto",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "12px",
            backgroundColor: "#b31713",
            color: "#fff",
          }}
        >
          درخواست دیت
        </button>

        <NavBar active={"profile"} />
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
