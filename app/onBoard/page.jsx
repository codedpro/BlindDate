"use client";

import { useEffect, useRef, useState } from "react";
import Wheel from "../../components/wheel.tsx";
import { citiesData } from "../../data/bataCities";
import { useStore } from "../../store/use-hooks";
import Height from "../../components/height";
import { toast, ToastContainer } from "react-toastify";

const CreateProfile = () => {
  const {
    cities,
    gender,
    provinces,
    province,
    appData,
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
    const filteredCities = citiesData?.filter((city) =>
      city.name.includes(query)
    );
    setCities(filteredCities);
  }, [query, setCities]);

  useEffect(() => {
    const items = document?.querySelectorAll(".city-item") || [];
    items.forEach((i) => {
      if (i.textContent === " ") {
        i.classList.add("hidden");
      }
    });
    if (document.querySelector(".text-box")) {
      document.querySelector(".text-box").textContent = bio;
    }
  }, [bio]);

  useEffect(() => {
    if (cities.length === 0 && province) {
      const element = document?.querySelector(".not-found");
      element?.classList.remove("hidden");
    } else {
      const element = document?.querySelector(".not-found");
      element?.classList.add("hidden");
    }

    if (document.querySelector(".text-box")) {
      document.querySelector(".text-box").textContent = bio;
    }
  }, [cities, provinces, bio, province]);

  if (province !== null) {
    cities.forEach((c) => {
      if (c.province_id === province) console.log(c.name);
    });
  }

  const handleSubmit = () => {
    const persianRegex = /^[\u0600-\u06FF\s]+$/;
    if (!persianRegex.test(name)) {
      return toast("اسمت رو به فارسی وارد کن", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
    setIsHeightOpen(true);
  };

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-secondary text-white relative">
      <div className="Toastify"></div>
      <main className="flex-grow overflow-auto">
        <div className="Toastify"></div>
        <div className="dark layout_container__8ejr7">
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 px-4 h-[3px] bg-secondary pt-2 box-content">
              <div className="flex-1 rounded-full bg-step-item relative animate-pop">
                <div className="absolute h-full rounded-full bg-text-primary transition-width duration-300 w-full"></div>
              </div>
              <div className="flex-1 rounded-full bg-step-item relative">
                <div className="absolute h-full rounded-full bg-text-primary transition-width duration-300 w-0"></div>
              </div>
            </div>
            <div className="w-full flex-1 overflow-hidden h-full bg-secondary">
              <div className="flex flex-col items-start w-full h-full transition-all transform opacity-100">
                <div className="dark StepOne_container__lgv_Q w-full">
                  <form>
                    <h2 className="Title_title__3u0YN StepOne_title__J85Nf text-center">
                      ساخت حساب کاربری
                    </h2>
                    <div className="StepOne_infoContainer__iZ8sV StepOne_infoContainerMargin__bygEA my-2">
                      <div className="Input_container__e4usK my-2">
                        <input
              
                          className="bg-primary py-[10px] px-[16px] Input_input__MiI_q bg-gray-800"
                          placeholder="نام"
                          minLength="1"
                          maxLength="15"
                          value={name}
                          dir="rtl"
                          name="name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <input
                        onChange={(e) => setBio(e.target.value)}
                        name="bio"
                        dir="rtl"
                        className="StepOne_textarea__sjfi_ text-box bg-gray-800"
                        id="bio"
                        contentEditable="true"
                        role="textbox"
                        placeholder="بیوگرافی"
                      ></input>
                      <p className="StepOne_textareaLabel__DedPP text-right">
                        مثال : طراح لباس و علاقه مند به گردش
                        <br />
                        حداکثر 120 کاراکتر
                      </p>
                    </div>
                    <div className="StepOne_infoContainer__iZ8sV mb-10">
                      <div
                        className="relative cursor-pointer rounded-[7px] bg-gray-800"
                        onClick={() => {
                          setIsAgeOpen(true);
                        }}
                      >
                        <div className="BirthDate_container__VzGMx">
                          <span>سن</span>
                          <span className="BirthDate_value__ZdRqg flex items-center">
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
                        className="relative grid justify-between py-2.5 px-4 rounded-m bg-primary transition-all duration-200 ease-in-out active:bg-active-primary grid-flow-col items-center cursor-pointer bg-gray-800"
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
                          className="Radio_container__tK1Ib StepOne_radio__sBtjy bg-gray-800"
                          htmlFor="male"
                        >
                          <input
                            className="Radio_input__khiSp"
                            id="male"
                            type="radio"
                            value="male"
                            name="gender"
                            checked={gender == "male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <span className="Radio_customRadio__KJQtt"></span>مرد
                        </label>
                        <label
                          className="Radio_container__tK1Ib StepOne_radio__sBtjy bg-gray-800"
                          htmlFor="female"
                        >
                          <input
                            className="Radio_input__khiSp"
                            id="female"
                            type="radio"
                            value="female"
                            checked={gender == "female"}
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <span className="Radio_customRadio__KJQtt"></span>
                          زن
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Age Picker */}
        <div
          className={`${
            !isAgeOpen ? "hidden" : "flex"
          } bg-black absolute flex-col w-full h-full top-0 left-0 justify-evenly items-center`}
        >
          <div className="w-[70px] h-[180px]">
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
            disabled={age?.rel < 18}
          className="w-3/4 p-3 bg-primary-brand rounded text-white disabled:bg-gray-500"
            onClick={() => {
              setSelectedAge(age?.rel);
              setIsAgeOpen(false);
            }}
          >
            بعدی
          </button>
        </div>
      </main>

      {/* City Picker */}
      <div
        className={`${!isCityOpen ? "hidden" : ""} absolute w-full h-full top-0`}
      >
        <div className="CitiesList_list__MSXP6 h-full overflow-hidden">
          <div className="Input_container__e4usK z-5 relative">
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
              dir="rtl"
              className="bg-primary py-[10px] px-[16px] Input_input__MiI_q pl-[60px] CitiesList_input__FSbvv text-black"
              placeholder="جستجو"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="city"
            />
          </div>

          <div className="h-full z-1 overflow-auto text-right pb-[110px] relative">
            <div className="relative z-20 flex flex-col rounded-lg bg-primary w-full overflow-hidden text-right"></div>

            {cities.map((c, i) => (
              <div
                key={i}
                data-value="1566262000"
                className="grid overflow-hidden transition-all duration-200 active:bg-active-secondary opacity-100 grid-rows-[1fr] fadeShow4"
              >
                <div
                  className="relative flex items-center w-full h-full cursor-pointer ease-in-out overflow-hidden"
                  onClick={() => {
                    setCity(c.name);
                    setIsCityOpen(false);
                    setProvince(null);
                  }}
                >
                  <div className="relative w-full ml-4 pr-4 border-solid border-b-[0.33px] border-wallet-separator py-2 pt-6">
                    {c.name}
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute z-20 left-0 top-1/2 flex items-center justify-center text-subtitle transition-all duration-100 not-found text-center h-[20px] w-screen">
              City not found
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button Bar */}
      <div className="w-full p-4">
        <button
          disabled={!selectedAge || !name || !bio || !city || !gender}
          onClick={handleSubmit}
          className="w-full p-3 bg-primary-brand rounded text-white disabled:bg-gray-500"
        >
          ادامه
        </button>
      </div>
      
      {isHeightOpen ? <Height /> : ""}
      <ToastContainer />
    </div>
  );
};

export default CreateProfile;
