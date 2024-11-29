"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useCheckChannels } from "@/hooks/useCheckChannels";
import ChannelList from "@/components/ChannelList";
import { getProfile } from "@/services/api";
import { useUserStore, useAppStore } from "@/store";

function Home() {
  const router = useRouter();

  // User Store
  const {
    chatId,
    setKey,
    setFolder,
    setSelectedAge,
    setName,
    setBio,
    setSelectedHeight,
    setCity,
    setFavorites,
    setImg1,
    setImg2,
    setImg3,
    setImg4,
  } = useUserStore();

  const { appData } = useAppStore();

  const { channels, checking, checkChannels } = useCheckChannels(appData || "");

  const handleGetProfile = useCallback(async () => {
    const validAppData = appData || "";
  
    if (!chatId || !validAppData) {
      toast.error("Missing chat ID or app data.", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
  
    try {
      const profile = await getProfile(chatId, validAppData);
  
      if (profile.status === "User Not Found !") {
        router.push(`/onBoard/#${validAppData}`);
        return;
      }
  
      const userData = profile.data[0];
      setKey(userData.key);
      setFolder(userData.photos || null);
      setSelectedAge(userData.age || null);
      setName(userData.first_name || "");
      setBio(userData.bio || "");
      setSelectedHeight(userData.height || null);
      setCity(userData.city || null);
  
      const favorites = (userData.favorites || "").split(",").filter((item: string) => item);
      setFavorites(favorites);
  
      const folderPath = `https://api.blinddatepersian.site/images/${userData.photos}`;
      setImg1(userData.photos ? `${folderPath}/1.png` : null);
      setImg2(userData.photos ? `${folderPath}/2.png` : null);
      setImg3(userData.photos ? `${folderPath}/3.png` : null);
      setImg4(userData.photos ? `${folderPath}/4.png` : null);
    } catch (err) {
      toast.error("خطا در دریافت پروفایل", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  }, [chatId, appData, setKey, setFolder, setSelectedAge, setName, setBio, setSelectedHeight, setCity, setFavorites, setImg1, setImg2, setImg3, setImg4, router]);
  
  useEffect(() => {
    if (channels === null) {
      checkChannels();
    }
  }, [channels, checkChannels]);

  useEffect(() => {
    handleGetProfile();
  }, [handleGetProfile]);

  return (
    <>
      {channels ? (
        <ChannelList channels={channels} checking={checking} onCheckChannels={checkChannels} />
      ) : (
        <div className="text-center absolute bottom-1/4 w-full text-white text-lg">
          <p>
            درحال بارگذاری <span className="animate-pulse">...</span>
          </p>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Home;
