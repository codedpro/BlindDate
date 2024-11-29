import React from "react";

interface UserDetailsProps {
  name: string;
  age: number | null;
  height: number | null;
  city: string | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  age,
  height,
  city,
}) => {
  return (
    <>
      <div
        className="w-full  "
        dir="rtl"
        style={{
          paddingRight: "16px",
          paddingTop: "0px",
          paddingBottom: "4px",
          fontSize: "17px",
          transform: "translateY(10px)",
          display: "flex",
          justifyContent: "start",
          gap: "20px",
        }}
      >
        <div className="">
          {name}، {age} ساله
        </div>
        {age && (
          <div
            className={`profile-icon profile-icon-man ${
              age >= 20 ? "profile-icon-man" : "profile-icon-boy"
            }`}
          ></div>
        ) }
      </div>
      <div
        className="flex   text-small"
        style={{
          justifyContent: "end",
          gap: "1rem",
          padding: "8px 1rem 8px 0",
        }}
      >
        <div className="flex items-center gap-1">
          {`${height} cm`}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4697 19V5C21.4697 3 20.4697 2 18.4697 2H14.4697C12.4697 2 11.4697 3 11.4697 5V19C11.4697 21 12.4697 22 14.4697 22H18.4697C20.4697 22 21.4697 21 21.4697 19Z"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M11.4697 6H16.4697"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M11.4697 18H15.4697"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M11.4697 13.95L16.4697 14"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M11.4697 10H14.4697"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M5.49027 2C3.86027 2 2.53027 3.33 2.53027 4.95V17.91C2.53027 18.36 2.72027 19.04 2.95027 19.43L3.77027 20.79C4.71027 22.36 6.26027 22.36 7.20027 20.79L8.02027 19.43C8.25027 19.04 8.44027 18.36 8.44027 17.91V4.95C8.44027 3.33 7.11027 2 5.49027 2Z"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M8.44027 7H2.53027"
              stroke="#FCFCFC"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="flex items-center gap-1">
          {city}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
              stroke="#FCFCFC"
              stroke-width="1.5"
            />
            <path
              d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
              stroke="#FCFCFC"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
