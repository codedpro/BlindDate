import React from "react";

const RandomSearchButton: React.FC = () => {
  return (
    <div className="search-container">
    <button
      style={{
        padding: "10px 10px",
        backgroundColor: "#1E2126",
        borderRadius: "8px",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.40039 2.09998H18.6004C19.7004 2.09998 20.6004 2.99998 20.6004 4.09998V6.29998C20.6004 7.09998 20.1004 8.09998 19.6004 8.59998L15.3004 12.4C14.7004 12.9 14.3004 13.9 14.3004 14.7V19C14.3004 19.6 13.9004 20.4 13.4004 20.7L12.0004 21.6C10.7004 22.4 8.90039 21.5 8.90039 19.9V14.6C8.90039 13.9 8.50039 13 8.10039 12.5L4.30039 8.49998C3.80039 7.99998 3.40039 7.09998 3.40039 6.49998V4.19998C3.40039 2.99998 4.30039 2.09998 5.40039 2.09998Z"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.93 2.09998L6 9.99998"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button
      style={{
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        gap: "35px",
        color: "#fff",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E2126",
      }}
    >
      <span>جستجوی تصادفی</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4999 6.12996C14.1499 5.02996 14.5599 3.65996 15.7199 3.28996C16.3299 3.08996 17.0799 3.25996 17.5099 3.84996C17.9099 3.23996 18.6899 3.09996 19.2899 3.28996C20.4499 3.65996 20.8599 5.02996 20.5099 6.12996C19.9599 7.87996 18.0399 8.78996 17.5099 8.78996C16.9699 8.78996 15.0699 7.89996 14.4999 6.12996Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
  );
};

export default RandomSearchButton;
