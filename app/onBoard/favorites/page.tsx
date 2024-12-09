"use client";
import { useStore } from "@/store/use-hooks";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/forms/Checkbox";
import { FaHeart } from "react-icons/fa"; // Import React Icon

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
  const { favorites, setFavorites, appData, bio } = useStore();
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

  const handleConfirmFavorites = () => {
    if (selectedFavorites.length === 3) {
      setFavorites(selectedFavorites);
      toast("✅ انتخاب‌ها ثبت شد", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    } else {
      toast("❗ دقیقا سه مورد انتخاب کنید", {
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
    <div
      className="flex flex-col justify-between min-h-screen bg-[#000000] text-white"
    >
      {/* Content */}
      <div className="flex-grow w-full max-w-lg mx-auto overflow-y-auto p-4">
        <div className="w-full bg-[#1c1c1d] p-6 rounded-lg">
          <div className="flex items-center justify-center mb-5">
            <FaHeart className="text-red-500 text-2xl mr-2" /> {/* Icon */}
            <h2 className="text-lg font-bold text-center">علاقه مندی ها</h2>
          </div>
          {/* Checkbox List */}
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
      {/* Button at the Bottom */}
      <div className="w-full p-4">
        <button
          onClick={() => {
            handleConfirmFavorites();
            router.push(`/onBoard/jobs/#${appData}`);
          }}
          disabled={selectedFavorites.length !== 3}
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
