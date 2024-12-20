"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/use-hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Pictures = () => {
  const {
    gender,
    selectedAge,
    bio,
    city,
    name,
    selectedHeight,
    img1,
    img2,
    img3,
    img4,
    favorites,

    setImg1,
    setImg2,
    setImg3,
    setImg4,
  } = useStore();

  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [numImages, setnumImages] = useState(0);
  const [distance1, setDistance1] = useState(null);
  const [distance2, setDistance2] = useState(null);
  const [distance, setDistance] = useState();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warn, setWarn] = useState(false);
  const [folder, setFolder] = useState(null);

  const router = useRouter();

  const text =
    ".برای ادامه شما باید 4 تا عکس اضافه کنی. عکس هات تمام رخ و واضح باشند";

  const firstRef = useRef();
  const secondRef = useRef();
  const thridRef = useRef();
  const forthRef = useRef();
  const isFirstRender = useRef(true);

  async function loadFaceModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    await faceapi.nets.ageGenderNet.loadFromUri("/models");
  }

  function setImageState(index) {
    switch (index) {
      case 1:
        setImg1(null);
        setnumImages(numImages - 1);
        break;
      case 2:
        setImg2(null);
        setnumImages(numImages - 1);
        break;
      case 3:
        setImg3(null);
        setnumImages(numImages - 1);
        break;
      case 4:
        setImg4(null);
        setnumImages(numImages - 1);
        break;
      default:
        break;
    }
  }
  async function detectFace(ref, options = {}) {
    return await faceapi
      .detectSingleFace(
        ref.current,
        new faceapi.TinyFaceDetectorOptions(options)
      )
      .withFaceLandmarks()
      .withFaceDescriptor()
      .withAgeAndGender();
  }

  async function getDistance() {
    console.log("Loading face models...");
    setIsLoading(true);
    await loadFaceModels();

    console.log("Detecting faces for the first image...");
    const firstPic = await detectFace(firstRef);
    console.log("First picture face detection result:", firstPic);

    console.log("Detecting faces for the second image...");
    const secondPic = await detectFace(secondRef, {
      inputSize: 416,
      scoreThreshold: 0.2,
    });
    console.log("Second picture face detection result:", secondPic);

    if (firstPic && secondPic) {
      const dis = faceapi.euclideanDistance(
        firstPic.descriptor,
        secondPic.descriptor
      );
      console.log("Computed distance between first and second images:", dis);
      setDistance1(dis);
    } else {
      console.warn("Face detection failed for one or both images.");
      handleFaceDetectionFailure(firstPic, secondPic, 1, 2);
    }

    console.log("Reloading face models...");
    await loadFaceModels();

    console.log("Detecting faces for the third image...");
    const thridPic = await detectFace(thridRef);
    console.log("Third picture face detection result:", thridPic);

    console.log("Detecting faces for the fourth image...");
    const forthPic = await detectFace(forthRef, {
      inputSize: 416,
      scoreThreshold: 0.2,
    });
    console.log("Fourth picture face detection result:", forthPic);

    if (thridPic && forthPic) {
      const dis = faceapi.euclideanDistance(
        thridPic.descriptor,
        forthPic.descriptor
      );
      console.log("Computed distance between third and fourth images:", dis);
      setDistance2(dis);
    } else {
      console.warn("Face detection failed for one or both images.");
      handleFaceDetectionFailure(thridPic, forthPic, 3, 4);
    }
    setIsLoading(false);
  }

  function handleFaceDetectionFailure(
    firstPic,
    secondPic,
    firstIndex,
    secondIndex
  ) {
    toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه", {
      autoClose: 4000,
      position: "top-center",
      theme: "dark",
    });
    if (!firstPic) {
      setImageState(firstIndex);
    }
    if (!secondPic) {
      setImageState(secondIndex);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit button clicked. Starting process...");

    toast("صبر کن هوش مصنوعی عکساتو چک کنه. شاید ۴۰ ثانیه طول بکشه", {
      autoClose: 6000,
      position: "top-center",
      theme: "dark",
    });

    const files = [file1?.name, file2?.name, file3?.name, file4?.name].filter(
      Boolean
    );
    const allUnique = new Set(files).size === images.length;

    console.log("Uploaded files:", files);
    console.log("Are all uploaded images unique?", allUnique);

    if (!allUnique) {
      toast("عکس تکراری آپلود نکن", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log("Calling getDistance to verify face descriptors...");
    getDistance();
  };

  function handleImageChange(e, imgIndex) {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    setWarn(false);

    let currentImg = null;
    let setFileFunc = null;
    let setImgFunc = null;

    switch (imgIndex) {
      case 1:
        currentImg = img1;
        setFileFunc = setFile1;
        setImgFunc = setImg1;
        break;
      case 2:
        currentImg = img2;
        setFileFunc = setFile2;
        setImgFunc = setImg2;
        break;
      case 3:
        currentImg = img3;
        setFileFunc = setFile3;
        setImgFunc = setImg3;
        break;
      case 4:
        currentImg = img4;
        setFileFunc = setFile4;
        setImgFunc = setImg4;
        break;
      default:
        break;
    }

    setFileFunc(file);

    setnumImages((prevNumImages) => {
      if (currentImg == null || currentImg == "") {
        return prevNumImages + 1;
      }
      return prevNumImages;
    });

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgFunc(reader.result);
    });
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const uploadedImages = document?.querySelectorAll(".uploaded-img");
    if (isLoading) {
      uploadedImages.forEach((image) => {
        image.style.opacity = "50%";
      });
    } else {
      uploadedImages.forEach((image) => {
        image.style.opacity = "100%";
      });
    }
  }, [isLoading]);

  async function sendImages() {
    console.log("Starting image upload...");
    setIsLoading(true);
    const files = [file1, file2, file3, file4];
    const imagesData = new FormData();

    files.forEach((file, i) => {
      const key = i === 0 ? "a" : i === 1 ? "b" : i === 2 ? "c" : "d";
      console.log(`Appending file ${key}:`, file);
      imagesData.append(key, file);
    });

    try {
      console.log("Sending image data to server...");
      const sendimages = await axios.post(
        "https://api.blinddatepersian.site/index.php",
        imagesData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        "Image upload successful. Received folder name:",
        sendimages.data.folder_name
      );
      setFolder(sendimages.data.folder_name);
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  }

  useEffect(() => {
    if (folder !== null) {
      sendData();
    }
  }, [folder]);

  async function sendData() {
    const currentParams = window.location.hash.substring(1);
    const data = {
      app_data: currentParams,
      bio,
      gender: `${gender == "male" ? 0 : 1}`,
      city,
      fname: name,
      age: selectedAge,
      height: selectedHeight,
      favorites,
      photos: folder,
    };

    console.log("Sending user data to server:", data);

    try {
      const response = await fetch(
        "https://api.blinddatepersian.site/index.php/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("Server response:", await response.json());
        router.push(`/#${currentParams}`);
      } else {
        console.error("Server responded with an error:", response.status);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }

  useEffect(() => {
    setDistance((distance1 + distance2) / 2);
  }, [distance1, distance2]);

  useEffect(() => {
    if (distance > 0.62 || distance1 > 0.62 || distance2 > 0.62) {
      setWarn(true);
      toast("لطفا عکس های افراد یکسان را آپلود کنید", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (distance1 > 0 && distance2 > 0) {
      sendImages();
      return;
    }
  }, [distance]);

  useEffect(() => {
    setImages([img1, img2, img3, img4]);
  }, [img1, img2, img3, img4]);

  useEffect(() => {
    const currentParams = window.location.hash.substring(1);

    if (bio == "") router.push(`/#${currentParams}`);
  }, []);

  return (
    <>
      <main>
        <div className="Toastify"></div>
        <div className="dark layout_container__8ejr7">
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 px-4 h-[3px] box-content bg-secondary pt-2">
              <div className="1 flex-1 rounded-full bg-step-item relative">
                <div className="absolute h-full w-full rounded-full bg-text-primary transition-width duration-300"></div>
              </div>

              <div className="4 flex-1 rounded-full bg-step-item relative animate-pop">
                <div className="absolute h-full w-full rounded-full bg-text-primary transition-width duration-300"></div>
              </div>
            </div>
            <div className="w-full flex-1 overflow-hidden h-full bg-secondary">
              <div className="flex flex-col items-start w-full h-full transform translate-x-0 opacity-100 transition">
                <div className="dark UploadImages_container__P_6Gx StepTwo_container__8m6Lm w-full">
                  <div className="UploadImages_photosCountContainer__xDlxD">
                    <div className="px-4">
                      <h2 className="Title_title__3u0YN">عکس های پروفایل</h2>
                    </div>
                    <span className="text-subtitle font-semibold pr-4">
                      {numImages < 5 ? numImages : 4} of 4
                    </span>
                  </div>
                  <div className="UploadImages_photosContainer__AAIqS">
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-0"
                    >
                      {!img1 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="UploadImages_icon__tNS0E"
                        >
                          <path
                            d="M10 20a1 1 0 0 1-1-1v-8H1a1 1 0 1 1 0-2h8V1a1 1 0 1 1 2 0v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 0 1-1 1"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}

                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-0"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={(e) => handleImageChange(e, 1)}
                      />
                      {img1 && (
                        <img
                          src={img1}
                          ref={firstRef}
                          className="w-full uploaded-img"
                        />
                      )}
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-1"
                    >
                      {!img2 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="UploadImages_icon__tNS0E"
                        >
                          <path
                            d="M10 20a1 1 0 0 1-1-1v-8H1a1 1 0 1 1 0-2h8V1a1 1 0 1 1 2 0v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 0 1-1 1"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-1"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={(e) => handleImageChange(e, 2)}
                      />
                      {img2 && (
                        <img
                          src={img2}
                          ref={secondRef}
                          className="w-full uploaded-img"
                        />
                      )}
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-2"
                    >
                      {!img3 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="UploadImages_icon__tNS0E"
                        >
                          <path
                            d="M10 20a1 1 0 0 1-1-1v-8H1a1 1 0 1 1 0-2h8V1a1 1 0 1 1 2 0v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 0 1-1 1"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-2"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={(e) => handleImageChange(e, 3)}
                      />
                      {img3 && (
                        <img
                          src={img3}
                          ref={thridRef}
                          className="w-full uploaded-img"
                        />
                      )}
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-3"
                    >
                      {!img4 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="UploadImages_icon__tNS0E"
                        >
                          <path
                            d="M10 20a1 1 0 0 1-1-1v-8H1a1 1 0 1 1 0-2h8V1a1 1 0 1 1 2 0v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 0 1-1 1"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-3"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={(e) => handleImageChange(e, 4)}
                      />
                      {img4 && (
                        <img
                          src={img4}
                          ref={forthRef}
                          className="w-full uploaded-img"
                        />
                      )}
                    </label>
                  </div>
                  <div className="px-[15px]">
                    <p className="UploadImages_text__sNerD UploadImages_textInfo__OZoiz text-end">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <button
        disabled={numImages < 4 || warn}
        onClick={handleSubmit}
        className="p-[10px] w-[55%] block mx-auto  bg-primary-brand text-white disabled:bg-gray-500 mt-4"
      >
        ادامه
      </button>
      <ToastContainer />
    </>
  );
};

export default Pictures;
