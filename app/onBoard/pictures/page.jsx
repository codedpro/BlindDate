"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";
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
    appData,
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

  function getDistance() {
    setIsLoading(true);
    (async () => {
      // loading the models
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await faceapi.nets.ageGenderNet.loadFromUri("/models");

      // detect a single face from the ID card image
      const firstPic = await faceapi
        .detectSingleFace(
          firstRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withAgeAndGender();

      // detect a single face from the selfie image
      const secondPic = await faceapi
        .detectSingleFace(
          secondRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416, // می‌توانید این مقدار را تغییر دهید
            scoreThreshold: 0.2, // می‌توانید این مقدار را کاهش دهید
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withAgeAndGender();

      // Using Euclidean distance to comapare face descriptions

      if (firstPic && secondPic) {
        const distance = faceapi.euclideanDistance(
          firstPic.descriptor,
          secondPic.descriptor
        );

        setDistance1(distance);
      } else if (!firstPic) {
        toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه", {
          autoClose: 4000,
          position: "top-center",
          theme: "dark",
        });
        setImg1(null);
        setnumImages(numImages - 1);
        console.log("first picture is not valid");
      } else if (!secondPic) {
        toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه", {
          autoClose: 4000,
          position: "top-center",
          theme: "dark",
        });
        setnumImages(numImages - 1);
        setImg2(null);
      }
    })();

    (async () => {
      // loading the models
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await faceapi.nets.ageGenderNet.loadFromUri("/models");

      // detect a single face from the ID card image
      const thridPic = await faceapi
        .detectSingleFace(
          thridRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withAgeAndGender();

      // detect a single face from the selfie image
      const forthPic = await faceapi
        .detectSingleFace(
          forthRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416, // می‌توانید این مقدار را تغییر دهید
            scoreThreshold: 0.2, // می‌توانید این مقدار را کاهش دهید
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withAgeAndGender();

      // Using Euclidean distance to comapare face descriptions

      if (thridPic && forthPic) {
        const distance = faceapi.euclideanDistance(
          thridPic.descriptor,
          forthPic.descriptor
        );

        setDistance2(distance);

        setIsLoading(false);
      } else if (!thridPic) {
        toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه", {
          autoClose: 4000,
          position: "top-center",
          theme: "dark",
        });
        setImg3(null);
        setnumImages(numImages - 1);
        setIsLoading(false);
        console.log("thrid picture is not valid");
      } else if (!forthPic) {
        toast("عکسی رو آپلود کن که چهرت مشخص باشه و با کیفیت باشه", {
          autoClose: 4000,
          position: "top-center",
          theme: "dark",
        });
        console.log("forth picture is not valid");
        setIsLoading(false);
        setnumImages(numImages - 1);
        setImg4(null);
      }
    })();

    // console.log(distance1, distance2);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast("صبر کن هوش مصنوعی عکساتو چک کنه. شاید ۴۰ ثانیه طول بکشه", {
      autoClose: 6000,
      position: "top-center",
      theme: "dark",
    });

    const files = [file1.name, file2.name, file3.name, file4.name];

    const allUnique = new Set(files).size === images.length;

    if (allUnique) {
      console.log("All images are unique.");
      getDistance();
    } else {
      toast("عکس تکراری آپلود نکن", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (isFirstRender.current) {
      // Prevent the function from executing on the first render
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
  };

  function handleChange(e) {
    const file = e.target.files[0];

    if (file) {
      setWarn(false);

      setFile1(file);
    }

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setnumImages((prevNumImages) => {
      if (img1 == null || img1 == "") {
        return prevNumImages + 1;
      }
      return prevNumImages;
    });

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImg1(reader.result);
    });
    reader.readAsDataURL(file);
  }
  function handleChange2(e) {
    const file = e.target.files[0];

    if (file) {
      setWarn(false);
      setFile2(file);
    }

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setnumImages((prevNumImages) => {
      if (img2 == null || img2 == "") {
        return prevNumImages + 1;
      }
      return prevNumImages;
    });

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImg2(reader.result);
    });
    reader.readAsDataURL(file);
  }
  function handleChange3(e) {
    const file = e.target.files[0];

    if (file) {
      setWarn(false);

      setFile3(file);
    }
    if (!file) {
      console.error("No file selected.");
      return;
    }

    setnumImages((prevNumImages) => {
      if (img3 == null || img3 == "") {
        return prevNumImages + 1;
      }
      return prevNumImages;
    });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImg3(reader.result);
    });
    reader.readAsDataURL(file);
  }
  function handleChange4(e) {
    const file = e.target.files[0];

    if (file) {
      setWarn(false);
      setFile4(file);
    }

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setnumImages((prevNumImages) => {
      if (img4 == null || img4 == "") {
        return prevNumImages + 1;
      }
      return prevNumImages;
    });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImg4(reader.result);
    });
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const images = document?.querySelectorAll(".uploaded-img");
    if (isLoading) {
      images.forEach((image) => {
        image.style.opacity = "50%";
      });
    } else {
      images.forEach((image) => {
        image.style.opacity = "100%";
      });
    }
  }, [isLoading]);

  async function sendImages() {
    setIsLoading(true);
    const files = [file1, file2, file3, file4];
    const imagesData = new FormData();

    files.forEach((file, i) => {
      imagesData.append(
        `${i == 0 ? "a" : i == 1 ? "b" : i == 2 ? "c" : "d"}`,
        file
      );
    });

    try {
      const sendimages = await axios.post(
        "https://api.blinddatepersian.site/index.php",
        imagesData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFolder(sendimages.data.folder_name);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (folder !== null) {
      sendData();
    }
  }, [folder]);

  async function sendData() {
    const data = {
      app_data: appData,
      bio,
      gender: `${gender == "male" ? 0 : 1}`,
      city,
      fname: name,
      age: selectedAge,
      height: selectedHeight,
      favorites,
      photos: folder,
    };

    var req = new XMLHttpRequest();
    req.open("POST", "https://api.blinddatepersian.site/index.php/Login");
    req.send(JSON.stringify(data));

    router.push(`/#${appData}`);
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
      return; // از اینجا خارج می‌شود و بقیه کد اجرا نمی‌شود
    }

    if (distance1 > 0 && distance2 > 0) {
      sendImages();
      return; // از اینجا هم خارج می‌شود
    }
  }, [distance]);

  useEffect(() => {
    console.log();
    setImages([img1, img2, img3, img4]);
  }, [img1, img2, img3, img4]);

  useEffect(() => {
    if (bio == "") router.push(`/#${appData}`);
  }, []);

  return (
    <>
      <main>
        <div className="Toastify"></div>
        <div className="dark layout_container__8ejr7">
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 px-4 h-[3px] box-content bg-secondary pt-2">
              <div className="1 flex-1 rounded-full bg-step-item relative">
                <div
                  className="absolute h-full rounded-full bg-text-primary transition-width duration-300"
                  style={{ width: "100%" }}
                ></div>
              </div>

              <div className="4 flex-1 rounded-full bg-step-item relative animate-pop">
                <div
                  className="absolute h-full rounded-full bg-text-primary transition-width duration-300"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className="w-full flex-1 overflow-hidden h-full bg-secondary">
              <div
                className="flex flex-col items-start w-full h-full"
                style={{
                  transition: "transform, opacity",
                  transform: "translateX(0px)",
                  opacity: "1",
                }}
              >
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
                      {!img1 ? (
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
                      ) : (
                        ""
                      )}

                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-0"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={handleChange}
                      />
                      <img
                        src={img1}
                        ref={firstRef}
                        id="#image"
                        className={`${img1 ? "w-full" : ""} uploaded-img`}
                      />
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-1"
                    >
                      {!img2 ? (
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
                      ) : (
                        ""
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-1"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={handleChange2}
                      />
                      <img
                        src={img2}
                        ref={secondRef}
                        className={`${img2 ? "w-full" : ""} uploaded-img`}
                      />
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-2"
                    >
                      {!img3 ? (
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
                      ) : (
                        ""
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-2"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={handleChange3}
                      />
                      <img
                        src={img3}
                        ref={thridRef}
                        className={`${img3 ? "w-full" : ""} uploaded-img`}
                      />
                    </label>
                    <label
                      className="UploadImages_label__AVCyC"
                      htmlFor="file-3"
                    >
                      {!img4 ? (
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
                      ) : (
                        ""
                      )}
                      <input
                        className="UploadImages_input__yZT_X"
                        id="file-3"
                        accept="image/jpeg, image/jpg, image/png, image/heic, image/heif"
                        type="file"
                        onChange={handleChange4}
                      />
                      <img
                        src={img4}
                        ref={forthRef}
                        className={`${img4 ? "w-full" : ""} uploaded-img`}
                      />
                    </label>
                  </div>
                  <div className="px-[15px]">
                    <p
                      className="UploadImages_text__sNerD UploadImages_textInfo__OZoiz"
                      style={{ textAlign: "end" }}
                    >
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
        className="p-3 bg-white mt-4 w-[70%] mx-auto"
        style={{
          width: "55%",
          padding: "10px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          color: "black",
        }}
      >
        ادامه
      </button>
      <ToastContainer />
    </>
  );
};

export default Pictures;
