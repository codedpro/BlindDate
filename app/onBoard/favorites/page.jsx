"use client";
import { useStore } from "@/store/use-hooks";
import { toast, ToastContainer, Zoom, Bounce } from "react-toastify";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const { favorites, setFavorites, appData, bio } = useStore();
  const [favorite, setFavorite] = useState("");

  const router = useRouter();

  function handleDelete(selected) {
    const items = favorites.filter((item) => {
      return item !== selected;
    });

    setFavorites(items);
  }

  function handleAddItem() {
    if (favorites?.length > 4)
      return toast("👌🏼چهار تا بسه ", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });

    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    if (!persianRegex.test(favorite)) {
      return toast("علایق ات رو به فارسی وارد کن", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
    favorites.map((i) => {
      if (i === favorite) {
        favorites.filter((i) => i == favorite);
        return toast("🙄علایق تکراری ننویس", {
          autoClose: 3000,
          position: "top-center",
          theme: "dark",
        });
      }
    });
    const items = favorites.push(favorite);

    const unique = [...new Set(favorites)];

    setFavorites(unique);
    setFavorite("");
  }
  useEffect(() => {
    if (bio == "") router.push(`/#${appData}`);
  }, []);
  return (
    // <div className="fav-container">
    //   <div className="fav-form">
    //     <div className="add-fav-container">
    //       <input
    //         dir="auto"
    // value={favorite}
    // onChange={(e) => {
    //   setFavorite(e.target.value);
    // }}
    //         type="text"
    //         placeholder="علاقه مندی"
    //       />
    //       <button
    //         disabled={favorites?.length >= 7 || favorite?.length < 3}
    //         onClick={handleAddItem}
    //       >
    //         اضافه کن
    //       </button>
    //     </div>
    //     <div className="fav-list">
    //       {favorites.map((f, i) => (
    //         <div className="fav-item">
    //           <p>{f}</p>
    //           <div className="" onClick={() => handleDelete(f)}>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //       ))}
    //       {favorites?.length == 0 ? (
    //         <div
    //           style={{
    //             opacity: "80%",
    //             margin: "30px",
    //             width: "100%",
    //             textAlign: "center",
    //           }}
    //         >
    //           به چیا علاقه داری؟ اضافه کن
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   </div>
    // <button
    //   onClick={() => {
    //     router.push("/onBoard/pictures");
    //   }}
    //   disabled={favorites.length == 0}
    //   className="p-3 bg-white w-[70%] mx-auto"
    //   style={{
    //     width: "55%",
    //     padding: "10px",
    //     display: "block",
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     marginTop: "5rem",
    //   }}
    // >
    //   ادامه
    // </button>
    //   <ToastContainer />
    // </div>

    <div
      className=""
      style={{
        background: "#000",
        minHeight: "100vh",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container"
        style={{
          background: "#0C0F14",
          padding: "25px",
          width: "90%",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            paddingLeft: "5px",
            justifyContent: "center",
          }}
        >
          <img src="/images/notebook.png" height="40px" width="40px" />
          <h2
            style={{
              fontWeight: "700",
              fontSize: "larger",
              color: "#fff",
            }}
          >
            علاقه مندی ها
          </h2>
        </div>
        <div
          className="todo-body"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#222223",
            borderRadius: "30px",

            marginBottom: "25px",
          }}
        >
          <input
            dir="auto"
            type="text"
            id="todoText"
            value={favorite}
            onChange={(e) => {
              setFavorite(e.target.value);
            }}
            className="todo-input"
            placeholder="!بنویس"
            style={{
              flex: "1",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "20px",
              textAlign: "right",
              transform: "translateX(-15px)",
            }}
          />
          <button
            disabled={favorite.length < 3}
            style={{
              cursor: "pointer",
              borderRadius: "40px",
              height: "50px",
              width: "50px",
              padding: "15px",
              color: "#fff",
              background: "rgb(220, 5, 23)",
            }}
            onClick={handleAddItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <ul id="list-items" className="list-items">
          {favorites.map((i) => (
            <li
              key={i + 55}
              className=""
              style={{
                color: "#ffffffa3",
                listStyle: " none",
                fontSize: " 18px",
                cursor: "pointer",
                padding: " 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#222223",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <div>
                <svg
                  style={{
                    width: "30px",
                    height: "30px",
                    padding: " 3px",
                    marginRight: " 5px",
                    color: "red",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="size-6"
                  onClick={() => handleDelete(i)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
              <div> {i}</div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          router.push(`/onBoard/pictures/#${appData}`);
        }}
        disabled={favorites.length < 2}
        className="p-3 bg-white w-[70%] mx-auto"
        style={{
          width: "55%",
          padding: "10px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
        }}
      >
        ادامه
      </button>
      <ToastContainer />
    </div>
  );
};

export default Favorites;
