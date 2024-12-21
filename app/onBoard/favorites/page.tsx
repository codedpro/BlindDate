"use client";
import { useStore } from "@/store/use-hooks";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/forms/Checkbox";
import { FaHeart } from "react-icons/fa";

const predefinedFavorites = [
  "ورزش",
  "موسیقی",
  "کتاب‌خوانی",
  "فیلم و سریال",
  "سفر",
  "آشپزی",
  "عکاسی",
  "هنرهای دستی",
  "بازی‌های کامپیوتری",
  "یادگیری زبان",
];

const Favorites = () => {
  const { setFavorites, appData, bio } = useStore();
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);

  const router = useRouter();

  const handleSelectFavorite = (value: string) => {
    if (selectedFavorites.includes(value)) {
      setSelectedFavorites((prev) => prev.filter((item) => item !== value));
    } else if (selectedFavorites.length < 3) {
      setSelectedFavorites((prev) => [...prev, value]);
    } else {
      toast("🙄 فقط می‌توانید سه مورد انتخاب کنید", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
  };
  const [currentParams, setCurrentParams] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      setCurrentParams(hash);
    }
  }, []);

  const handleConfirmFavorites = () => {
    if (selectedFavorites.length >= 1) {
      setFavorites(selectedFavorites);
      toast("✅ انتخاب‌ها ثبت شد", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
      router.push(`/onBoard/jobs#${currentParams}`);
    } else {
      toast("❗ حداقل یک مورد را انتخاب کنید", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (bio === "") router.push(`/#${appData}`);
  }, [bio, appData, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      <div
        dir="rtl"
        className="flex-grow w-full max-w-lg mx-auto h-32 overflow-y-auto p-4"
      >
        <div className="w-full bg-[#1c1c1d] p-6 rounded-lg">
          <div className="flex items-center justify-center mb-5">
            <FaHeart className="text-red-500 text-2xl ml-2" />
            <h2 className="text-lg font-bold text-center">علاقه مندی ها</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {predefinedFavorites.map((fav, index) => (
              <Checkbox
                key={index}
                id={`fav-${index}`}
                name="favorites"
                value={fav}
                label={fav}
                checked={selectedFavorites.includes(fav)}
                onChange={handleSelectFavorite}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <button
          onClick={handleConfirmFavorites}
          disabled={selectedFavorites.length < 1}
          className="w-full p-3 bg-primary-brand rounded text-white disabled:bg-gray-500"
        >
          ادامه
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Favorites;
