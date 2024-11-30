// app/page.tsx

"use client";
import { format } from "date-fns-tz";
import { useStore } from "@/store/use-hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Channel {
  url: string; // Assuming each channel has a 'url' property
}

interface Profile {
  key: string;
  photos: string;
  age: number;
  first_name: string;
  bio: string;
  height: number;
  city: string;
  favorites: string;
  gender: number;
  in_date: string;
}

function Home() {
  const {
    chatId,
    appData,
    setGender,
    setSelectedAge,
    setSelectedHeight,
    setFavorites,
    setBio,
    setCity,
    setName,
    setChatRoomID, // Corrected setter name
    setImg1,
    setImg2,
    setImg3,
    setImg4,
    setKey,
    roomkey,
    setRoomKey, // Corrected setter name
  } = useStore();

  const [folder, setFolder] = useState<string | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [inDate, setInDate] = useState<string | null>(null); // Added state for inDate
  const [currentTime, setCurrentTime] = useState<string>("");

  const router = useRouter();

  async function checkChannels() {
    setChecking(true);
    try {
      const data = {
        app_data: appData,
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
      // Ensure that err is either an Error or string to avoid type issues
      return toast(err instanceof Error ? err.message : String(err), {
        autoClose: 4000,
        position: "top-center",
        theme: "dark",
      });
    }
  }

  const getProfile = async () => {
    try {
      const data = {
        chat_id: chatId,
        app_data: appData,
      };

      const sendData = await axios.post(
        "https://api.blinddatepersian.site/index.php/GetProfile",
        JSON.stringify(data)
      );

      if (sendData.data.status === "User Not Found !") {
        router.push(`/onBoard/#${appData}`);
      }
      const profile: Profile = sendData.data.data[0];

      setKey(profile.key.toString());
      setFolder(profile.photos);
      setSelectedAge(profile.age.toString());
      setName(profile.first_name);
      setBio(profile.bio);
      setSelectedHeight(profile.height);
      setCity(profile.city);

      const str = profile.favorites;
      const arr = str.split(",");

      // حذف عناصر خالی در انتهای آرایه (در صورت وجود)
      const filteredArr = arr.filter((item) => item !== "");
      setGender(profile.gender === 0 ? "male" : "female");
      setFavorites(filteredArr);
      setInDate(profile.in_date);
    } catch (err) {
      // Ensure that err is either an Error or string to avoid type issues
      return toast(err instanceof Error ? err.message : String(err), {
        autoClose: 4000,
        position: "top-center",
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (folder !== null) {
      setImg1(`https://api.blinddatepersian.site/images/${folder}/1.png`);
      setImg2(`https://api.blinddatepersian.site/images//${folder}/2.png`);
      setImg3(`https://api.blinddatepersian.site/images//${folder}/3.png`);
      setImg4(`https://api.blinddatepersian.site/images//${folder}/4.png`);
      router.push(`/Home/#${appData}`);
    }
  }, [folder]);

  useEffect(() => {
    checkChannels();
    // getProfile();
  }, []);

  return (
    <>
      {channels ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#292727",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              padding: "7% 7%",
              zIndex: "1",
              borderRadius: "12px",
              textAlign: "end",
            }}
          >
            <h2
              style={{
                marginBottom: "25px",
              }}
            >
              :برای ادامه باید در کانال های زیر عضو شوید
            </h2>
            {channels?.map((c, i) => (
              <a
                href={c.url} // Use 'url' property from Channel object
                key={i}
                style={{
                  padding: "5px 10px",
                  border: "1px solid #fff",
                  borderRadius: "10px",
                  opacity: checking ? "60%" : "",
                  transition: "200ms",
                }}
              >
                {`کانال شماره ${i + 1}`}
              </a>
            ))}

            <button
              disabled={checking}
              onClick={checkChannels}
              className=""
              style={{
                width: "100%",
                margin: "0 auto",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: "#b31713",
                color: "#fff",
              }}
            >
              بررسی
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <h2
        style={{
          width: "100%",
          fontSize: "22px",
          textAlign: "center",
          position: "absolute",
          bottom: "25%",
        }}
      >
        <p className="loading-p">
          درحال بارگذاری <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
        </p>
      </h2>
      <div
        className="container"
        style={{
          position: "absolute",
          margin: "auto",
          top: "0",
          left: "0",
          bottom: "30%",
          right: "0",
          width: "90%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "30px",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          {inDate && format(new Date(inDate), "dd MMM yyyy")}
        </h1>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
