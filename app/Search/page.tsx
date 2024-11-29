"use client";

import DecisionButtons from "@/components/DecisionButtons";
import FavoritesList from "@/components/FavoritesList";
import NavBar from "@/components/navBar";
import RandomSearchButton from "@/components/RandomSearchButton";
import UserDetails from "@/components/UserDetails";
import UserImages from "@/components/UserImages";
import { useUserStore } from "@/store";

const Search = () => {
  const {
    name,
    selectedAge,
    city,
    selectedHeight,
    bio,
    img1,
    img2,
    img3,
    img4,
    favorites,
  } = useUserStore();

  return (
    <div style={{ background: "#0C0F14", height: "100vh" }}>
      <RandomSearchButton />

      <p className="text-end text-gray-400 text-sm w-[90%] mx-auto py-2">
        جستجوی تصادفی
      </p>

      <div className="search-content bg-secondary rounded-lg w-[90%] mx-auto h-[66vh] overflow-auto">
        <NavBar active={"search"} />
        <UserImages images={[img1, img2, img3, img4]} />
        <UserDetails
          name={name}
          age={selectedAge}
          height={selectedHeight}
          city={city}
        />
        <FavoritesList favorites={favorites} />
        <div className="bio px-4 text-end">
          <p className="text-sm">{bio}</p>
        </div>
      </div>
      <DecisionButtons />
      {/* <SearchFilter /> */}
    </div>
  );
};

export default Search;
