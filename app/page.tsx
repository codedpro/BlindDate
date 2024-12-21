"use client";
import { useStore } from "@/store/use-hooks";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Home() {
  const {
    chatId,
    setGender,
    setSelectedAge,
    setSelectedHeight,
    setFavorites,
    setBio,
    setCity,
    setName,
    setImg1,
    setImg2,
    setImg3,
    setImg4,
    setKey,
  } = useStore();

  const [folder, setFolder] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [channels, setChannels] = useState<string[] | null>(null);

  const router = useRouter();
  const [currentParams, setCurrentParams] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      setCurrentParams(hash);
    }
  }, []);

  async function checkChannels() {
    setChecking(true);

    if (!currentParams) {
      console.error("No hash found in the URL.");
      setChecking(false);
      return;
    }

    try {
      const data = {
        app_data: currentParams,
      };
      const getChannels = await axios.post(
        "https://api.blinddatepersian.site/index.php/CheckJoin",
        JSON.stringify(data)
      );
      if (
        getChannels.data.status === false ||
        getChannels.data.how === "left"
      ) {
        setChannels(getChannels.data.channels);

        setTimeout(() => {
          setChecking(false);
        }, 5000);
      } else if (getChannels.data.how !== "left") {
        getProfile();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getProfile = async () => {
    try {
      const data = {
        chat_id: chatId,
        app_data: currentParams,
      };

      const sendData = await axios.post(
        "https://api.blinddatepersian.site/index.php/GetProfile",
        JSON.stringify(data)
      );
      console.log(sendData);
      if (sendData.data.status === "User Not Found !") {
        console.log(data);
        router.push(`/onBoard/#${currentParams}`);
      }
      const profile = sendData.data.data[0];

      setKey(profile.key);
      setFolder(profile.photos);
      setSelectedAge(profile.age);
      setName(profile.first_name);
      setBio(profile.bio);
      setSelectedHeight(profile.height);
      setCity(profile.city);

      const str = profile.favorites;
      const arr = str.split(",");
      const filteredArr = arr.filter((item: string) => item !== "");
      setGender(profile.gender === 0 ? "male" : "female");
      setFavorites(filteredArr);
    } catch (err) {
      toast(err as string, {
        autoClose: 4000,
        position: "top-center",
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (folder !== null) {
      setImg1(`https://api.blinddatepersian.site/images/${folder}/1.png`);
      setImg2(`https://api.blinddatepersian.site/images/${folder}/2.png`);
      setImg3(`https://api.blinddatepersian.site/images/${folder}/3.png`);
      setImg4(`https://api.blinddatepersian.site/images/${folder}/4.png`);
      router.push(`/Home/#${currentParams}`);
    }
  }, [folder, currentParams]);

  useEffect(() => {
    checkChannels();
  }, [currentParams]);

  return (
    <>
      {channels ? (
        <div className="h-screen flex justify-center items-center">
          <div className="bg-gray-800 flex flex-col gap-4 p-8 z-10 rounded-lg text-right">
            <h2 className="mb-6">:برای ادامه باید در کانال های زیر عضو شوید</h2>
            {channels?.map((c, i) => (
              <a
                href={c}
                className={`p-2 border border-white rounded-lg transition-opacity ${
                  checking ? "opacity-60" : ""
                }`}
                key={i}
              >
                {`کانال شماره ${i + 1}`}
              </a>
            ))}

            <button
              disabled={checking}
              onClick={checkChannels}
              className="w-full mx-auto mb-3 p-2 rounded-lg bg-red-700 text-white disabled:opacity-60"
            >
              بررسی
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <h2 className="w-full text-lg text-center absolute bottom-[25%]">
        <p className="loading-p">
          درحال بارگذاری <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
        </p>
      </h2>
      <div className="container absolute m-auto top-0 left-0 bottom-[30%] right-0 w-full h-[400px]">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
