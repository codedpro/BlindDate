"use client";
import { useEffect, useRef, useState } from "react";
import Wheel from "../components/wheel.tsx";
import { citiesData } from "../../data/bataCities";
import { useStore } from "../../store/use-hooks";
import Height from "../../components/height";

import { toast, ToastContainer, Zoom, Bounce } from "react-toastify";

const CreateProfile = () => {
  const {
    cities,
    gender,
    provinces,
    province,
    query,
    age,
    selectedAge,

    bio,
    city,
    name,
    isAgeOpen,
    isCityOpen,
    setAge,
    setSelectedAge,
    setGender,
    setCities,
    setProvinces,
    setProvince,
    setQuery,
    setBio,
    setCity,
    setName,
    setIsAgeOpen,
    setIsCityOpen,
  } = useStore();

  const [isHeightOpen, setIsHeightOpen] = useState(false);

  useEffect(() => {
    // if (province == null) {
    //   const filteredProvinces = provincesData?.filter((p) =>
    //     p.name.includes(query)
    //   );
    //   setProvinces(filteredProvinces);
    // }

    const filteredCities = citiesData?.filter((city) =>
      city.name.includes(query)
    );

    setCities(filteredCities);
    // console.log(filteredCities);
  }, [query]);

  // useEffect(() => {
  //   const filteredCities = citiesData?.filter(
  //     (city) => city.province_id == province
  //   );

  //   setCities(filteredCities);
  // }, [province]);

  useEffect(() => {
    const items = document?.querySelectorAll(".city-item") || null;
    items.forEach((i) => {
      if (i.textContent == " ") {
        console.log("added");
        i.classList.add("hidden");
      }
    });
    document.querySelector(".text-box").textContent = bio;
  }, []);

  useEffect(() => {
    if (cities.length == 0 && province) {
      const element = document?.querySelector(".not-found");

      element?.classList.remove("hidden");
    } else {
      const element = document?.querySelector(".not-found");
      element?.classList.add("hidden");
    }

    document.querySelector(".text-box").textContent = bio;
  }, [cities, provinces]);
  if (province !== null)
    cities.map((c) => {
      c.province_id == province ? console.log(c.name) : "";
    });

  return (
    <>
      <div className="Toastify"></div>
      <main>
        <div className="Toastify"></div>
        <div className="dark layout_container__8ejr7">
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 px-4 h-[3px] box-content bg-secondary pt-2">
              <div className="1 flex-1 rounded-full bg-step-item relative animate-pop">
                <div
                  className="absolute h-full rounded-full bg-text-primary transition-width duration-300"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="2 flex-1 rounded-full bg-step-item relative">
                <div
                  className="absolute h-full rounded-full bg-text-primary transition-width duration-300"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <div className="w-full flex-1 overflow-hidden h-full bg-secondary">
              <div
                className="flex flex-col items-start w-full h-full"
                style={{
                  transition: "transhtmlForm, opacity;",
                  transhtmlForm: "translateX(0px);",
                  opacity: "1",
                }}
              >
                <div className="dark StepOne_container__lgv_Q w-full">
                  <htmlForm>
                    <h2
                      className="Title_title__3u0YN StepOne_title__J85Nf"
                      style={{ textAlign: "end" }}
                    >
                      ساخت حساب کاربری
                    </h2>
                    <div className="StepOne_infoContainer__iZ8sV StepOne_infoContainerMargin__bygEA">
                      <div
                        className="Input_container__e4usK "
                        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                      >
                        <input
                          style={{ background: "var(--dark-grey)" }}
                          className="bg-primary py-[10px] px-[16px] Input_input__MiI_q"
                          placeholder="نام"
                          minLength="1"
                          maxLength="15"
                          value={name}
                          dir="auto"
                          name="name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <span
                        style={{ background: "var(--dark-grey)" }}
                        onInput={(e) => setBio(e.target.innerText)}
                        name="bio"
                        dir="auto"
                        className="StepOne_textarea__sjfi_ text-box"
                        id="bio"
                        contentEditable="true"
                        role="textbox"
                        data-placeholder="بیوگرافی"
                      ></span>
                      <p
                        className="StepOne_textareaLabel__DedPP"
                        style={{ textAlign: "end" }}
                      >
                        مثال : طراح لباس و علاقه مند به گردش
                        <br />
                        حداکثر 120 کاراکتر
                      </p>
                    </div>
                    <div
                      className="StepOne_infoContainer__iZ8sV"
                      style={{ marginBottom: "2.5rem" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          borderRadius: "7px",

                          background: "var(--dark-grey)",
                        }}
                        onClick={() => {
                          setIsAgeOpen(true);
                        }}
                      >
                        <div className="BirthDate_container__VzGMx">
                          <span>سن</span>
                          <span className="BirthDate_value__ZdRqg">
                            {selectedAge}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              fill="none"
                            >
                              <path
                                fill="rgb(220, 5, 23)"
                                fillRule="evenodd"
                                d="M6.46.408a.75.75 0 0 0-.92 0l-4.5 3.5a.75.75 0 1 0 .92 1.184L6 1.95l4.04 3.142a.75.75 0 1 0 .92-1.184zM1.04 8.092l4.5 3.5c.27.21.65.21.92 0l4.5-3.5a.75.75 0 1 0-.92-1.184L6 10.05 1.96 6.908a.75.75 0 1 0-.92 1.184"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div
                        className="relative grid justify-between py-2.5 px-4 rounded-m bg-primary transition-all duration-200 ease-in-out active:bg-active-primary grid-flow-col items-center"
                        style={{
                          cursor: "pointer",
                          background: "var(--dark-grey)",
                        }}
                        onClick={() => setIsCityOpen(true)}
                      >
                        <span className="text-base-secondary text-text-primary break-all">
                          شهر
                        </span>
                        <p className="StepOne_select___lKA2" name="cityId">
                          {city}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                          >
                            <path
                              fill="rgb(220, 5, 23)"
                              fillRule="evenodd"
                              d="M6.46.408a.75.75 0 0 0-.92 0l-4.5 3.5a.75.75 0 1 0 .92 1.184L6 1.95l4.04 3.142a.75.75 0 1 0 .92-1.184zM1.04 8.092l4.5 3.5c.27.21.65.21.92 0l4.5-3.5a.75.75 0 1 0-.92-1.184L6 10.05 1.96 6.908a.75.75 0 1 0-.92 1.184"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="StepOne_genderTitle__TKZiq">جنسیت</h3>
                      <div className="StepOne_genderContainer__qkUZM">
                        <label
                          style={{ background: "var(--dark-grey)" }}
                          className="Radio_container__tK1Ib StepOne_radio__sBtjy"
                          htmlFor="male"
                        >
                          <input
                            className="Radio_input__khiSp"
                            id="male"
                            type="radio"
                            value="male"
                            name="gender"
                            checked={gender == "male" ? "checked" : ""}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <span className="Radio_customRadio__KJQtt"></span>مرد
                        </label>
                        <label
                          style={{ background: "var(--dark-grey)" }}
                          className="Radio_container__tK1Ib StepOne_radio__sBtjy"
                          htmlFor="female"
                        >
                          <input
                            className="Radio_input__khiSp"
                            id="female"
                            type="radio"
                            value="female"
                            checked={gender == "female" ? "checked" : ""}
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <span className="Radio_customRadio__KJQtt"></span>
                          زن
                        </label>
                      </div>
                    </div>
                  </htmlForm>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${!isAgeOpen ? "hidden" : ""}`}
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
          <div style={{ width: 70, height: 180 }}>
            <Wheel
              initIdx={18}
              length={45}
              width={20}
              loop
              label=""
              state={age}
              setState={setAge}
            />
          </div>

          <button
            disabled={age?.rel < 18 ? true : false}
            className=" p-4 text-black mt-3 hover:bg-white hover:text-black transition duration-100 text-bold"
            style={{ backgroundColor: "white", width: "40%" }}
            onClick={() => {
              setSelectedAge(age?.rel);
              setIsAgeOpen(false);
            }}
          >
            بعدی
          </button>
        </div>
      </main>
      <div
        className={`${!isCityOpen ? "hidden" : ""} `}
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          overflow: "visible !important",
          top: "0",
        }}
      >
        <div
          className="CitiesList_list__MSXP6"
          style={{
            overflow: "hidden",
            height: "100%",
            // overflow: "visible !important",
          }}
        >
          <div className="Input_container__e4usK" style={{ zIndex: "5" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              className="CitiesList_inputIcon__3eFQL"
            >
              <path
                fill="#8E8E93"
                d="M9.316 16.108c1.451 0 2.79-.47 3.885-1.252l4.121 4.12a1 1 0 0 0 .713.287c.565 0 .965-.434.965-.99a.94.94 0 0 0-.278-.696l-4.095-4.103a6.66 6.66 0 0 0 1.374-4.051c0-3.678-3.008-6.686-6.685-6.686-3.669 0-6.686 3-6.686 6.686 0 3.677 3.008 6.685 6.686 6.685m0-1.443c-2.87 0-5.243-2.374-5.243-5.242 0-2.87 2.374-5.243 5.243-5.243 2.868 0 5.242 2.374 5.242 5.243 0 2.868-2.374 5.242-5.242 5.242"
              ></path>
            </svg>
            <input
              style={{ color: "#000" }}
              dir="rtl"
              className="bg-primary py-[10px] px-[16px] Input_input__MiI_q pl-[60px] CitiesList_input__FSbvv"
              placeholder="جستجو"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="city"
            />
          </div>

          <div
            style={{
              height: "100vh",
              zIndex: "1",
              overflow: "auto",
              textAlign: "end",
              paddingBottom: "110px",
            }}
          >
            <div
              className="relative z-20 flex flex-col rounded-lg bg-primary w-full overflow-hidden"
              style={{ textAlign: "end" }}
            ></div>

            {cities.map((c, i) => (
              <div
                key={i}
                data-value="1566262000"
                className="grid overflow-hidden transition-all duration-200 active:bg-active-secondary opacity-100 grid-rows-1fr  fadeShow4"
                style={{
                  transition: "opacity 0.3s 0.15s",
                  gridTemplateRows: "0.3s",
                }}
              >
                <div
                  className="relative flex items-center w-full h-full cursor-pointer ease-in-out overflow-hidden"
                  onClick={(e) => {
                    setCity(c.name);
                    setIsCityOpen(false);
                    setProvince(null);
                  }}
                >
                  <div
                    className="relative w-full ml-4 pr-4 border-solid border-b-[0.33px] border-wallet-separator py-2 pt-6 "
                    style={{
                      transition: "padding-top 0.3s",
                      paddingBottom: "0.3s",
                    }}
                  >
                    {c.name}
                    {/* {c.province_id == province ? c.name : ""} */}
                  </div>
                </div>
              </div>
            ))}

            {/* {province == null
              ? provinces.map((p, i) => (
                  <div
                    key={i}
                    data-value="1566262000"
                    className="grid overflow-hidden transition-all duration-200 active:bg-active-secondary opacity-100 grid-rows-1fr city-item fadeShow4"
                    style={{
                      transition: "opacity 0.3s 0.15s",
                      gridTemplateRows: "0.3s",
                    }}
                  >
                    <div
                      className="relative flex items-center w-full h-full cursor-pointer ease-in-out overflow-hidden"
                      onClick={(e) => {
                        setProvince(p.id);
                      }}
                    >
                      <div
                        className="relative w-full ml-4 pr-4 border-solid border-b-[0.33px] border-wallet-separator py-3"
                        style={{
                          transition: "padding-top 0.3s",
                          paddingBottom: "0.3s",
                        }}
                      >
                        {p.name}
                      </div>
                      <div className="absolute top-1.5 right-4 transition-opacity opacity-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="28"
                          fill="none"
                        >
                          <path
                            stroke="#007AFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.33"
                            d="m1.5 15.5 4.332 5.294c.083.102.24.093.311-.018L14 8.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              : ""} */}

            <div
              className="hidden  h-full w-full absolute z-10 top-0 left-0 items-center place-content-center text-subtitle transition-all duration-100 not-found"
              style={{
                transitionDelay: "0s",
                transhtmlForm: "scale(0)",
                zIndex: "20",
                textAlign: "center",
                zIndex: 20,
                display: "block",
                width: "100vw",
                height: "20px",
                position: "absolute",
                top: "50%",
              }}
            >
              City not found
            </div>
          </div>
        </div>
      </div>

      <button
        disabled={
          !selectedAge || !name || !bio || !city || !gender ? true : false
        }
        onClick={() => {
          const persianRegex = /^[\u0600-\u06FF\s]+$/;

          if (!persianRegex.test(name)) {
            return toast("اسمت رو به فارسی وارد کن", {
              autoClose: 3000,
              position: "top-center",
              theme: "dark",
            });
          }
          setIsHeightOpen(true);
        }}
        className="p-3 bg-white mt-4 w-[70%] mx-auto"
        style={{
          width: "55%",
          padding: "10px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        ادامه
      </button>
      {isHeightOpen ? <Height /> : ""}
      <ToastContainer />
    </>
  );
};

export default CreateProfile;
