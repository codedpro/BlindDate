"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/use-hooks";
import { FaBriefcase, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const allJobs = [
  "مهندسی",
  "پزشکی",
  "تدریس",
  "برنامه‌نویسی",
  "نویسندگی",
  "طراحی",
  "حسابداری",
  "رانندگی",
  "فروشندگی",
  "عکاسی",
  "مدیریت",
  "فناوری اطلاعات",
  "معماری",
  "هنرهای دستی",
  "موسیقی",
];

const Job = () => {
  const { jobs, setJobs, appData } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const filteredJobs = searchTerm
    ? allJobs.filter((job) => job.includes(searchTerm))
    : allJobs;

  const displayedJobs = [
    ...jobs,
    ...filteredJobs.filter((job) => !jobs.includes(job)),
  ].slice(0, 10);

  const handleJobClick = (job: string) => {
    setJobs((prev: string[]) => {
      if (prev.includes(job)) {
        return prev.filter((item: string) => item !== job);
      } else if (prev.length < 3) {
        return [...prev, job];
      } else {
        toast("🙄 فقط می‌توانید سه شغل انتخاب کنید", {
          autoClose: 3000,
          position: "top-center",
          theme: "dark",
        });
        return prev;
      }
    });
  };

  const [currentParams, setCurrentParams] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      setCurrentParams(hash);
    }
  }, []);

  const handleConfirm = () => {
    if (jobs.length >= 1) {
      toast("✅ انتخاب‌ها ثبت شد", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });

      router.push(`/onBoard/pictures#${currentParams}`);
    } else {
      toast("❗ حداقل یک شغل را انتخاب کنید", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between min-h-screen bg-[#000000] text-white"
    >
      {/* Scrollable Content */}
      <div
        dir="rtl"
        className="flex-grow w-full max-w-md mx-auto overflow-y-auto h-32 p-4"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaBriefcase className="text-4xl mb-2" />
          <h1 className="text-lg font-bold">شغل تو انتخاب کن</h1>
        </div>

        {/* Search Bar */}
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#222223] text-gray-300 placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Job List */}
        <div className="w-full rounded-lg bg-[#1c1c1d] p-4 shadow-md">
          {displayedJobs.map((job, index) => (
            <div
              key={index}
              onClick={() => handleJobClick(job)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg mb-3 cursor-pointer transition-all duration-300 ${
                jobs.includes(job)
                  ? "bg-primary-brand text-white shadow-lg"
                  : "bg-[#1c1c1d] text-gray-300 hover:bg-[#222223] hover:shadow-md"
              }`}
            >
              <span className="text-sm font-medium">{job}</span>
              {jobs.includes(job) && (
                <span className="text-gray-300 text-lg font-bold">
                  <FaCheck />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button at Bottom */}
      <div className="w-full max-w-md mx-auto p-4">
        <button
          onClick={handleConfirm}
          disabled={jobs.length === 0}
          className={`w-full p-3 rounded-lg transition ${
            jobs.length >= 1
              ? "bg-primary-brand hover:bg-secondary-brand"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          ادامه
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Job;
