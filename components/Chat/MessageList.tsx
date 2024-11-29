// components/MessageList.tsx
import React from 'react';

interface Message {
  chat_id: number;
  name: string;
  text: string;
  time: number;
  key: string;
}

// components/Chat/MessageList.tsx
interface MessageListProps {
  messages: Message[];
  chatId: number | null;
  changeTime: (stamp: number) => string;
  currentTime: number;
  user2img1: string | null;
  user2img2: string | null;
  user2img3: string | null;
  user2img4: string | null;
  liked: boolean;
  telegramId: string;
}


const MessageList: React.FC<MessageListProps> = ({
  messages,
  chatId,
  changeTime,
  currentTime,
  user2img1,
  user2img2,
  user2img3,
  user2img4,
  liked,
  telegramId,
}) => {
  return (
    <div className="messages" id="chat">
      {messages.map((m) => (
        <div
          key={m.key} // assuming message key is unique
          className={`${
            m.name == "MAHDIandEDYQQ:" ? "admin" : "message"
          } user-${m.chat_id == chatId ? 2 : 1} ${
            m.text == "BLINDDATELIKE" || m.text == "BLINDDATEDISLIKE"
              ? "hidden"
              : ""
          }`}
        >
          {m.text == "BLINDDATELIKE" || m.text == "BLINDDATEDISLIKE"
            ? ""
            : m.text}
          <span
            style={{
              position: "absolute",
              right: "6%",
              fontSize: "12px",
              bottom: "0",
            }}
          >
            {m.name == "MAHDIandEDYQQ:" ? (
              ""
            ) : m.time ? (
              changeTime(m.time)
            ) : (
              <svg
                style={{
                  width: "17px",
                  height: "23px",
                }}
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </span>
        </div>
      ))}
      {currentTime == 0 ? (
        <div className="admin">
          زمان دیت به پایان رسید و یکم دیگه عکس هاتون رو اینجا میفرستیم.
          لطفا رای خود را تا ساعت ۱۲:۰۵ اعلام کنید. درصورت لایک بودن هر
          دو رای شما رو به پیوی همدیگه هدایت میکنیم.
          <span style={{ color: "#d15a5a" }}>
            {" "}
            رای ندادن شما به منزله دیسلایک هستش{" "}
          </span>
        </div>
      ) : null}
      {currentTime == 0 &&
      user2img1 &&
      user2img2 &&
      user2img3 &&
      user2img4 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <img
            src={user2img1}
            style={{
              width: "34%",
            }}
          />
          <img
            src={user2img2}
            style={{
              width: "34%",
              borderTopRightRadius: "14px",
            }}
          />
          <img
            src={user2img3}
            style={{
              width: "34%",
            }}
          />
          <img
            src={user2img4}
            style={{
              width: "34%",
              borderBottomRightRadius: "14px",
            }}
          />
        </div>
      ) : null}

      {liked ? (
        <a
          href={`https://t.me/${telegramId}`}
          style={{
            width: "68%",
            display: "block",
            textAlign: "center",
            margin: "50px auto",
            padding: "10px",
            borderRadius: "12px",
            backgroundColor: "#b31713",
            color: "#fff",
        //    margin: "18px auto",
          }}
        >
          رفتن به پیوی
        </a>
      ) : null}
    </div>
  );
};

export default MessageList;
