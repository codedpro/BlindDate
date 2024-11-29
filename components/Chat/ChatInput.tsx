// components/ChatInput.tsx
import React from 'react';

interface ChatInputProps {
  typed: string;
  setTyped: (value: string) => void;
  handleSend: () => void;
  sending: boolean;
  currentTime: number;
  voted: boolean;
  handleVote: (vote: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  typed,
  setTyped,
  handleSend,
  sending,
  currentTime,
  voted,
  handleVote,
}) => {
  return (
    <div
      className="input"
      style={{
        backgroundColor: "rgb(30, 33, 38)",
      }}
    >
      {currentTime == 0 ? (
        <div
          style={{
            width: "88%",
            height: "65%",
            margin: "0 auto",
            justifyContent: "space-between",
            display: "flex",
            transition: "100ms",
          }}
        >
          {voted ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                textAlign: "center",
              }}
            >
              رای شما ثبت شد{" "}
            </div>
          ) : (
            <>
              <button
                onClick={() => handleVote("disLike")}
                style={{
                  padding: "0 30px",
                  borderRadius: "13px",
                  backgroundColor: "#c11919",
                  color: "#fff1f1",
                }}
              >
                👎دیسلایک
              </button>
              <button
                onClick={() => handleVote("like")}
                style={{
                  padding: "0 30px",
                  borderRadius: "13px",
                  backgroundColor: "#149114",
                  color: "#fff1f1",
                }}
              >
                👍لایک
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <input
            placeholder="!پیام خود را اینجا بنویسید"
            autoFocus
            type="text"
            dir="auto"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
          <i className="fas" onClick={handleSend}>
            {sending ? (
              <svg
                style={{
                  width: "35px",
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
            ) : (
              <svg
                style={{
                  width: "30px",
                  height: "30px",
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
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            )}
          </i>
        </>
      )}
    </div>
  );
};

export default ChatInput;
